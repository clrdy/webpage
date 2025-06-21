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
}
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
<script>
// Existing loadArticle logic remains unchanged
function loadArticle(id) {
  const article = articles[id];
  const main = document.getElementById("main-article");

  main.classList.add("fade-out");

  setTimeout(() => {
    document.getElementById("image").src = article.image;
    document.getElementById("title").textContent = article.title;
    document.getElementById("author").textContent = article.author;
    document.getElementById("content").innerHTML = article.content.replace(/\n\s*\n/g, "<br><br>").replace(/\n/g, " ");
    main.classList.remove("fade-out");
  }, 400);
}

// Clickable article box logic
document.querySelectorAll('.related').forEach(item => {
  item.addEventListener('click', () => {
    const id = item.getAttribute('data-id');
    loadArticle(id);
  });
});

// ✅ Dropdown Menu Injection & Logic
const dropdown = document.createElement("select");
dropdown.id = "articleDropdown";
dropdown.style.margin = "10px";
dropdown.style.padding = "5px";

// Add default option
const defaultOption = document.createElement("option");
defaultOption.textContent = "-- Select an article --";
defaultOption.disabled = true;
defaultOption.selected = true;
dropdown.appendChild(defaultOption);

// Populate dropdown with article titles
Object.entries(articles).forEach(([id, article]) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = article.title;
  dropdown.appendChild(option);
});

// On change, load the selected article
dropdown.addEventListener("change", function () {
  const selectedId = this.value;
  loadArticle(selectedId);
});

// Add the dropdown to the sidebar (or wherever you like)
document.querySelector(".sidebar").prepend(dropdown);
</script>



