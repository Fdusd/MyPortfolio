export class Header {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.navLinks = [
            { name: 'Главная', href: 'main.html' },
            { name: 'Навыки', href: 'ISD1.html' },
            { name: 'Обо мне', href: 'ISD2.html' },
            { name: 'Контакты', href: 'contacts.html' }
        ];
    }

    render() {
        const currentPath = window.location.pathname.split('/').pop() || 'main.html';

        return `
            <input type="checkbox" id="menu-toggle">
            <label for="menu-toggle" class="burger">
                <span></span><span></span><span></span>
            </label>
            <nav class="container">
                <ul class="nav-links">
                    ${this.navLinks.map(link => `
                        <li>
                            <a href="${link.href}" class="${currentPath === link.href ? 'active' : ''}">
                                ${link.name}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
        }
    }
}
