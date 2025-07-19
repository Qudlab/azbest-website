// script-chain-loader.js

async function loadChainWatches() {
  const productContainer = document.querySelector('.products-grid');
  productContainer.innerHTML = '<p>Loading chain watches...</p>';

  try {
    const indexResponse = await fetch('../data/products/index.json');
    const productList = await indexResponse.json();
    const chainProducts = productList.filter(p => p.category === 'Chain');

    const productHTML = await Promise.all(chainProducts.map(async (product) => {
      const response = await fetch(`../data/products/${product.file}`);
      const mdText = await response.text();
      const match = /^---\n([\s\S]+?)\n---/.exec(mdText);
      const data = {};
      if (match) {
        match[1].split('\n').forEach(line => {
          const [key, value] = line.split(':');
          data[key.trim()] = value ? value.trim() : '';
        });
      }

      return `
        <div class="product-box" data-price="${data.price}">
          ${data.badge ? `<span class="badge ${data.badge.toLowerCase()}">${data.badge}</span>` : ''}
          <img src="../${data.image}" alt="${data.title}" />
          <h3>${data.title}</h3>
          <p>₦${data.price}</p>
          <div class="hover-popup">${data.description}</div>
          <a href="https://wa.me/2348146831465?text=I'm%20interested%20in%20${encodeURIComponent(data.title)}" class="btn">Buy</a>
        </div>
      `;
    }));

    productContainer.innerHTML = productHTML.join('');
  } catch (error) {
    productContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadChainWatches);
