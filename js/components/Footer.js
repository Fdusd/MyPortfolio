export class Footer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(year = 2026, author = 'Fdusd') {
        return `
            <div class="container">
                <p>${year} &copy; ${author}</p>
            </div>
        `;
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
        }
    }
}
