// Главный файл приложения
import { HomePage, SkillsPage, AboutPage, ContactsPage } from './pages/index.js';
import { ThemeToggle } from './components/ThemeToggle.js';
import { storage, getGreetingByHour } from './utils/index.js';
import { GREETINGS } from './data/constants.js';

function getCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'main.html';
    
    const pagesMap = {
        'main.html': HomePage,
        'ISD1.html': SkillsPage,
        'ISD2.html': AboutPage,
        'contacts.html': ContactsPage
    };
    
    const PageClass = pagesMap[currentPath] || HomePage;
    return new PageClass();
}

function showGreeting() {
    const alreadyGreeted = storage.sessionGet('greeted');
    
    if (!alreadyGreeted) {
        const timeOfDay = getGreetingByHour();
        const greetingText = GREETINGS[timeOfDay];
        
        alert(greetingText);
        
        storage.sessionSet('greeted', true);
    }
}

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
    new ThemeToggle();
    showGreeting();
    const currentPage = getCurrentPage();
    await currentPage.init();
    setupScrollAnimations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}