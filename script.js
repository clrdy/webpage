// script.js
document.addEventListener('DOMContentLoaded', function() {
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

    updateAllTimestamps(); // First run
    setInterval(updateAllTimestamps, 60000); // Update every minute
});
// articles database
const articles = {
  1: {
    title: "Laban ng de Kuwerdas na Instrumento ngayong LCAF 2025",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "instruments.jpg",
    content: `Nota mula sa iba’t ibang instrumento ang bumalot sa Cavite State University Imus Gymnasium noong ika-13 ng Marso sa huling araw ng Local Culture and Arts Festival 2025. Nagdaos ng patimpalak sa musical instruments sa larangan ng violin, classic guitar, at banduria. Bilang mga kampeon, nasungkit nina Christofer Marky C. Gomez at Jeremie A. Canosa ang ginto sa pagtugtog ng banduria at classic guitar sa kantang “Karatong” na may 95.5% na kabuuang iskor. Idineklara namang wagi si John Josel Parole sa pagtugtog ng kantang “Ride Home” ng Ben&Ben gamit ang violin na nakatanggap ng 94% na iskor. Sa panghuli, pinarangalan din ng ginto si Adriane Ravil G. Reliosa sa pagtugtog ng classic guitar sa kantang “Kanlungan” ni Noel Cabangon at nakatanggap naman ng 95.5% mula sa mga hurado.`
  },
  2: {
    title: "Sa Pag-Iyak at Pag-Tawa, sa Sinag-Tala ang Korona",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "sweetplay.jpg",
    content: `Ginawaran ng Sinag-Tala Performing Arts Group ang entablado ng CvSU-Imus Gymnasium noong Marso 11, 2025 sa kanilang pagtatanghal ng sweet play dialogue na “Oras” at musical na “Kumot.” Alinsunod sa temang “Kultura’t Sining, Tanglaw ng Makabagong Panahon,” ang kanilang pagtatanghal ay tumanggap ng masigabong palakpakan mula sa mga manonood. Sila rin ang idineklarang kampeon sa parehong kategorya. Gumanap bilang hurado sina Joanna Mae Anglit at Kenneth Tolosa.`
  },
  3: {
    title: "Lingon sa Kahapon",
    author: "By Mae Adelaine Alarcon via The Flare | May 05, 2025",
    image: "litart.jpg",
    content: `Isang malikhaing pagsilip sa kasaysayan gamit ang wika ng sining at damdamin: Sa tulong ng mga larawang sinauna at tanawin ng Fuerte de Santiago, binigyang-buhay ng mga kalahok ang mga alaala ng lumipas na panahon. Sa bawat linya at larawan, muling isinilang ang mga tanong: Handa ka na bang lumingon sa kahapon?`
  },
  4: {
    title: "CBRC Holds National Teachers Education Quiz Bee at CvSU-Imus",
    author: "By Mae Adelaine Alarcon via The Flare | March 17, 2025",
    image: "art4.jpg",
    content: `Isinagawa ang CBRC National Teacher Education Quiz Bee noong Abril 4, 2025 sa CvSU-Imus Gymnasium. Nagwagi sina Ria Mae Del Rosario (2nd Place), Ramela Hojas (3rd Place), at Jahn Mark Casubuan (1st Place), na kakatawan sa CvSU-Imus sa Provincial Round sa Abril 26. Ang mga nanalo ay binigyan ng certificate, review scholarship, at materyales bilang paghahanda sa LET ngayong Setyembre.`
  },
  5: {
    title: "Ibong Pipit, Awit Nang Awit",
    author: "By Mae Adelaine Alarcon | May 05, 2025",
    image: "art5.jpg",
    content: `Isang makabayang sanaysay tungkol sa musika at tradisyong Pilipino. Sa gitna ng modernong mundo, ipinaglaban ng tagapagsalaysay ang kahalagahan ng kundiman, banduria, at mga lumang himig. Aniya, kahit bumagsak man ang ibong pipit, hindi ito titigil sa pag-awit.`
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".searchbar");
  if (!searchInput) return;

  // Create dropdown
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

  // Search logic
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

  // Hide dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.style.display = "none";
    }
  });

  // LOAD ARTICLE ON PAGE (latestnews.html)
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



