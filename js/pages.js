// СТРАНИЦЫ САЙТА
import { PROJECTS, SKILLS, ACHIEVEMENTS, CONTACT_INFO, WORKING_HOURS, USEFUL_LINKS, GREETINGS } from './data.js';
import { getGreetingByHour, getAverageSkillLevel, storage, validateForm } from './utils.js';
import { FilterBar, ProjectCards, Modal } from './components.js';

// БАЗОВАЯ СТРАНИЦА
// Родитель для всех страниц
class BasePage {
    render() {
        throw new Error('Каждая страница должна сама сказать, как рисовать');
    }
}

// ГЛАВНАЯ СТРАНИЦА
export class HomePage extends BasePage {
    render() {
        this.renderHero();        // Рисуем приветствие
        this.renderPhoto();       // Рисуем фото
        this.renderPreviews();    // Рисуем превью разделов
        this.renderLinks();       // Рисуем полезные ссылки
        this.initProjects();      // Запускаем проекты с фильтрами
    }
    
    // Приветственный текст
    renderHero() {
        const container = document.getElementById('hero-content');
        if (container) {
            container.innerHTML = `
                <p><strong>Привет.</strong> Это мой сайт. Это мой персональный сайт.</p>
                <p>Я изучаю программирование и развиваюсь в IT.</p>
            `;
        }
    }
    
    // Моё фото
    renderPhoto() {
        const container = document.getElementById('photo-section');
        if (container) {
            container.innerHTML = `
                <figure class="photo-figure">
                    <img src="static/images/image.png" alt="Мое фото" class="profile-img">
                    <figcaption>Это я во время работы над сайтом</figcaption>
                </figure>
            `;
        }
    }
    
    // Превью разделов "Скиллы" и "Обо мне"
    renderPreviews() {
        // Превью раздела "Скиллы"
        const skillsContainer = document.getElementById('skills-preview');
        if (skillsContainer) {
            skillsContainer.innerHTML = `
                <a href="ISD1.html" class="section-link"><h2>Скиллы →</h2></a>
                <div><p>Я умею: разрабатывать веб-сайты, программировать на C#, работать с базами данных</p></div>
            `;
        }
        
        // Превью раздела "Обо мне"
        const aboutContainer = document.getElementById('about-preview');
        if (aboutContainer) {
            aboutContainer.innerHTML = `
                <a href="ISD2.html" class="section-link"><h2>Обо мне →</h2></a>
                <div><p>Я хочу: стать профессиональным разработчиком, создавать полезные проекты, постоянно учиться</p></div>
            `;
        }
    }
    
    // Полезные ссылки
    renderLinks() {
        const container = document.getElementById('links-container');
        if (container) {
            container.innerHTML = USEFUL_LINKS.map(link => `
                <a href="${link.url}" target="_blank" class="external-link">${link.icon} ${link.title}</a>
            `).join('');
        }
    }
    
    // Запускаем проекты с фильтрацией
    initProjects() {
        // Создаём карточки проектов
        this.projectCards = new ProjectCards('projects-container', PROJECTS);
        this.projectCards.render();
        
        // Создаём панель фильтров
        this.filterBar = new FilterBar('filter-bar', PROJECTS, (filteredProjects) => {
            this.projectCards.updateProjects(filteredProjects);
        });
        this.filterBar.render();
    }
}

// СТРАНИЦА НАВЫКОВ
export class SkillsPage extends BasePage {
    render() {
        this.renderSkillsIntro();       // Вступление
        this.renderSkillsTable();       // Таблица навыков
        this.renderCalculator();        // Калькулятор
        this.renderCurrencyConverter(); // Конвертер валют
        this.renderVisitsCounter();     // Счётчик посещений
        this.renderAchievements();      // Достижения
    }
    
    // Вступление и средний уровень навыков
    renderSkillsIntro() {
        const container = document.getElementById('skills-intro');
        if (container) {
            const avgLevel = getAverageSkillLevel(SKILLS);
            container.innerHTML = `
                <img src="static/images/Heh.jpg" alt="Навыки" class="skills-img">
                <p>Я умею жить и учиться новому. Постоянно развиваюсь и осваиваю современные технологии.</p>
                <p><strong>Средний уровень навыков: ${avgLevel} / 5</strong></p>
            `;
        }
    }
    
    // Таблица с моими навыками
    renderSkillsTable() {
        const container = document.getElementById('skills-table');
        if (container) {
            container.innerHTML = `
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Навык</th>
                                <th>Уровень</th>
                                <th>Годы опыта</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${SKILLS.map(skill => `
                                <tr>
                                    <td>${skill.name}</td>
                                    <td>${'★'.repeat(skill.level)}${'☆'.repeat(skill.maxLevel - skill.level)}</td>
                                    <td>${skill.years}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    }
    
    // Калькулятор (сложение, вычитание, умножение, деление)
    renderCalculator() {
        const container = document.getElementById('calculator');
        if (container) {
            container.innerHTML = `
                <div class="calc-container">
                    <div class="calc-inputs">
                        <input type="number" id="calc-a" placeholder="Число A">
                        <select id="calc-op">
                            <option value="+">+ Сложение</option>
                            <option value="-">- Вычитание</option>
                            <option value="*">* Умножение</option>
                            <option value="/">/ Деление</option>
                        </select>
                        <input type="number" id="calc-b" placeholder="Число B">
                    </div>
                    <button id="calc-btn">Вычислить</button>
                    <p id="calc-result" class="result-display"></p>
                </div>
            `;
            
            // Что происходит при нажатии на кнопку "Вычислить"
            document.getElementById('calc-btn')?.addEventListener('click', () => {
                const numberA = parseFloat(document.getElementById('calc-a')?.value);
                const numberB = parseFloat(document.getElementById('calc-b')?.value);
                const operation = document.getElementById('calc-op')?.value;
                const resultElement = document.getElementById('calc-result');
                
                // Проверяем, что введены оба числа
                if (isNaN(numberA) || isNaN(numberB)) {
                    resultElement.innerText = '❌ Ошибка: введите оба числа!';
                    return;
                }
                
                // Вычисляем результат в зависимости от выбранной операции
                let result;
                switch(operation) {
                    case '+': result = numberA + numberB; break;
                    case '-': result = numberA - numberB; break;
                    case '*': result = numberA * numberB; break;
                    case '/': 
                        if (numberB === 0) {
                            resultElement.innerText = '❌ Ошибка: деление на ноль!';
                            return;
                        }
                        result = numberA / numberB;
                        break;
                    default: result = numberA + numberB;
                }
                
                resultElement.innerText = `✅ Результат: ${result}`;
            });
        }
    }
    
    // Конвертер валют (рубли, доллары, евро)
    renderCurrencyConverter() {
        const container = document.getElementById('currency-converter');
        if (container) {
            container.innerHTML = `
                <div class="currency-container">
                    <input type="number" id="curr-amount" placeholder="Сумма">
                    <div class="currency-selects">
                        <select id="curr-from">
                            <option value="RUB">RUB (Рубль)</option>
                            <option value="USD">USD (Доллар)</option>
                            <option value="EUR">EUR (Евро)</option>
                        </select>
                        <span>→</span>
                        <select id="curr-to">
                            <option value="USD">USD (Доллар)</option>
                            <option value="EUR">EUR (Евро)</option>
                            <option value="RUB">RUB (Рубль)</option>
                        </select>
                    </div>
                    <button id="curr-btn">Конвертировать</button>
                    <p id="curr-result" class="result-display"></p>
                </div>
            `;
            
            // Курсы валют (1 рубль = сколько-то)
            const exchangeRates = { RUB: 1, USD: 94.5, EUR: 102.3 };
            
            document.getElementById('curr-btn')?.addEventListener('click', () => {
                const amount = parseFloat(document.getElementById('curr-amount')?.value);
                const fromCurrency = document.getElementById('curr-from')?.value;
                const toCurrency = document.getElementById('curr-to')?.value;
                const resultElement = document.getElementById('curr-result');
                
                if (isNaN(amount) || amount <= 0) {
                    resultElement.innerText = '❌ Введите корректную сумму (>0)';
                    return;
                }
                
                // Сначала переводим в рубли, потом в нужную валюту
                const inRubles = amount * exchangeRates[fromCurrency];
                const result = inRubles / exchangeRates[toCurrency];
                
                resultElement.innerText = `💱 ${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
            });
        }
    }
    
    // Счётчик посещений страницы
    renderVisitsCounter() {
        const container = document.getElementById('visits-counter');
        if (container) {
            // Если это первый визит в этой сессии, увеличиваем счётчик
            if (!storage.sessionGet('visit')) {
                let visits = storage.get('visits', 0);
                visits = visits + 1;
                storage.set('visits', visits);
                storage.sessionSet('visit', true);
            }
            const visitsCount = storage.get('visits', 0);
            
            container.innerHTML = `
                <div class="visits-card">
                    <p>Вы посетили эту страницу <span id="visits-count">${visitsCount}</span> раз(а)</p>
                    <button id="reset-visits" class="reset-btn">Сбросить счётчик</button>
                </div>
            `;
            
            // Кнопка сброса счётчика
            document.getElementById('reset-visits')?.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите сбросить счётчик?')) {
                    storage.set('visits', 0);
                    storage.sessionSet('visit', false);
                    document.getElementById('visits-count').textContent = '0';
                }
            });
        }
    }
    
    // Мои достижения
    renderAchievements() {
        const container = document.getElementById('achievements-container');
        if (container) {
            container.innerHTML = `
                <div class="achievements">
                    ${ACHIEVEMENTS.map(achievement => `
                        <div class="achievement-card">
                            <span class="achieve-num">${achievement.number}</span>
                            <p>${achievement.label}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
}

// СТРАНИЦА "ОБО МНЕ"
export class AboutPage extends BasePage {
    render() {
        this.renderContent();        // Текст обо мне
        this.renderAchievements();   // Достижения
        this.renderDownload();       // Кнопка скачать резюме
    }
    
    // Текст обо мне
    renderContent() {
        const container = document.getElementById('about-content');
        if (container) {
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
    }
    
    // Достижения
    renderAchievements() {
        const container = document.getElementById('about-achievements');
        if (container) {
            container.innerHTML = `
                <div class="achievements">
                    ${ACHIEVEMENTS.map(achievement => `
                        <div class="achievement-card">
                            <span class="achieve-num">${achievement.number}</span>
                            <p>${achievement.label}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    // Кнопка скачать резюме
    renderDownload() {
        const container = document.getElementById('resume-download');
        if (container) {
            container.innerHTML = `<a href="static/images/Резюме.pdf" download class="download-btn">📄 Скачать резюме</a>`;
        }
    }
}

// СТРАНИЦА КОНТАКТОВ
export class ContactsPage extends BasePage {
    constructor() {
        super();
        this.modal = new Modal();  // Всплывающее окно для уведомлений
    }
    
    render() {
        this.renderContactInfo();   // Контактная информация
        this.renderWorkingHours();  // Режим работы
        this.renderForm();          // Форма обратной связи
    }
    
    // Контактная информация (телефон, почта, адрес)
    renderContactInfo() {
        const container = document.getElementById('contact-info');
        if (container) {
            container.innerHTML = `
                <ul class="contacts-list">
                    ${CONTACT_INFO.map(contact => `
                        <li>${contact.icon} ${contact.label}: ${contact.value}</li>
                    `).join('')}
                </ul>
            `;
        }
    }
    
    // Режим работы
    renderWorkingHours() {
        const container = document.getElementById('working-hours');
        if (container) {
            container.innerHTML = `
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr><th>День</th><th>Часы</th></tr>
                        </thead>
                        <tbody>
                            ${WORKING_HOURS.map(hour => `
                                <tr><td>${hour.day}</td><td>${hour.hours}</td></tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    }
    
    // Форма обратной связи
    renderForm() {
        const container = document.getElementById('contact-form');
        if (container) {
            container.innerHTML = `
                <form id="contactForm">
                    <div class="form-group">
                        <label>ФИО</label>
                        <input type="text" id="fio" placeholder="Иванов Иван Иванович">
                    </div>
                    <div class="form-group">
                        <label>Телефон</label>
                        <input type="tel" id="phone" placeholder="+7 900 123-45-67">
                    </div>
                    <div class="form-group">
                        <label>Дата</label>
                        <input type="date" id="date">
                    </div>
                    <div class="form-group">
                        <label>Фото</label>
                        <input type="file" id="photo" accept="image/*">
                        <img id="preview" width="100" style="margin-top: 10px;">
                    </div>
                    <button type="submit">Отправить</button>
                </form>
            `;
            this.setupForm();              // Настраиваем отправку формы
            this.setupPhotoPreview();     // Настраиваем предпросмотр фото
        }
    }
    
    // Настройка формы: проверка и отправка
    setupForm() {
        const form = document.getElementById('contactForm');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();  // Не перезагружать страницу
            
            // Собираем данные из формы
            const formData = {
                fio: document.getElementById('fio')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                date: document.getElementById('date')?.value || ''
            };
            
            // Проверяем, всё ли правильно заполнено
            const validation = validateForm(formData);
            if (!validation.isValid) {
                alert('❌ Ошибки:\n' + validation.errors.join('\n'));
                return;
            }
            
            // Если всё правильно - показываем уведомление
            this.modal.open();
            
            // Очищаем форму
            form.reset();
            const preview = document.getElementById('preview');
            if (preview) preview.src = '';

            // Сохранение формы
            let submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
            submissions.push(formData);
            localStorage.setItem("formSubmissions", JSON.stringify(submissions));
            console.log("Форма отправлена:", formData);
        });
    }
    
    // Предпросмотр фото перед отправкой
    setupPhotoPreview() {
        const photoInput = document.getElementById('photo');
        photoInput?.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const preview = document.getElementById('preview');
                    if (preview) preview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}