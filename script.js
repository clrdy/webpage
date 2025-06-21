document.addEventListener('DOMContentLoaded', function () {
  // TIME AGO FUNCTIONALITY
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

  // SEARCH FUNCTIONALITY
  const articles = {
    1: { title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025" },
    2: { title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona" },
    3: { title: "Lingon sa Kahapon" },
    4: { title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus" },
    5: { title: "Ibong Pipit, Awit Nang Awit" }
  };

  const searchInput = document.querySelector('.searchbar');
  const dropdown = document.createElement('div');
  dropdown.style.position = 'absolute';
  dropdown.style.background = '#fff';
  dropdown.style.border = '1px solid #ccc';
  dropdown.style.maxHeight = '200px';
  dropdown.style.overflowY = 'auto';
  dropdown.style.display = 'none';
  dropdown.style.zIndex = '999';
  dropdown.style.fontFamily = 'Century Gothic, sans-serif';
  document.body.appendChild(dropdown);

  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim().toLowerCase();
    dropdown.innerHTML = '';

    if (!val) {
      dropdown.style.display = 'none';
      return;
    }

    for (const id in articles) {
      const article = articles[id];
      const titleLower = article.title.toLowerCase();

      if (titleLower.includes(val)) {
        const item = document.createElement('div');
        item.textContent = article.title;
        item.style.padding = '8px';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid #eee';

        item.addEventListener('click', () => {
          // Load article dynamically using existing function
          if (typeof loadArticle === 'function') {
            loadArticle(id);
          }

          // Optional: briefly highlight corresponding sidebar article
          const relatedItem = document.querySelector(`.related[data-id="${id}"]`);
          if (relatedItem) {
            relatedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            relatedItem.style.background = '#ffffcc';
            setTimeout(() => relatedItem.style.background = '', 1000);
          }

          dropdown.style.display = 'none';
          searchInput.value = '';
        });

        dropdown.appendChild(item);
      }
    }

    const rect = searchInput.getBoundingClientRect();
    dropdown.style.left = `${rect.left + window.scrollX}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.display = dropdown.innerHTML ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.style.display = 'none';
    }
  });
});
