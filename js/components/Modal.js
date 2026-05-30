// Компонент модального окна
export class Modal {
    constructor() {
        this.createModal();
    }

    createModal() {
        if (document.getElementById('global-modal')) return;

        const modalHTML = `
            <div id="global-modal" class="modal">
                <div class="modal-content">
                    <p id="modal-message">✅ Спасибо за отправку!</p>
                    <button id="modal-close-btn" type="button">Закрыть</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('global-modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = document.getElementById('modal-close-btn');
        closeBtn?.addEventListener('click', () => this.close());
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) this.close();
        });
    }

    open(message = '✅ Спасибо за отправку!') {
        const messageEl = document.getElementById('modal-message');
        if (messageEl) messageEl.textContent = message;
        if (this.modal) this.modal.style.display = 'flex';
        setTimeout(() => this.close(), 3000);
    }

    close() {
        if (this.modal) this.modal.style.display = 'none';
    }
}
