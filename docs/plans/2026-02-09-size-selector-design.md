# Size Selector & Spacing Fix Design

**Date:** 2026-02-09
**Status:** Approved

## Overview

Add a size selector to product detail pages with standard ring sizes (5-10) and reduce the gap between the header and product content.

## Requirements

1. Size selector matching the visual style of the existing metal selector
2. Standard ring sizes: 5, 6, 7, 8, 9, 10
3. Reduce vertical spacing between logo/header and product content

## Design Decisions

### Size Selector

**Visual Design:**
- Horizontal button layout matching the metal selector style
- Same hover/active states and animations
- Positioned below the metal selector in the product info section
- Default selection: Size 7 (middle option)

**State Management:**
```javascript
const [selectedSize, setSelectedSize] = useState('7');
```

**Component Structure:**
```jsx
<div className="size-selector">
  <label className="selector-label">Select Size</label>
  <div className="size-buttons">
    {[5, 6, 7, 8, 9, 10].map(size => (
      <motion.button
        key={size}
        className={`size-option ${selectedSize === size.toString() ? 'active' : ''}`}
        onClick={() => setSelectedSize(size.toString())}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {size}
      </motion.button>
    ))}
  </div>
</div>
```

**CSS Styling:**
```css
.size-selector {
  margin: 2rem 0;
}

.size-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.size-option {
  padding: 0.75rem 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-option.active {
  border-color: #d4af37;
  background: rgba(212, 175, 55, 0.1);
}
```

### Spacing Fix

**Problem:** Large vertical gap between header/logo and product content

**Solution:** Reduce top padding/margin in `.product-detail-container` or `.product-detail-grid` by 50-100px

## Implementation Location

**Files to modify:**
- `src/pages/ProductDetail.jsx` - Add size selector component and state
- `src/styles/ProductDetail.css` - Add size selector styles and adjust spacing

**Placement:** Size selector appears between metal selector and product details, creating flow: Material → Size → Details → Actions

## Visual Consistency

Both selectors share the same design language:
- Rounded corners
- Subtle borders
- Smooth transitions
- Gold accent for active state (#d4af37)
- Consistent spacing and typography
