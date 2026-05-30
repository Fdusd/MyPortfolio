// Главный файл приложения
import { HomePage, SkillsPage, AboutPage, ContactsPage } from './pages/index.js';
import { ThemeToggle } from './components/ThemeToggle.js';
import { storage, getGreetingByHour } from './utils/index.js';
import { GREETINGS } from './data/constants.js';

// ОПРЕДЕЛЯЕМ, КАКАЯ СТРАНИЦА ОТКРЫТА
// Смотрим на адрес в браузере и возвращаем нужную страницу
function getCurrentPage() {
    // Получаем имя файла из адреса (main.html, ISD1.html и т.д.)
    const currentPath = window.location.pathname.split('/').pop() || 'main.html';
    
    // Соответствие между адресом и классом страницы
    const pagesMap = {
        'main.html': HomePage,
        'ISD1.html': SkillsPage,
        'ISD2.html': AboutPage,
        'contacts.html': ContactsPage
    };
    
    // Если страница найдена - создаём её, иначе главную
    const PageClass = pagesMap[currentPath] || HomePage;
    return new PageClass();
}

// ПРИВЕТСТВИЕ ПРИ ПЕРВОМ ПОСЕЩЕНИИ
function showGreeting() {
    // Проверяем, не показывали ли уже приветствие в этой сессии
    const alreadyGreeted = storage.sessionGet('greeted');
    
    if (!alreadyGreeted) {
        // Определяем время суток и выбираем приветствие
        const timeOfDay = getGreetingByHour();  // 'morning', 'afternoon' или 'evening'
        const greetingText = GREETINGS[timeOfDay];
        
        alert(greetingText);  // Показываем всплывающее сообщение
        
        // Запоминаем, что уже показали
        storage.sessionSet('greeted', true);
    }
}

// ЗАПУСК ВСЕГО САЙТА
function setupScrollAnimations() {
    const sections = Array.from(document.querySelectorAll('section'));
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(24px)';
        section.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    const showVisible = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    showVisible();
    window.addEventListener('scroll', showVisible);
}

async function init() {
    showGreeting();
    new ThemeToggle();
    const currentPage = getCurrentPage();
    await currentPage.render();
    setupScrollAnimations();
}

// Ждём, пока страница полностью загрузится, потом запускаем
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();  // Если страница уже загружена - запускаем сразу
}