// Script to fetch all variants from Shopify and generate variant mapping
// Run with: node scripts/fetchVariants.js

import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'rooted-6518.myshopify.com',
  storefrontAccessToken: '696adf0fee0ace50d06ff1b771b74ad9'
});

const THIRD_EYE_RING_ID = '8128692388158';

async function fetchAllVariants() {
  try {
    console.log('Fetching Third Eye Ring variants from Shopify...\n');

    const product = await client.product.fetch(`gid://shopify/Product/${THIRD_EYE_RING_ID}`);

    console.log(`Product: ${product.title}`);
    console.log(`Total variants: ${product.variants.length}\n`);

    // Organize variants by metal, stone, and size
    const variantMap = {
      gold: {},
      silver: {}
    };

    product.variants.forEach(variant => {
      const title = variant.title.toLowerCase();
      const variantId = variant.id.split('/').pop(); // Extract numeric ID

      console.log(`Processing: ${variant.title} (ID: ${variantId})`);

      // Parse metal type
      let metal = 'silver';
      if (title.includes('gold')) {
        metal = 'gold';
      }

      // Parse stone type
      let stone = 'none';
      if (title.includes('no gemstone')) {
        stone = 'none';
      } else if (title.includes('blue')) {
        stone = 'blue';
      } else if (title.includes('red')) {
        stone = 'red';
      } else if (title.includes('green')) {
        stone = 'green';
      } else if (title.includes('orange')) {
        stone = 'orange';
      } else if (title.includes('purple')) {
        stone = 'purple';
      } else if (title.includes('pink')) {
        stone = 'pink';
      } else if (title.includes('yellow')) {
        stone = 'yellow';
      } else if (title.includes('black')) {
        stone = 'black';
      } else if (title.includes('silver gemstone')) {
        stone = 'silver';
      } else if (title.includes('gold gemstone')) {
        stone = 'gold';
      }

      // Parse size - map UK sizes to US sizes
      const ukToUsSize = {
        'J': '5',
        'L': '6',
        'N': '7',
        'P': '8',
        'R': '9',
        'T': '10'
      };

      let size = null;
      // Look for UK size letter (J, L, N, P, R, T) - format is "/ J" or "/ L" etc
      const ukSizeMatch = title.match(/\/\s+([JLNPRT])$/i) || title.match(/\/\s+([JLNPRT])\s+\(/i);
      if (ukSizeMatch) {
        const ukSize = ukSizeMatch[1].toUpperCase();
        size = ukToUsSize[ukSize];
      }

      // Initialize nested structure if needed
      if (!variantMap[metal][stone]) {
        variantMap[metal][stone] = {};
      }

      if (size) {
        variantMap[metal][stone][size] = variantId;
      }
    });

    // Generate JavaScript object code
    console.log('\n\n=== GENERATED VARIANT MAPPING ===\n');
    console.log('shopifyVariants: {');

    ['gold', 'silver'].forEach(metal => {
      console.log(`  ${metal}: {`);
      Object.keys(variantMap[metal]).sort().forEach(stone => {
        console.log(`    ${stone}: {`);
        Object.keys(variantMap[metal][stone]).sort((a, b) => parseInt(a) - parseInt(b)).forEach(size => {
          console.log(`      '${size}': '${variantMap[metal][stone][size]}',`);
        });
        console.log(`    },`);
      });
      console.log(`  },`);
    });

    console.log('}');

    console.log('\n\n=== STATISTICS ===');
    console.log(`Total variants mapped: ${product.variants.length}`);

    let totalMapped = 0;
    ['gold', 'silver'].forEach(metal => {
      Object.keys(variantMap[metal]).forEach(stone => {
        const count = Object.keys(variantMap[metal][stone]).length;
        totalMapped += count;
        console.log(`${metal} + ${stone}: ${count} sizes`);
      });
    });

    console.log(`\nVariants successfully mapped: ${totalMapped}`);

  } catch (error) {
    console.error('Error fetching variants:');
    console.error('Message:', error.message);
    console.error('Details:', JSON.stringify(error, null, 2));
  }
}

fetchAllVariants();
