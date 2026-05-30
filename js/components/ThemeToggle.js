// Компонент переключения темы
export class ThemeToggle {
    constructor() {
        this.createButton();
        this.loadTheme();
    }

    createButton() {
        if (document.querySelector('.theme-toggle')) return;

        this.button = document.createElement('button');
        this.button.className = 'theme-toggle';
        this.button.setAttribute('aria-label', 'Переключить тему');
        document.body.appendChild(this.button);
        this.button.addEventListener('click', () => this.toggle());
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme === 'dark';

        if (isDark) {
            document.body.classList.add('dark-theme');
            this.button.innerHTML = '☀️';
        } else {
            document.body.classList.remove('dark-theme');
            this.button.innerHTML = '🌙';
        }
    }

    toggle() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.button.innerHTML = isDark ? '☀️' : '🌙';
    }
}
