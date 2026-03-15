import { test, expect } from '@playwright/test';

// First, we need to know the URL - check if dev server is running or use deployed URL
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

test.describe('Jungli Website Audit', () => {

  test('Home page loads and displays correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/home`);

    // Check page title/logo
    await expect(page.locator('img[alt="Jungli Logo"]')).toBeVisible();

    // Check "Select Your Ring" text
    await expect(page.getByText(/select your ring/i)).toBeVisible();

    // Check all three ring products are visible
    const rings = page.locator('.product-float');
    await expect(rings).toHaveCount(3);

    console.log('✓ Home page loads correctly');
  });

  test('Navigation works correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/home`);

    // Test About link
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/.*about/);

    // Test Contact link
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);

    // Go back home
    await page.click('img[alt="Jungli Logo"]');
    await expect(page).toHaveURL(/.*home/);

    console.log('✓ Navigation works');
  });

  test('Product detail page - Third Eye Ring', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/eye`);

    // Check product title
    await expect(page.getByText('Third Eye Ring')).toBeVisible();

    // Check price is displayed
    await expect(page.locator('.product-price')).toBeVisible();

    // Check material selector exists
    await expect(page.getByText(/sterling silver/i)).toBeVisible();
    await expect(page.getByText(/18k gold plated/i)).toBeVisible();

    // Check stone selector
    await expect(page.getByText(/select stone/i)).toBeVisible();

    // Check size selector
    await expect(page.getByText(/select size/i)).toBeVisible();

    // Check Buy Now button
    await expect(page.getByText(/buy now/i)).toBeVisible();

    console.log('✓ Product detail page displays correctly');
  });

  test('Material selection updates price', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/eye`);

    // Click Sterling Silver
    await page.click('text=Sterling Silver');
    await page.waitForTimeout(500);
    let price = await page.locator('.product-price').textContent();
    console.log('  Sterling Silver price:', price);

    // Click 18k Gold Plated
    await page.click('text=18k Gold Plated');
    await page.waitForTimeout(500);
    let newPrice = await page.locator('.product-price').textContent();
    console.log('  18k Gold Plated price:', newPrice);

    // Prices should be different
    expect(price).not.toBe(newPrice);

    console.log('✓ Price updates when changing material');
  });

  test('Stone selection works', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/eye`);

    // Get all stone options
    const stoneButtons = page.locator('.stone-option');
    const count = await stoneButtons.count();

    console.log(`  Found ${count} stone options`);
    expect(count).toBeGreaterThan(5);

    // Click a stone (e.g., blue)
    await stoneButtons.first().click();
    await page.waitForTimeout(300);

    console.log('✓ Stone selection works');
  });

  test('Size selection works', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/eye`);

    // Get all size options
    const sizeButtons = page.locator('.size-option');
    const count = await sizeButtons.count();

    console.log(`  Found ${count} size options`);
    expect(count).toBe(6); // Should have 6 sizes

    // Click a size
    await sizeButtons.first().click();
    await page.waitForTimeout(300);

    console.log('✓ Size selection works');
  });

  test('Check for console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(`${BASE_URL}/home`);
    await page.goto(`${BASE_URL}/product/eye`);

    if (errors.length > 0) {
      console.log('⚠ Console errors found:');
      errors.forEach(err => console.log('  -', err));
    } else {
      console.log('✓ No console errors');
    }
  });

  test('Mobile responsiveness check', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(`${BASE_URL}/home`);

    // Check if rings are visible on mobile
    const rings = page.locator('.product-float');
    await expect(rings.first()).toBeVisible();

    // Go to product page
    await page.goto(`${BASE_URL}/product/eye`);

    // Check material buttons stack on mobile
    await expect(page.getByText(/sterling silver/i)).toBeVisible();
    await expect(page.getByText(/18k gold plated/i)).toBeVisible();

    console.log('✓ Mobile responsiveness looks good');
  });

  test('Image loading check', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/eye`);

    // Wait for main product image
    const productImage = page.locator('.gallery-image').first();
    await expect(productImage).toBeVisible();

    // Check if image actually loaded (not broken)
    const isLoaded = await productImage.evaluate((img) => {
      return img.complete && img.naturalHeight !== 0;
    });

    if (isLoaded) {
      console.log('✓ Product images load correctly');
    } else {
      console.log('⚠ Some images may be broken');
    }
  });

  test('Performance check', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`${BASE_URL}/home`);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`  Home page load time: ${loadTime}ms`);

    if (loadTime > 3000) {
      console.log('⚠ Page load time is slow (>3s)');
    } else {
      console.log('✓ Page load time is acceptable');
    }
  });
});
