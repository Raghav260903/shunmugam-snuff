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
    image: "baby-Krishna.jpeg",
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

    productCard.innerHTML = `
      <img src="${imagePath}" alt="${product.product_name}">
      <div class="product-card-content">
        <h3>${product.product_name}</h3>
        <p>Traditional quality product from Original Shunmugam Snuff Co.</p>
        <a href="order.html?name=${encodeURIComponent(product.product_name)}&image=${encodeURIComponent(product.image || "")}&p10=${encodeURIComponent(price10)}&p50=${encodeURIComponent(price50)}&p100=${encodeURIComponent(price100)}" class="main-btn">Order Now</a>
      </div>
    `;

    productList.appendChild(productCard);
  });
}

// Try backend first, fallback if backend is not available
fetch("http://localhost:8082/products")
  .then((response) => {
    if (!response.ok) throw new Error("Backend offline");
    return response.json();
  })
  .then((data) => {
    console.log("Data loaded from backend");
    displayProducts(data);
  })
  .catch((error) => {
    console.warn("Backend not running, showing fallback products...");
    console.warn(error);
    displayProducts(fallbackProducts);
  });

document.addEventListener("DOMContentLoaded", function () {
  // Dealer modal elements
  const dealerModal = document.getElementById("dealerModal");
  const dealerButtons = document.querySelectorAll(".open-dealer-form");
  const closeDealerForm = document.getElementById("closeDealerForm");
  const dealerForm = document.getElementById("dealerForm");
  const formMessage = document.getElementById("formMessage");

  function openModal(event) {
    if (event) event.preventDefault();
    if (!dealerModal) return;

    dealerModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!dealerModal) return;

    dealerModal.classList.remove("show");
    document.body.style.overflow = "auto";

    if (formMessage) {
      formMessage.textContent = "";
    }
  }

  // Open modal for all dealer buttons
  dealerButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  // Close modal button
  if (closeDealerForm) {
    closeDealerForm.addEventListener("click", closeModal);
  }

  // Close on outside click
  if (dealerModal) {
    dealerModal.addEventListener("click", function (e) {
      if (e.target === dealerModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Dealer form submit -> WhatsApp
  if (dealerForm) {
    dealerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const companyName = dealerForm.companyName ? dealerForm.companyName.value.trim() : "";
      const name = dealerForm.name ? dealerForm.name.value.trim() : "";
      const country = dealerForm.country ? dealerForm.country.value.trim() : "";
      const state = dealerForm.state ? dealerForm.state.value.trim() : "";
      const city = dealerForm.city ? dealerForm.city.value.trim() : "";
      const pincode = dealerForm.pincode ? dealerForm.pincode.value.trim() : "";
      const email = dealerForm.email ? dealerForm.email.value.trim() : "";
      const phone = dealerForm.phone ? dealerForm.phone.value.trim() : "";
      const message = dealerForm.message ? dealerForm.message.value.trim() : "";

      if (!name || !country || !state || !city || !pincode || !email || !phone) {
        if (formMessage) {
          formMessage.textContent = "Please fill all required fields.";
          formMessage.style.color = "red";
        }
        return;
      }

      const whatsappNumber = "919840838200";

      const whatsappMessage = `*New Dealership Enquiry*

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
      }, 500);
    });
  }
});