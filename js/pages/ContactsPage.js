import BasePage from './BasePage.js';
import { CONTACT_INFO, WORKING_HOURS } from '../data/constants.js';
import { validateForm } from '../utils/index.js';
import { Modal } from '../components/Modal.js';

export default class ContactsPage extends BasePage {
    constructor() {
        super();
        this.modal = new Modal();
    }

    render() {
        this.renderContactInfo();
        this.renderWorkingHours();
        this.renderForm();
    }

    renderContactInfo() {
        const container = document.getElementById('contact-info');
        if (!container) return;
        container.innerHTML = `
            <ul class="contacts-list">
                ${CONTACT_INFO.map(item => `<li>${item.icon} ${item.label}: ${item.value}</li>`).join('')}
            </ul>
        `;
    }

    renderWorkingHours() {
        const container = document.getElementById('working-hours');
        if (!container) return;
        container.innerHTML = `
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr><th>День</th><th>Часы</th></tr>
                    </thead>
                    <tbody>
                        ${WORKING_HOURS.map(slot => `<tr><td>${slot.day}</td><td>${slot.hours}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderForm() {
        const container = document.getElementById('contact-form');
        if (!container) return;
        container.innerHTML = `
            <form id="contactForm">
                <div class="form-group">
                    <label for="fio">ФИО</label>
                    <input id="fio" name="fio" type="text" placeholder="Иванов Иван Иванович" required>
                </div>
                <div class="form-group">
                    <label for="phone">Телефон</label>
                    <input id="phone" name="phone" type="tel" placeholder="+7 900 123-45-67" required>
                </div>
                <div class="form-group">
                    <label for="date">Дата</label>
                    <input id="date" name="date" type="date" required>
                </div>
                <div class="form-group">
                    <label for="photo">Фото</label>
                    <input id="photo" name="photo" type="file" accept="image/*">
                    <img id="preview" class="preview-img" alt="Превью фото">
                </div>
                <button type="submit">Отправить</button>
            </form>
        `;

        this.setupForm();
        this.setupPhotoPreview();
    }

    setupForm() {
        const form = document.getElementById('contactForm');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = {
                fio: document.getElementById('fio')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                date: document.getElementById('date')?.value || ''
            };

            const validation = validateForm(formData);
            if (!validation.isValid) {
                alert('❌ Ошибки:\n' + validation.errors.join('\n'));
                return;
            }

            this.modal.open('✅ Форма успешно отправлена!');
            form.reset();
            const preview = document.getElementById('preview');
            if (preview) preview.src = '';

            const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        });
    }

    setupPhotoPreview() {
        const photoInput = document.getElementById('photo');
        photoInput?.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById('preview');
                if (preview) preview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
}
