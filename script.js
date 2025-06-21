function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}


function updateAllTimestamps() {
    const timestamps = document.querySelectorAll('.timestamp');
    
    timestamps.forEach(span => {
        const timestamp = span.getAttribute('data-timestamp');
        if (timestamp) {
            span.textContent = timeAgo(timestamp);
        }
    });

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.searchbar');
    const articles = document.querySelectorAll('.row a');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                article.style.display = ''; // show
            } else {
                article.style.display = 'none'; // hide
            }
        });
    });
});
// Article database shared across pages
const articles = {
  1: { 
    title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "instruments.JPG",
    content: `Nota mula sa iba’t ibang instrumento...` // shorten for example
  },
  2: {
    title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "sweetplay.jpg",
    content: `Hindi nagpahuli ang Dramatic Arts...`
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
    content: `Tila isang ibong pipit...`
  }
};

// --------------------- SEARCH BAR DROPDOWN ---------------------
window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.searchbar');
  if (!searchInput) return;

  const resultBox = document.createElement('div');
  resultBox.style.position = 'absolute';
  resultBox.style.background = '#fff';
  resultBox.style.border = '1px solid #ccc';
  resultBox.style.width = '200px';
  resultBox.style.zIndex = '1000';
  resultBox.style.maxHeight = '200px';
  resultBox.style.overflowY = 'auto';
  resultBox.style.display = 'none';
  resultBox.style.fontFamily = 'Century Gothic, sans-serif';
  resultBox.classList.add('search-dropdown');
  document.body.appendChild(resultBox);

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    resultBox.innerHTML = '';
    if (!query) {
      resultBox.style.display = 'none';
      return;
    }

    Object.entries(articles).forEach(([id, article]) => {
      if (article.title.toLowerCase().includes(query)) {
        const link = document.createElement('a');
        link.href = `latestnews.html?id=${id}`;
        link.textContent = article.title;
        link.style.display = 'block';
        link.style.padding = '8px';
        link.style.textDecoration = 'none';
        link.style.color = 'black';
        link.addEventListener('mouseover', () => link.style.background = '#eee');
        link.addEventListener('mouseout', () => link.style.background = 'white');
        resultBox.appendChild(link);
      }
    });

    const rect = searchInput.getBoundingClientRect();
    resultBox.style.top = `${rect.bottom + window.scrollY}px`;
    resultBox.style.left = `${rect.left + window.scrollX}px`;
    resultBox.style.display = resultBox.innerHTML ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultBox.contains(e.target)) {
      resultBox.style.display = 'none';
    }
  });
});

// --------------------- LOAD ARTICLE BY ID ---------------------
function loadArticle(id) {
  const article = articles[id];
  if (!article) return;

  const main = document.getElementById("main-article");
  if (!main) return;

  const image = document.getElementById("image");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const content = document.getElementById("content");

  if (image && title && author && content) {
    main.classList.add("fade-out");
    setTimeout(() => {
      image.src = article.image;
      title.textContent = article.title;
      author.textContent = article.author;
      content.innerHTML = article.content.replace(/\n\s*\n/g, "<br><br>").replace(/\n/g, " ");
      main.classList.remove("fade-out");
    }, 400);
  }
}

// --------------------- INIT ON latestnews.html ---------------------
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    loadArticle(id);
  }

  // Make sidebar articles clickable
  document.querySelectorAll('.related').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      if (id) loadArticle(id);
    });
  });
});


