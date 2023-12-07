"use strict";

// Carousel

const previewItems = Array.from(document.querySelectorAll(".preview-item"));
const previewCaption = document.querySelector(".preview-caption");
const arrows = Array.from(document.querySelectorAll(".preview-arrow"));
const PREVIEW_SIZE = previewItems.length;

arrows.forEach((arrow) => {
  arrow.addEventListener("click", swipeGallery);
});

function swipeGallery(e) {
  const currentPreviewlItem = document.querySelector(".preview-item.active");
  const currentIndex = previewItems.indexOf(currentPreviewlItem);

  let nextIndex;

  if (e.currentTarget.classList.contains("left")) {
    if (currentIndex === 0) {
      nextIndex = PREVIEW_SIZE - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
  } else {
    if (currentIndex === PREVIEW_SIZE - 1) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
  }

  previewItems[nextIndex].classList.add("active");
  currentPreviewlItem.classList.remove("active");
  previewCaption.textContent =
    previewItems[nextIndex].firstElementChild.getAttribute("alt");
}

// Testimonials

const testimonials = Array.from(document.querySelectorAll(".testimonial"));

testimonials.forEach((t) => {
  t.addEventListener("click", clickTestimonial);
});

function clickTestimonial(e) {
  e.currentTarget.classList.toggle("open");
  e.currentTarget.lastElementChild.classList.toggle("open");
  e.currentTarget.children[1].classList.toggle("open");

  testimonials.forEach((t) => {
    if (e.currentTarget !== t) {
      t.classList.remove("open");
      t.children[1].classList.add("open");
      t.lastElementChild.classList.remove("open");
    }
  });
}

// Create shopping cart

const cartBtn = document.querySelector(".cart-btn");
const cartDiv = document.querySelector(".cart");

if (cartBtn != null) {
  cartBtn.addEventListener("click", () => {
    cartDiv.classList.toggle("open");
  });
}

// Manage shopping cart

const checkoutBtn = document.querySelector(".checkout-btn");

function addToCart(e) {
  const buttonClicked = e.currentTarget;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const img = document.createElement("img");
  img.src = buttonClicked.previousSibling.src;
  cartItem.appendChild(img);

  const p = document.createElement("p");
  p.textContent = buttonClicked.previousSibling.previousSibling.textContent;
  cartItem.appendChild(p);

  const remove = document.createElement("button");
  remove.textContent = "Remove";
  remove.classList.add("remove-btn");
  remove.addEventListener("click", removeFromCart);
  cartItem.appendChild(remove);

  cartDiv.insertBefore(cartItem, checkoutBtn);
}

function removeFromCart(e) {
  e.currentTarget.parentNode.remove();
}

// Populate shop

const shopDiv = document.querySelector(".shop");
const SHOP_SIZE = 10;

async function addImageToShop(num) {
  try {
    const r = await fetch(
      "https://api.api-ninjas.com/v1/randomimage?category=food",
      {
        headers: {
          Accept: "image/jpg",
          "X-Api-Key": "pRIiKzDMEeuXo7I8Shu2lQ==X69dWnL2OaKJDwqL", // I know.... ¯\_(ツ)_/¯
        },
      }
    );
    if (!r.ok) throw Error(`Error: ${r.url} ${r.statusText}`);
    const blob = await r.blob();

    // Add to DOM
    const div = document.createElement("div");
    div.classList.add("shop-item");

    const name = document.createElement("p");
    name.textContent = "Item " + num;
    div.appendChild(name);

    const img = document.createElement("img");
    const imageUrl = URL.createObjectURL(blob);
    img.src = imageUrl;
    div.appendChild(img);

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("add-to-cart-btn");
    div.appendChild(button);

    button.addEventListener("click", addToCart);

    shopDiv.appendChild(div);
  } catch (err) {
    console.log(err);
  }
}

if (shopDiv != null) {
  for (let i = 0; i < SHOP_SIZE; i++) {
    addImageToShop(i + 1);
  }
}
