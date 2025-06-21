// script.js

document.addEventListener('DOMContentLoaded', function () {
  // TIMESTAMP HANDLING
  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval === 1 ? "" : "s") + " ago";

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval === 1 ? "" : "s") + " ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s") + " ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s") + " ago";

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s") + " ago";

    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
  }

  function updateAllTimestamps() {
    const timestamps = document.querySelectorAll('.timestamp');
    timestamps.forEach(span => {
      const timestamp = span.getAttribute('data-timestamp');
      if (timestamp) span.textContent = timeAgo(timestamp);
    });
  }

  updateAllTimestamps();
  setInterval(updateAllTimestamps, 60000);
});


// ARTICLES DATABASE
const articles = {
  1: {
    title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "instruments.JPG",
    content: `Nota mula sa iba’t ibang instrumento...`
  },
  2: {
    title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "sweetplay.jpg",
    content: `Ginawaran ng Sinag-Tala...`
  },
  3: {
    title: "Lingon sa Kahapon",
    author: "By Mae Adelaine Alarcon via The Flare | May 05, 2025",
    image: "litart.jpg",
    content: `Isang malikhaing pagsilip sa kasaysayan...`
  },
  4: {
    title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
    author: "By Mae Adelaine Alarcon via The Flare | March 17, 2025",
    image: "art4.jpg",
    content: `Isinagawa ang CBRC National Teacher Education Quiz Bee...`
  },
  5: {
    title: "Ibong Pipit, Awit Nang Awit",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "art5.jpg",
    content: `Isang makabayang sanaysay...`
  }
};


// SEARCH BAR AUTOSUGGEST DROPDOWN
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".searchbar");
  if (!searchInput) return;

  const dropdown = document.createElement("div");
  dropdown.style.position = "absolute";
  dropdown.style.background = "#fff";
  dropdown.style.border = "1px solid #ccc";
  dropdown.style.maxHeight = "200px";
  dropdown.style.overflowY = "auto";
  dropdown.style.display = "none";
  dropdown.style.zIndex = "999";
  dropdown.style.fontFamily = "Century Gothic, sans-serif";
  document.body.appendChild(dropdown);

  searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase();
    dropdown.innerHTML = "";
    if (!val) {
      dropdown.style.display = "none";
      return;
    }

    for (const id in articles) {
      const article = articles[id];
      if (article.title.toLowerCase().includes(val)) {
        const item = document.createElement("a");
        item.href = `latestnews.html?id=${id}`;
        item.textContent = article.title;
        Object.assign(item.style, {
          display: "block",
          padding: "8px",
          textDecoration: "none",
          color: "#000"
        });
        item.addEventListener("mouseover", () => item.style.background = "#eee");
        item.addEventListener("mouseout", () => item.style.background = "white");
        dropdown.appendChild(item);
      }
    }

    const rect = searchInput.getBoundingClientRect();
    dropdown.style.left = `${rect.left + window.scrollX}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.display = dropdown.innerHTML ? "block" : "none";
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.style.display = "none";
    }
  });

  // LOAD FULL ARTICLE IF ON latestnews.html?id=#
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id && articles[id]) {
    const article = articles[id];
    const image = document.getElementById("image");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");

    if (image) image.src = article.image;
    if (title) title.textContent = article.title;
    if (author) author.textContent = article.author;
    if (content) content.innerHTML = article.content;
  }
});
