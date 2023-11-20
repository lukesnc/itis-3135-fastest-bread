"use strict";

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

const cartBtn = document.querySelector(".cart-btn");
const cartDiv = document.querySelector(".cart");

cartBtn.addEventListener("click", () => {
  cartDiv.classList.toggle("open");
});

const userCart = [];
