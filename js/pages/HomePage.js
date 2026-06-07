import { BasePage } from './BasePage.js';
import { PROJECTS, USEFUL_LINKS, GREETINGS } from '../data/constants.js';
import { ProjectCards } from '../components/ProjectCards.js';
import { FilterBar } from '../components/FilterBar.js';
import { ThemeToggle } from '../components/ThemeToggle.js';
import { getGreetingByHour } from '../utils/index.js';

export class HomePage extends BasePage {
    constructor() {
        super('Главная');
    }
    render() {
        this.renderHero();
        this.renderPhoto();
        this.renderPreviews();
        this.renderLinks();
        this.initProjects();
        new ThemeToggle();
    }

    renderHero() {
        const container = document.getElementById('hero-content');
        if (!container) return;
        container.innerHTML = `
            <p><strong>Привет.</strong> Это мой сайт. Это мой персональный сайт.</p>
            <p>Я изучаю программирование и развиваюсь в IT.</p>
        `;
    }

    renderPhoto() {
        const container = document.getElementById('photo-section');
        if (!container) return;
        container.innerHTML = `
            <figure class="photo-figure">
                <img src="static/images/image.png" alt="Мое фото" class="profile-img">
                <figcaption>Это я во время работы над сайтом</figcaption>
            </figure>
        `;
    }

    renderPreviews() {
        const skillsContainer = document.getElementById('skills-preview');
        if (skillsContainer) {
            skillsContainer.innerHTML = `
                <a href="ISD1.html" class="section-link"><h2>Скиллы →</h2></a>
                <p>Я умею: разрабатывать веб-сайты, программировать на C#, работать с базами данных.</p>
            `;
        }

        const aboutContainer = document.getElementById('about-preview');
        if (aboutContainer) {
            aboutContainer.innerHTML = `
                <a href="ISD2.html" class="section-link"><h2>Обо мне →</h2></a>
                <p>Я хочу: стать профессиональным разработчиком, создавать полезные проекты, постоянно учиться.</p>
            `;
        }
    }

    renderLinks() {
        const container = document.getElementById('links-container');
        if (!container) return;
        container.innerHTML = USEFUL_LINKS.map(link => `
            <a href="${link.url}" target="_blank" class="external-link">${link.icon} ${link.title}</a>
        `).join('');
    }

    initProjects() {
        const cards = new ProjectCards('projects-container', PROJECTS);
        cards.render();

        const filterBar = new FilterBar('filter-bar', PROJECTS, (filteredProjects) => {
            cards.updateProjects(filteredProjects);
        });
        filterBar.render();
    }
}
