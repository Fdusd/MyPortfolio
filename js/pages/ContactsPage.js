import { BasePage } from './BasePage.js';
import { CONTACT_INFO, WORKING_HOURS } from '../data/constants.js';
import { validateForm } from '../utils/index.js';
import { Modal } from '../components/Modal.js';

export class ContactsPage extends BasePage {
    constructor() {
        super('Контакты');
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
                    <small id="phone-error" class="error-message"></small>
                </div>
                <div class="form-group">
                    <label for="date">Дата</label>
                    <input id="date" name="date" type="date" required>
                </div>
                <div class="form-group">
                    <label for="photo">Фото (макс. 5 МБ)</label>
                    <input id="photo" name="photo" type="file" accept="image/*">
                    <small id="file-error" class="error-message"></small>
                    <img id="preview" class="preview-img" alt="Превью фото">
                </div>
                <button type="submit">Отправить</button>
            </form>
        `;

        this.setupForm();
        this.setupPhoneValidation();
        this.setupPhotoPreview();
    }

    setupPhoneValidation() {
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        
        phoneInput?.addEventListener('input', (e) => {
            let value = e.target.value;
            
            value = value.replace(/[^\d+\-() ]/g, '');
            e.target.value = value;
            
            const cleanPhone = value.replace(/[\s+\-()]/g, '');
            
            const isValidRussian = /^(\+7|8|7)?\d{10,11}$/.test(cleanPhone);
            
            if (value && !isValidRussian) {
                phoneError.textContent = '❌ Используйте российский номер (+7 или 8 в начале, всего 11 цифр)';
                phoneError.style.color = 'var(--error, #e74c3c)';
            } else if (value) {
                phoneError.textContent = '✅ Номер корректен';
                phoneError.style.color = 'var(--success, #27ae60)';
            } else {
                phoneError.textContent = '';
            }
        });
    }

    setupForm() {
        const form = document.getElementById('contactForm');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();

            const photoInput = document.getElementById('photo');
            const fileError = document.getElementById('file-error');
            
            // Проверка файла если он выбран
            if (photoInput?.files.length > 0) {
                const file = photoInput.files[0];
                const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ
                const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                
                if (!ALLOWED_TYPES.includes(file.type)) {
                    fileError.textContent = '❌ Допустимы только изображения (JPEG, PNG, GIF, WebP)';
                    fileError.style.color = 'var(--error, #e74c3c)';
                    return;
                }
                
                if (file.size > MAX_FILE_SIZE) {
                    fileError.textContent = `❌ Размер файла не должен превышать 5 МБ (текущий: ${(file.size / 1024 / 1024).toFixed(2)} МБ)`;
                    fileError.style.color = 'var(--error, #e74c3c)';
                    return;
                }
            }

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
            fileError.textContent = '';

            const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        });
    }

    setupPhotoPreview() {
        const photoInput = document.getElementById('photo');
        const fileError = document.getElementById('file-error');
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

        photoInput?.addEventListener('change', function() {
            const file = this.files[0];
            fileError.textContent = '';
            fileError.style.color = 'var(--error, #e74c3c)';
            
            if (!file) {
                document.getElementById('preview').src = '';
                return;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                fileError.textContent = '❌ Допустимы только изображения (JPEG, PNG, GIF, WebP)';
                this.value = '';
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                fileError.textContent = `❌ Размер файла не должен превышать 5 МБ (текущий: ${(file.size / 1024 / 1024).toFixed(2)} МБ)`;
                this.value = '';
                return;
            }

            fileError.textContent = '✅ Файл загружен';
            fileError.style.color = 'var(--success, #27ae60)';
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById('preview');
                if (preview) preview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
}
