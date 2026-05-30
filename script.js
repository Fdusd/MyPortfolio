// script.js - ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ

// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
})();

// Создаём кнопку переключения темы после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.createElement('button');
    const isDark = document.body.classList.contains('dark-theme');
    themeBtn.innerHTML = isDark ? '☀️' : '🌙';
    themeBtn.className = 'theme-toggle';
    themeBtn.setAttribute('aria-label', 'Переключить тему');
    document.body.appendChild(themeBtn);
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkNow = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        themeBtn.innerHTML = isDarkNow ? '☀️' : '🌙';
    });
});

// ПРИВЕТСТВИЕ
if(!sessionStorage.getItem("greeted")){
    const hour = new Date().getHours();
    let text = "";
    if(hour >= 5 && hour < 12){
        text = "🌅 Доброе утро! Добро пожаловать на мой сайт.";
    } else if(hour >= 12 && hour < 18){
        text = "☀️ Добрый день! Рад видеть вас на моём сайте.";
    } else{
        text = "🌙 Добрый вечер! Приятного просмотра сайта.";
    }
    alert(text);
    sessionStorage.setItem("greeted", "true");
}

// КАЛЬКУЛЯТОР
function updateButtonText() {
    const select = document.getElementById("dd");
    if (!select) return;
    const operation = select.value;
    const button = document.getElementById("calci");
    const operationNames = {
        '+': '➕ Сложить',
        '-': '➖ Вычесть',
        '*': '✖️ Умножить',
        '/': '➗ Разделить'
    };
    if(button) button.textContent = operationNames[operation] || 'Вычислить';
}

function calc() {
    const aInput = document.getElementById("a");
    const bInput = document.getElementById("b");
    const select = document.getElementById("dd");
    const resultEl = document.getElementById("result");
    
    if (!aInput || !bInput || !select || !resultEl) return;
    
    let a = parseFloat(aInput.value);
    let b = parseFloat(bInput.value);
    const operation = select.value;
    
    if (isNaN(a) || isNaN(b)) {
        resultEl.innerText = "❌ Ошибка: введите оба числа!";
        resultEl.style.color = "#ef4444";
        return;
    }
    
    let result;
    switch(operation) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': 
            if (b === 0) {
                resultEl.innerText = "❌ Ошибка: деление на ноль!";
                resultEl.style.color = "#ef4444";
                return;
            }
            result = a / b;
            break;
        default: result = a + b;
    }
    
    resultEl.innerText = `✅ Результат: ${result}`;
    resultEl.style.color = "#10b981";
}

// КОНВЕРТЕР ВАЛЮТ
const rates = { RUB: 1, USD: 94.5, EUR: 102.3 };

async function fetchRealRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
        const data = await response.json();
        if (data.rates) {
            rates.USD = data.rates.USD;
            rates.EUR = data.rates.EUR;
        }
    } catch(e) {
        console.log("Используются запасные курсы");
    }
}
fetchRealRates();

function convert() {
    const amountInput = document.getElementById("amount");
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const resultEl = document.getElementById("resultCurrency");
    
    if (!amountInput || !fromSelect || !toSelect || !resultEl) return;
    
    let amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        resultEl.innerText = "❌ Введите корректную сумму (>0)";
        resultEl.style.color = "#ef4444";
        return;
    }
    
    const from = fromSelect.value;
    const to = toSelect.value;
    
    const inRub = amount * rates[from];
    const result = inRub / rates[to];
    
    resultEl.innerText = `💱 ${amount} ${from} = ${result.toFixed(2)} ${to}`;
    resultEl.style.color = "#10b981";
}

// СЧЁТЧИК ПОСЕЩЕНИЙ
function updateVisitsCounter() {
    const visitsEl = document.getElementById("visites");
    if (!visitsEl) return;
    
    if(!sessionStorage.getItem("visit")){
        let visits = localStorage.getItem("visits");
        if(visits === null){
            visits = 0;
        }
        visits++;
        localStorage.setItem("visits", visits);
        sessionStorage.setItem("visit", "true");
    }
    visitsEl.innerText = localStorage.getItem("visits");
}

function resetVisits() {
    if(confirm("Вы уверены, что хотите сбросить счётчик посещений?")) {
        localStorage.setItem("visits", "0");
        sessionStorage.removeItem("visit");
        updateVisitsCounter();
        alert("✅ Счётчик сброшен!");
    }
}

// ПРЕДПРОСМОТР ФОТО
const photoInput = document.getElementById("photo");
if (photoInput) {
    photoInput.onchange = function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById("preview");
                if (preview) {
                    preview.src = e.target.result;
                }
            }
            reader.readAsDataURL(file);
        }
    }
}

// ПРОВЕРКА ДАТЫ 
const dateInput = document.getElementById("date");
if (dateInput) {
    dateInput.oninput = function() {
        const today = new Date().toISOString().split("T")[0];
        if(this.value < today){
            alert("⚠️ Дата не может быть раньше сегодняшней!");
            this.value = today;
        }
    }
}

// МОДАЛЬНОЕ ОКНО
window.openModal = function() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "flex";
        
        // Автоматически закрываем через 3 секунды
        setTimeout(function() {
            window.closeModal();
        }, 3000);
    }
}

window.closeModal = function() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Закрытие модалки по клику на фон
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Закрытие по ESC
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById("modal");
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
        window.closeModal();
    }
});

// ВАЛИДАЦИЯ ФОРМЫ
function validateForm(event) {
    // Останавливаем отправку формы
    if (event) event.preventDefault();
    
    // Получаем элементы
    const fio = document.getElementById("fio");
    const phone = document.getElementById("phone");
    const date = document.getElementById("date");
    
    // Проверка ФИО
    if (!fio || !fio.value.trim()) {
        alert("❌ Ошибка: Введите ФИО");
        if (fio) fio.focus();
        return false;
    }
    
    const fioValue = fio.value.trim();
    if (fioValue.length < 2) {
        alert("❌ Ошибка: ФИО должно содержать минимум 2 символа");
        fio.focus();
        return false;
    }
    
    // Проверка телефона
    if (!phone || !phone.value.trim()) {
        alert("❌ Ошибка: Введите номер телефона");
        if (phone) phone.focus();
        return false;
    }
    
    const phoneValue = phone.value.trim();
    const phoneClean = phoneValue.replace(/[\s+\-()]/g, '');
    if (phoneClean.length < 10 || phoneClean.length > 12) {
        alert("❌ Ошибка: Введите корректный номер телефона (10-12 цифр)");
        phone.focus();
        return false;
    }
    
    // Проверка даты
    if (!date || !date.value) {
        alert("❌ Ошибка: Выберите дату");
        if (date) date.focus();
        return false;
    }
    
    const today = new Date().toISOString().split("T")[0];
    if (date.value < today) {
        alert("❌ Ошибка: Дата не может быть раньше сегодняшней");
        date.focus();
        return false;
    }
    
    // Если все проверки пройдены
    window.openModal();
    
    // Сохраняем данные
    const formData = {
        fio: fioValue,
        phone: phoneValue,
        date: date.value,
        timestamp: new Date().toISOString()
    };
    
    let submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
    submissions.push(formData);
    localStorage.setItem("formSubmissions", JSON.stringify(submissions));
    
    console.log("Форма отправлена:", formData);
    
    // Очищаем форму
    fio.value = "";
    phone.value = "";
    date.value = "";
    const photoInputField = document.getElementById("photo");
    if (photoInputField) photoInputField.value = "";
    const preview = document.getElementById("preview");
    if (preview) preview.src = "";
    
    return false;
}

// ========== ЗАКРЫТИЕ МЕНЮ ==========
function setupMenuBehavior() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('nav a');
    
    if(!menuToggle) return;
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                menuToggle.checked = false;
                document.body.style.overflow = '';
            }
        });
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && menuToggle) {
            menuToggle.checked = false;
            document.body.style.overflow = '';
        }
    });
}

// ========== АКТИВНАЯ ССЫЛКА ==========
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if(linkPage === currentPage || 
           (currentPage === '' && linkPage === 'main.html') ||
           (currentPage === 'index.html' && linkPage === 'main.html')) {
            link.classList.add('active');
        }
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Счётчик посещений
    updateVisitsCounter();
    
    // Калькулятор
    if (document.getElementById("dd")) {
        updateButtonText();
    }
    
    // Меню
    setupMenuBehavior();
    
    // Активная ссылка
    setActiveLink();
    
    // Форма обратной связи
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        // Убираем inline-обработчик если есть
        contactForm.removeAttribute("onsubmit");
        // Добавляем новый обработчик
        contactForm.addEventListener("submit", validateForm);
    }
    
    // Плавное появление секций
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});