// Local fallback products
const fallbackProducts = [
  {
    product_name: "World Brand Snuff",
    image: "world-brand.jpeg",
    price_10g: 32,
    price_50g: 110,
    price_100g: 190
  },
  {
    product_name: "Thangam Patnam Podi",
    image: "thangam-patnam-podi.jpeg",
    price_10g: 24,
    price_50g: 88,
    price_100g: 165
  },
  {
    product_name: "Saraswathi Snuff",
    image: "saraswathi.jpeg",
    price_10g: 28,
    price_50g: 95,
    price_100g: 175
  },
  {
    product_name: "Joker",
    image: "joker.jpeg",
    price_10g: 25,
    price_50g: 90,
    price_100g: 170
  },
  {
    product_name: "Baby Krishna",
    image: "baby-krishna.jpeg", // Fixed: 'k' small
    price_10g: 20,
    price_50g: 80,
    price_100g: 150
  },
  {
    product_name: "OS Snuff",
    image: "os.jpeg",
    price_10g: 30,
    price_50g: 100,
    price_100g: 180
  }
];

// Products display function
function displayProducts(data) {
  const productList = document.getElementById("product-list");

  if (!productList) return;

  productList.innerHTML = "";

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const imagePath = product.image ? `images/${product.image}` : "images/default.jpg";
    const price10 = product.price_10g || 0;
    const price50 = product.price_50g || 0;
    const price100 = product.price_100g || 0;

    // Logic for International Brand Highlight (Changed to Thangam Patnam Podi)
    let description = "Traditional quality product from Original Shunmugam Snuff Co.";
    let badgeHTML = "";

    if (product.product_name === "Thangam Patnam Podi") {
      description = "A Premium International Heritage Brand from Original Shunmugam Snuff Co.";
      badgeHTML = `<span class="international-badge">International Brand</span>`;
    }

    productCard.innerHTML = `
      <div class="card-image-wrapper" style="position: relative;">
        ${badgeHTML}
        <img src="${imagePath}" alt="${product.product_name}">
      </div>
      <div class="product-card-content">
        <h3>${product.product_name}</h3>
        <p>${description}</p>
        <a href="order.html?name=${encodeURIComponent(product.product_name)}&image=${encodeURIComponent(product.image || "")}&p10=${encodeURIComponent(price10)}&p50=${encodeURIComponent(price50)}&p100=${encodeURIComponent(price100)}" class="main-btn">Order Now</a>
      </div>
    `;

    productList.appendChild(productCard);
  });
}

// Backend fetch logic
fetch("http://localhost:8082/products")
  .then((response) => {
    if (!response.ok) throw new Error("Backend offline");
    return response.json();
  })
  .then((data) => {
    displayProducts(data);
  })
  .catch(() => {
    displayProducts(fallbackProducts);
  });

document.addEventListener("DOMContentLoaded", function () {
  // Modal & WhatsApp Logic (Same as before)
  const dealerModal = document.getElementById("dealerModal");
  const dealerButtons = document.querySelectorAll(".open-dealer-form");
  const closeDealerForm = document.getElementById("closeDealerForm");
  const dealerForm = document.getElementById("dealerForm");

  function openModal(e) { if (e) e.preventDefault(); dealerModal?.classList.add("show"); document.body.style.overflow = "hidden"; }
  function closeModal() { dealerModal?.classList.remove("show"); document.body.style.overflow = "auto"; }

  dealerButtons.forEach(btn => btn.addEventListener("click", openModal));
  closeDealerForm?.addEventListener("click", closeModal);
  dealerModal?.addEventListener("click", (e) => { if (e.target === dealerModal) closeModal(); });

  if (dealerForm) {
    dealerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const whatsappNumber = "919840838200";
      const whatsappMessage = `*New Dealership Enquiry*\n\n*Name:* ${dealerForm.name.value}\n*City:* ${dealerForm.city.value}\n*Phone:* ${dealerForm.phone.value}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
      closeModal();
    });
  }
});
