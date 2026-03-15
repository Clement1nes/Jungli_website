import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ffmpeg = new FFmpeg();

const gifFiles = [
  // Backgrounds (largest files)
  { input: 'public/assets/Background.gif', output: 'public/assets/Background.webm' },
  { input: 'public/assets/backgrounds/foot_background.gif', output: 'public/assets/backgrounds/foot_background.webm' },
  { input: 'public/assets/backgrounds/star_background.gif', output: 'public/assets/backgrounds/star_background.webm' },
  { input: 'public/assets/backgrounds/foot_background_new.gif', output: 'public/assets/backgrounds/foot_background_new.webm' },
  { input: 'public/assets/backgrounds/eye_background.gif', output: 'public/assets/backgrounds/eye_background.webm' },

  // Ring animations
  { input: 'public/assets/Mainfront1.gif', output: 'public/assets/Mainfront1.webm' },
  { input: 'public/assets/mainfront.gif', output: 'public/assets/mainfront.webm' },
  { input: 'public/assets/gold-eye-ring.gif', output: 'public/assets/gold-eye-ring.webm' },
  { input: 'public/assets/silver_eye.gif', output: 'public/assets/silver_eye.webm' },
  { input: 'public/assets/SilverEyeRing-Picsart-BackgroundRemover1-ezgif.com-gif-maker (1).gif', output: 'public/assets/SilverEyeRing-Picsart-BackgroundRemover1-ezgif.com-gif-maker (1).webm' },
  { input: 'public/assets/ezgif.com-gif-maker.gif', output: 'public/assets/ezgif.com-gif-maker.webm' },
  { input: 'public/assets/ezgif.com-coalesce.gif', output: 'public/assets/ezgif.com-coalesce.webm' },
  { input: 'public/assets/GoldShootingStar-ezgif.com-gif-maker (1).gif', output: 'public/assets/GoldShootingStar-ezgif.com-gif-maker (1).webm' },
  { input: 'public/assets/silver_ring.gif', output: 'public/assets/silver_ring.webm' },
];

async function convertGifToWebm(inputPath, outputPath) {
  try {
    const fullInputPath = path.join(__dirname, '..', inputPath);
    const fullOutputPath = path.join(__dirname, '..', outputPath);

    console.log(`\nConverting: ${inputPath}`);
    console.log(`Output: ${outputPath}`);

    if (!ffmpeg.loaded) {
      console.log('Loading ffmpeg...');
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }

    // Read the input file
    const inputData = await fetchFile(fullInputPath);
    await ffmpeg.writeFile('input.gif', inputData);

    // Convert to WebM with good quality settings
    // -c:v libvpx-vp9: VP9 codec (better compression than VP8)
    // -crf 30: Quality (lower = better, range 0-63, 30 is good balance)
    // -b:v 0: Variable bitrate
    // -auto-alt-ref 0: Fixes issues with some GIF conversions
    await ffmpeg.exec([
      '-i', 'input.gif',
      '-c:v', 'libvpx-vp9',
      '-crf', '30',
      '-b:v', '0',
      '-auto-alt-ref', '0',
      '-loop', '0',
      'output.webm'
    ]);

    // Read the output file
    const outputData = await ffmpeg.readFile('output.webm');

    // Write to disk
    fs.writeFileSync(fullOutputPath, outputData);

    // Get file sizes for comparison
    const inputSize = fs.statSync(fullInputPath).size;
    const outputSize = outputData.length;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(2);

    console.log(`✓ Converted successfully!`);
    console.log(`  Input size: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Output size: ${(outputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Size reduction: ${reduction}%`);

    // Clean up
    await ffmpeg.deleteFile('input.gif');
    await ffmpeg.deleteFile('output.webm');

  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
}

async function convertAll() {
  console.log('Starting GIF to WebM conversion...\n');

  for (const file of gifFiles) {
    await convertGifToWebm(file.input, file.output);
  }

  console.log('\n✓ All conversions complete!');
}

convertAll();
