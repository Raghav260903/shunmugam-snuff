// Local Data: Backend off-la irundha idhu dhaan products-ah kaatum
const fallbackProducts = [
  { product_name: "Baby Krishna", image: "baby-Krishna.jpeg", price_10g: 20, price_50g: 80, price_100g: 150 },
  { product_name: "Joker", image: "joker.jpeg", price_10g: 25, price_50g: 90, price_100g: 170 },
  { product_name: "Mogini Krishna", image: "mogini-krishna.jpeg", price_10g: 22, price_50g: 85, price_100g: 160 },
  { product_name: "OS Snuff", image: "os.jpeg", price_10g: 30, price_50g: 100, price_100g: 180 },
  { product_name: "Saraswathi Snuff", image: "saraswathi.jpeg", price_10g: 28, price_50g: 95, price_100g: 175 },
  { product_name: "Thangam Patnam Podi", image: "thangam-patnam-podi.jpeg", price_10g: 24, price_50g: 88, price_100g: 165 },
  { product_name: "Vital Snuff", image: "vital.jpeg", price_10g: 26, price_50g: 92, price_100g: 172 },
  { product_name: "World Brand Snuff", image: "world-brand.jpeg", price_10g: 32, price_50g: 110, price_100g: 190 }
];

// Products-ah UI-la display panra common function
function displayProducts(data) {
  const productList = document.getElementById("product-list");

  if (!productList) return;

  productList.innerHTML = "";

  data.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const imagePath = product.image ? `images/${product.image}` : "images/default.jpg";

    const price10 = product.price_10g || 0;
    const price50 = product.price_50g || 0;
    const price100 = product.price_100g || 0;

    productCard.innerHTML = `
      <img src="${imagePath}" alt="${product.product_name}">
      <div class="product-card-content">
        <h3>${product.product_name}</h3>
        <p>Traditional quality product from Original Shunmugam Snuff Co.</p>
        <a href="order.html?name=${encodeURIComponent(product.product_name)}&image=${encodeURIComponent(product.image)}&p10=${encodeURIComponent(price10)}&p50=${encodeURIComponent(price50)}&p100=${encodeURIComponent(price100)}" class="main-btn">Order Now</a>
      </div>
    `;

    productList.appendChild(productCard);
  });
}

// Backend-la irundhu products eduka try pannu
fetch("http://localhost:8082/products")
  .then(response => {
    if (!response.ok) throw new Error("Backend offline");
    return response.json();
  })
  .then(data => {
    console.log("Data loaded from Backend");
    displayProducts(data);
  })
  .catch(error => {
    console.warn("Backend not running, showing fallback products...");
    console.warn(error);
    displayProducts(fallbackProducts);
  });

document.addEventListener("DOMContentLoaded", function () {
  // Dealer modal elements
  const dealerModal = document.getElementById("dealerModal");
  const openDealerForm = document.getElementById("openDealerForm");
  const openDealerForm2 = document.getElementById("openDealerForm2");
  const closeDealerForm = document.getElementById("closeDealerForm");
  const dealerForm = document.getElementById("dealerForm");
  const formMessage = document.getElementById("formMessage");

  function openModal(event) {
    if (event) event.preventDefault();
    if (dealerModal) {
      dealerModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (dealerModal) {
      dealerModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // Open modal
  if (openDealerForm) {
    openDealerForm.addEventListener("click", openModal);
  }

  if (openDealerForm2) {
    openDealerForm2.addEventListener("click", openModal);
  }

  // Close modal button
  if (closeDealerForm) {
    closeDealerForm.addEventListener("click", closeModal);
  }

  // Outside click close
  window.addEventListener("click", function (e) {
    if (dealerModal && e.target === dealerModal) {
      closeModal();
    }
  });

  // Escape key close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Dealer form submit -> WhatsApp
  if (dealerForm) {
    dealerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const companyName = dealerForm.companyName.value.trim();
      const name = dealerForm.name.value.trim();
      const country = dealerForm.country.value.trim();
      const state = dealerForm.state.value.trim();
      const city = dealerForm.city.value.trim();
      const pincode = dealerForm.pincode.value.trim();
      const email = dealerForm.email.value.trim();
      const phone = dealerForm.phone.value.trim();
      const message = dealerForm.message.value.trim();

      if (!name || !country || !state || !city || !pincode || !email || !phone) {
        if (formMessage) {
          formMessage.textContent = "Please fill all required fields.";
          formMessage.style.color = "red";
        }
        return;
      }

      // Same WhatsApp number use pannunga
      const whatsappNumber = "919840838200";

      const whatsappMessage =
`*New Dealership Enquiry*

*Company Name:* ${companyName || "-"}
*Name:* ${name}
*Country:* ${country}
*State:* ${state}
*City:* ${city}
*Pincode:* ${pincode}
*Email:* ${email}
*Phone:* ${phone}
*Message:* ${message || "-"}`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      if (formMessage) {
        formMessage.textContent = "Redirecting to WhatsApp...";
        formMessage.style.color = "green";
      }

      window.open(whatsappURL, "_blank");

      dealerForm.reset();

      setTimeout(() => {
        closeModal();
        if (formMessage) {
          formMessage.textContent = "";
        }
      }, 500);
    });
  }
});