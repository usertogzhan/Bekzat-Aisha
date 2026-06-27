// ==============================
// МУЗЫКА
// ==============================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");



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



const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImg");




lightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});
// ==============================
// ПЛАВНОЕ ПОЯВЛЕНИЕ (ОБНОВЛЕННОЕ)
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
    // ИСПРАВЛЕНИЕ: Не прячем и не двигаем секцию .hero, чтобы она не ломала скролл
    if (!section.classList.contains('hero')) {
        section.style.opacity = "0";
        section.style.transform = "translateY(70px)";
        section.style.transition = "1s";
        observer.observe(section);
    }
});



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

// ==============================
// ШТОРЫ + МУЗЫКА (ОБНОВЛЕННОЕ)
// ==============================

const curtainWrapper = document.querySelector(".curtain-wrapper");
const openBtn = document.querySelector(".btn-trigger");

if (openBtn && curtainWrapper) {

    openBtn.addEventListener("click", () => {

        music.volume = 0;
        music.play().catch(() => {});

        let volume = 0;
        const fade = setInterval(() => {
            volume += 0.05;
            if (volume >= 1) {
                volume = 1;
                clearInterval(fade);
            }
            music.volume = volume;
        }, 100);

        // 1. Открываем шторы
        curtainWrapper.classList.add("opened");

        // 2. ИСПРАВЛЕНИЕ: Плавно фиксируем экран на второй фотке (.hero)
        const heroSection = document.querySelector(".hero");
        if (heroSection) {
            setTimeout(() => {
                heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50); // Минимальная задержка для корректного срабатывания
        }

        setTimeout(() => {
            curtainWrapper.classList.add("hidden");
        }, 1300);
    });
}
    

});

// ==============================
// ОТПРАВКА RSVP В TELEGRAM БОТ
// ==============================

// ВСТАВЬ СЮДА СВОИ ДАННЫЕ ИЗ ШАГОВ 1 И 2:
const TG_TOKEN = "8864001789:AAFv_SaVOQ6Rqg7cS50ATiDbaf28zlXv_-o"; 
const TG_CHAT_ID = "1617844349"; 

const rsvpForm = document.getElementById('rsvpForm');
const rsvpButtons = document.querySelectorAll('.rsvp-btn');
const nameInput = document.getElementById('guestName');

rsvpButtons.forEach(button => {
    button.addEventListener('click', function() {
        const name = nameInput.value.trim();

        // 1. Проверяем, ввёл ли гость имя
        if (!name) {
            alert('Өтінеміз, аты-жөніңізді жазыңыз!');
            nameInput.focus();
            return;
        }

        // 2. Получаем выбор (какую кнопку нажали)
        const choice = this.getAttribute('data-status');

        // 3. Формируем текст сообщения для тебя
        const message = `🔔 *Жаңа RSVP жауап!*\n\n` +
                        `👤 *Қонақ:* ${name}\n` +
                        `💌 *Жауабы:* ${choice}`;

        // Визуальный эффект загрузки на кнопке
        const originalText = this.textContent;
        this.textContent = "Жіберілуде...";
        this.disabled = true;

        // 4. Отправляем запрос в Telegram
        const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Рахмет! Жауабыңыз сәтті қабылданды. 🤍');
                rsvpForm.reset(); // Очищаем поле ввода имени
            } else {
                alert('Қателік кетті. Қайтадан байқап көріңіз.');
                console.error('Ошибка TG:', data);
            }
        })
        .catch(error => {
            console.error('Ошибка сети:', error);
            alert('Желіде қателік кетті. Интернетті тексеріңіз.');
        })
        .finally(() => {
            // Возвращаем кнопку в исходное состояние
            this.textContent = originalText;
            this.disabled = false;
        });
    });
});
