import BasePage from './BasePage.js';
import { ACHIEVEMENTS } from '../data/constants.js';

export default class AboutPage extends BasePage {
    render() {
        this.renderContent();
        this.renderAchievements();
        this.renderDownload();
    }

    renderContent() {
        const container = document.getElementById('about-content');
        if (!container) return;
        container.innerHTML = `
            <p>Я студент. И я <strong>изучаю программирование</strong>.</p>
            <p>Мне нравится изучать веб-технологии и писать код.</p>
            <p>Сейчас я активно учу <em>HTML, CSS и C#</em>.</p>
            <p>Стараюсь практиковаться и делать небольшие проекты.</p>
            <div class="quote-block">
                <blockquote>"Код сам себя не напишет. Садись и делай."</blockquote>
            </div>
        `;
    }

    renderAchievements() {
        const container = document.getElementById('about-achievements');
        if (!container) return;
        container.innerHTML = `
            <div class="achievements">
                ${ACHIEVEMENTS.map(item => `
                    <div class="achievement-card">
                        <span class="achieve-num">${item.number}</span>
                        <p>${item.label}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderDownload() {
        const container = document.getElementById('resume-download');
        if (!container) return;
        container.innerHTML = `<a href="static/images/Резюме.pdf" download class="download-btn">📄 Скачать резюме</a>`;
    }
}
