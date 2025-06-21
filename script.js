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

document.addEventListener("DOMContentLoaded", () => {
    // Time ago for timestamps
    document.querySelectorAll(".timestamp").forEach(el => {
        const time = el.dataset.timestamp;
        if (time) el.textContent = timeAgo(time);
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

    // ARTICLES
    const articles = {
        1: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
        2: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
        3: "Lingon sa Kahapon",
        4: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
        5: "Ibong Pipit, Awit Nang Awit"
    };

    const searchInput = document.querySelector(".searchbar");
    if (!searchInput) return;

    const dropdown = document.createElement("div");
    dropdown.style.position = "absolute";
    dropdown.style.background = "white";
    dropdown.style.border = "1px solid gray";
    dropdown.style.zIndex = "999";
    dropdown.style.display = "none";
    dropdown.style.maxHeight = "200px";
    dropdown.style.overflowY = "auto";
    document.body.appendChild(dropdown);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        dropdown.innerHTML = "";

        if (!query) {
            dropdown.style.display = "none";
            return;
        }

        const rect = searchInput.getBoundingClientRect();
        dropdown.style.left = `${rect.left + window.scrollX}px`;
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.width = `${rect.width}px`;

        let hasMatch = false;

        Object.entries(articles).forEach(([id, title]) => {
            if (title.toLowerCase().includes(query)) {
                hasMatch = true;
                const link = document.createElement("a");
                link.href = `latestnews.html?id=${id}`;
                link.textContent = title;
                link.style.display = "block";
                link.style.padding = "10px";
                link.style.textDecoration = "none";
                link.style.color = "#000";
                link.addEventListener("mouseover", () => link.style.background = "#f0f0f0");
                link.addEventListener("mouseout", () => link.style.background = "#fff");
                dropdown.appendChild(link);
            }
        });

        dropdown.style.display = hasMatch ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== searchInput) {
            dropdown.style.display = "none";
        }
    });

    // Load article content on latestnews.html
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    if (articleId && location.pathname.includes("latestnews.html")) {
        const articleContent = {
            1: {
                title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
               
                content: "Full content for Article 1..."
            },
            2: {
                title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
            
                content: "Full content for Article 2..."
            },
            3: {
                title: "Lingon sa Kahapon",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
           
                content: "Full content for Article 3..."
            },
            4: {
                title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
                author: "By Mae Adelaine Alarcon | March 17, 2025",
        
                content: "Full content for Article 4..."
            },
            5: {
                title: "Ibong Pipit, Awit Nang Awit",
                author: "By Mae Adelaine Alarcon | May 05, 2025",
   
                content: "Full content for Article 5..."
            }
        };

        const article = articleContent[articleId];
        if (article) {
            document.getElementById("title").textContent = article.title;
            document.getElementById("author").textContent = article.author;
            document.getElementById("image").src = article.image;
            document.getElementById("content").innerHTML = article.content;
        }
    }
});

