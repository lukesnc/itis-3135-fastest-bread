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
  if (t.lastElementChild.classList.contains("open")) {
    t.style.setProperty("width", "300px");
    t.style.setProperty("height", "250px");
  }
});

function clickTestimonial(e) {
  e.currentTarget.lastElementChild.classList.toggle("open");
  e.currentTarget.children[1].classList.toggle("open");
  if (e.currentTarget.lastElementChild.classList.contains("open")) {
    e.currentTarget.style.setProperty("width", "300px");
    e.currentTarget.style.setProperty("height", "250px");
  } else {
    e.currentTarget.style.setProperty("width", "120px");
    e.currentTarget.style.setProperty("height", "120px");
  }

  testimonials.forEach((t) => {
    if (e.currentTarget !== t) {
      t.children[1].classList.add("open");
      t.lastElementChild.classList.remove("open");
      t.style.setProperty("width", "120px");
      t.style.setProperty("height", "120px");
    }
  });
}
