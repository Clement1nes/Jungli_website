#!/bin/bash

# Path to ffmpeg
FFMPEG="./ffmpeg-bin/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe"

echo "Starting GIF to WebM conversion..."
echo ""

# Array of GIF files to convert (largest files first)
declare -a files=(
  "public/assets/Background.gif"
  "public/assets/backgrounds/foot_background.gif"
  "public/assets/backgrounds/star_background.gif"
  "public/assets/backgrounds/foot_background_new.gif"
  "public/assets/backgrounds/eye_background.gif"
  "public/assets/Mainfront1.gif"
  "public/assets/mainfront.gif"
  "public/assets/gold-eye-ring.gif"
  "public/assets/silver_eye.gif"
  "public/assets/SilverEyeRing-Picsart-BackgroundRemover1-ezgif.com-gif-maker (1).gif"
  "public/assets/ezgif.com-gif-maker.gif"
  "public/assets/ezgif.com-coalesce.gif"
  "public/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif"
  "public/assets/silver_ring.gif"
)

# Convert each file
for gif in "${files[@]}"; do
  if [ -f "$gif" ]; then
    # Get output filename by replacing .gif with .webm
    webm="${gif%.gif}.webm"

    echo "Converting: $gif"
    echo "Output: $webm"

    # Get input file size
    input_size=$(stat -c%s "$gif" 2>/dev/null || stat -f%z "$gif" 2>/dev/null || wc -c < "$gif")
    input_mb=$(awk "BEGIN {printf \"%.2f\", $input_size / 1024 / 1024}")

    # Convert to WebM using VP9 codec with good quality settings
    # -c:v libvpx-vp9: VP9 codec (better compression)
    # -pix_fmt yuva420p: Pixel format for transparency support
    # -crf 30: Quality (0-63, lower is better, 30 is good balance)
    # -b:v 0: Variable bitrate
    # -row-mt 1: Enable row-based multithreading for faster encoding
    # -loop 0: Loop forever
    "$FFMPEG" -i "$gif" -c:v libvpx-vp9 -pix_fmt yuva420p -crf 30 -b:v 0 -row-mt 1 -loop 0 -y "$webm" 2>&1 | grep -v "^frame=" | grep -v "^size="

    if [ -f "$webm" ]; then
      # Get output file size
      output_size=$(stat -c%s "$webm" 2>/dev/null || stat -f%z "$webm" 2>/dev/null || wc -c < "$webm")
      output_mb=$(awk "BEGIN {printf \"%.2f\", $output_size / 1024 / 1024}")
      reduction=$(awk "BEGIN {printf \"%.2f\", 100 * (1 - $output_size / $input_size)}")

      echo "✓ Converted successfully!"
      echo "  Input size: ${input_mb} MB"
      echo "  Output size: ${output_mb} MB"
      echo "  Size reduction: ${reduction}%"
      echo ""
    else
      echo "✗ Failed to convert $gif"
      echo ""
    fi
  else
    echo "File not found: $gif"
    echo ""
  fi
done

echo "✓ All conversions complete!"
