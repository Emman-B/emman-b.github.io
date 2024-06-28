// Loads particles.js
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('home', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

// attaches a wrapper div to skill icons to have hover animations
document.querySelectorAll(".skills-container-item svg").forEach(function(svg) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("skills-container-item-icon");
    wrapper.innerHTML = svg.outerHTML;
    svg.parentNode.insertBefore(wrapper, svg);
    svg.parentNode.removeChild(svg);
});

// toggles the navbar in mobile view when opening the menu
document.getElementById("navbar-toggle").addEventListener("click", function(event) {
    event.currentTarget.classList.toggle("activated");
});

// toggles the navbar in mobile view when selecting an option
[...document.getElementsByClassName("nav-link")].forEach(function(navLink) {
    navLink.addEventListener("click", function() {
        const navbarToggle = document.getElementById("navbar-toggle");
        if (window.innerWidth <= 992) {
            navbarToggle.classList.toggle("activated");
        } else if (navbarToggle.classList.contains("activated")) {
            navbarToggle.classList.remove("activated");
        }
    });
});

// when window is resized, deactivates navbar mobile menu
window.addEventListener("resize", function() {
    const navbarToggle = document.getElementById("navbar-toggle");
    if (window.innerWidth > 992 && navbarToggle.classList.contains("activated")) {
        navbarToggle.classList.remove("activated");
    }
});