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
});

document.addEventListener("DOMContentLoaded", () => {
    // Set up timestamp if any
    const timestamps = document.querySelectorAll(".timestamp");
    timestamps.forEach((el) => {
        const time = el.getAttribute("data-timestamp");
        if (time) {
            el.textContent = timeAgo(time);
        }
    });

    function timeAgo(dateStr) {
        const now = new Date();
        const past = new Date(dateStr);
        const diff = Math.floor((now - past) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }

    // ARTICLES DATA
    const articles = {
        1: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
        2: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
        3: "Lingon sa Kahapon",
        4: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
        5: "Ibong Pipit, Awit Nang Awit"
    };

    // SETUP SEARCHBAR
    const searchInput = document.querySelector(".searchbar");
    if (!searchInput) return;

    const dropdown = document.createElement("div");
    dropdown.style.position = "absolute";
    dropdown.style.background = "#fff";
    dropdown.style.border = "1px solid #ccc";
    dropdown.style.maxHeight = "200px";
    dropdown.style.overflowY = "auto";
    dropdown.style.display = "none";
    dropdown.style.zIndex = "1000";
    document.body.appendChild(dropdown);

    searchInput.addEventListener("input", () => {
        const val = searchInput.value.toLowerCase();
        dropdown.innerHTML = "";

        if (!val) {
            dropdown.style.display = "none";
            return;
        }

        Object.entries(articles).forEach(([id, title]) => {
            if (title.toLowerCase().includes(val)) {
                const item = document.createElement("a");
                item.textContent = title;
                item.href = `latestnews.html?id=${id}`;
                item.style.display = "block";
                item.style.padding = "8px";
                item.style.color = "black";
                item.style.textDecoration = "none";
                item.addEventListener("mouseover", () => item.style.background = "#eee");
                item.addEventListener("mouseout", () => item.style.background = "#fff");
                dropdown.appendChild(item);
            }
        });

        const rect = searchInput.getBoundingClientRect();
        dropdown.style.left = `${rect.left + window.scrollX}px`;
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.width = `${rect.width}px`;
        dropdown.style.display = "block";
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== searchInput) {
            dropdown.style.display = "none";
        }
    });

    // Populate article if on latestnews.html
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    if (articleId && window.location.pathname.includes("latestnews.html")) {
        const articleData = {
            1: {
                title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
                image: "instruments.JPG",
                content: "Full content of article 1..."
            },
            2: {
                title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
                image: "sweetplay.jpg",
                content: "Full content of article 2..."
            },
            3: {
                title: "Lingon sa Kahapon",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
                image: "litart.jpg",
                content: "Full content of article 3..."
            },
            4: {
                title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
                author: "By Mae Adelaine Alarcon | March 17, 2025",
                image: "art4.jpg",
                content: "Full content of article 4..."
            },
            5: {
                title: "Ibong Pipit, Awit Nang Awit",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
                image: "art5.jpg",
                content: "Full content of article 5..."
            }
        };

        const article = articleData[articleId];
        if (article) {
            document.getElementById("title").textContent = article.title;
            document.getElementById("author").textContent = article.author;
            document.getElementById("image").src = article.image;
            document.getElementById("content").innerHTML = article.content;
        }
    }
});
