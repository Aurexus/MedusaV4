// Common function to load header or footer dynamically
function loadComponent(id, file, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // run after component loaded
    })
    .catch(error => console.error('Error loading component:', error));
}

// Run after page loads
window.addEventListener('DOMContentLoaded', () => {
  loadComponent('header-container', 'header.html', initHeaderScripts);
  loadComponent('footer-container', 'footer.html', initChatbot);
});

// // Header setup
// function initHeaderScripts() {

//     const toggle = document.querySelector(".toggle");
//         if (toggle) {
//             toggle.addEventListener("click", () => {
//             const fr = document.getElementById("fr");
//             const en = document.getElementById("en");
//             if (fr && en) {
//                 fr.classList.toggle("active");
//                 en.classList.toggle("active");
//             }
//             });
//     }

//   const hamburger = document.getElementById("hamburger");
//   const menu = document.getElementById("menu");
//   const profile = document.querySelector(".profile");
//   const dropdownMenu = document.getElementById("dropdownMenu");

//   if (!hamburger || !menu) {
//     console.warn("Navbar elements not found");
//     return;
//   }

//   // Hamburger toggle
//   hamburger.addEventListener("click", () => menu.classList.toggle("show"));

//   // Active link highlight
//   const menuLinks = document.querySelectorAll(".menu a");
//   menuLinks.forEach(link => {
//     link.addEventListener("click", function () {
//       menuLinks.forEach(l => l.classList.remove("active"));
//       this.classList.add("active");
//       menu.classList.remove("show");
//     });
//   });

//   // Profile dropdown
//   if (profile && dropdownMenu) {
//     profile.addEventListener("click", () => {
//       dropdownMenu.classList.toggle("active");
//     });
//   }
// }


function initHeaderScripts() {
  // Language toggle
  const toggle = document.querySelector(".toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const fr = document.getElementById("fr");
      const en = document.getElementById("en");
      if (fr && en) {
        fr.classList.toggle("active");
        en.classList.toggle("active");
      }
    });
  }

  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const profile = document.querySelector(".profile");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (!hamburger || !menu) {
    console.warn("Navbar elements not found");
    return;
  }

  // Hamburger toggle
  hamburger.addEventListener("click", () => menu.classList.toggle("show"));

  // Active link highlight on click
  const menuLinks = document.querySelectorAll(".menu a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      menuLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
      menu.classList.remove("show");
    });
  });

  // ✅ Detect current page filename
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  menuLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").pop().toLowerCase();

    // Match both relative and exact names
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Profile dropdown
  if (profile && dropdownMenu) {
    profile.addEventListener("click", () => {
      dropdownMenu.classList.toggle("active");
    });
  }
}
