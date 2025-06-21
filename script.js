// TIME AGO FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
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

// ARTICLE TITLES FOR SEARCH
const articles = {
  1: { title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025" },
  2: { title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona" },
  3: { title: "Lingon sa Kahapon" },
  4: { title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus" },
  5: { title: "Ibong Pipit, Awit Nang Awit" }
};

// SEARCH + REDIRECT
window.addEventListener("load", () => {
  const searchInput = document.querySelector(".searchbar");
  if (!searchInput) return;

  const dropdown = document.createElement("div");
  Object.assign(dropdown.style, {
    position: "absolute",
    background: "#fff",
    border: "1px solid #ccc",
    maxHeight: "200px",
    overflowY: "auto",
    display: "none",
    zIndex: "999",
    fontFamily: "Century Gothic, sans-serif"
  });
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
      const titleLower = article.title.toLowerCase();

      if (titleLower.includes(val)) {
        const item = document.createElement("div");
        item.textContent = article.title;
        item.setAttribute("data-id", id);
        Object.assign(item.style, {
          display: "block",
          padding: "8px",
          cursor: "pointer",
          borderBottom: "1px solid #eee",
          color: "#000"
        });
        item.addEventListener("mouseover", () => item.style.background = "#eee");
        item.addEventListener("mouseout", () => item.style.background = "#fff");

        // Handle redirection manually
        item.addEventListener("click", () => {
          const articleId = item.getAttribute("data-id");
          window.location.href = `latestnews.html?id=${articleId}`;
        });

        dropdown.appendChild(item);
      }
    }

    const rect = searchInput.getBoundingClientRect();
    dropdown.style.left = `${rect.left + window.scrollX}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.display = dropdown.innerHTML ? "block" : "none";
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.style.display = "none";
    }
  });

  // If on latestnews.html?id=#
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id && window.location.pathname.includes("latestnews.html")) {
    const fullArticles = {
      1: {
        title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
        author: "By Mae Adelaine Alarcon | May 05, 2025",
        image: "instruments.JPG",
        content: `Nota mula sa iba’t ibang instrumento ang bumalot sa Cavite State University Imus Gymnasium...`
      },
      2: {
        title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
        author: "By Mae Adelaine Alarcon | May 05, 2025",
        image: "sweetplay.jpg",
        content: `Hindi nagpahuli ang Dramatic Arts Contest...`
      },
      3: {
        title: "Lingon sa Kahapon",
        author: "By Mae Adelaine Alarcon via The Flare | May 05, 2025",
        image: "litart.jpg",
        content: `Una Mirada al Pasado...`
      },
      4: {
        title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
        author: "By Mae Adelaine Alarcon via The Flare | March 17, 2025",
        image: "art4.jpg",
        content: `Carl E. Balita Review Center...`
      },
      5: {
        title: "Ibong Pipit, Awit Nang Awit",
        author: "By Mae Adelaine Alarcon | May 05, 2025",
        image: "art5.jpg",
        content: `Tila isang ibong pipit na hindi tumitigil sa pag-awit...`
      }
    };

    const article = fullArticles[id];
    if (article) {
      document.getElementById("image").src = article.image;
      document.getElementById("title").textContent = article.title;
      document.getElementById("author").textContent = article.author;
      document.getElementById("content").innerHTML = article.content;
    }
  }
});
