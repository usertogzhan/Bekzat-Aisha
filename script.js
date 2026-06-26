// ==============================
// МУЗЫКА
// ==============================

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "🔊";
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵";
    }

});

// ==============================
// ТАЙМЕР
// ==============================

const weddingDate = new Date("August 17, 2026 19:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent =
        hours.toString().padStart(2, "0");

    document.getElementById("minutes").textContent =
        minutes.toString().padStart(2, "0");

    document.getElementById("seconds").textContent =
        seconds.toString().padStart(2, "0");

}, 1000);

// ==============================
// УВЕЛИЧЕНИЕ ФОТО
// ==============================

const images = document.querySelectorAll(".photos img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImg");

images.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

    });

});

lightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});

// ==============================
// ПЛАВНОЕ ПОЯВЛЕНИЕ
// ==============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

sections.forEach(section => {

    section.style.opacity = "0";

    section.style.transform = "translateY(70px)";

    section.style.transition = "1s";

    observer.observe(section);

});

// ==============================
// ПАДАЮЩИЕ ЛЕПЕСТКИ
// ==============================

setInterval(() => {

    const petal = document.createElement("div");

    petal.innerHTML = "🌸";

    petal.style.position = "fixed";

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.top = "-50px";

    petal.style.fontSize = (18 + Math.random() * 18) + "px";

    petal.style.pointerEvents = "none";

    petal.style.animation = "petals 8s linear";

    petal.style.zIndex = "999";

    document.body.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 8000);

}, 450);

// ==============================
// ЗОЛОТЫЕ ЧАСТИЦЫ
// ==============================

document.addEventListener("mousemove", e => {

    const dot = document.createElement("span");

    dot.style.position = "fixed";

    dot.style.left = e.clientX + "px";

    dot.style.top = e.clientY + "px";

    dot.style.width = "6px";

    dot.style.height = "6px";

    dot.style.borderRadius = "50%";

    dot.style.background = "#d4af37";

    dot.style.pointerEvents = "none";

    dot.style.opacity = "1";

    document.body.appendChild(dot);

    dot.animate([

        {

            transform: "scale(1)",

            opacity: 1

        },

        {

            transform: "scale(4)",

            opacity: 0

        }

    ], {

        duration: 700

    });

    setTimeout(() => {

        dot.remove();

    }, 700);

});
