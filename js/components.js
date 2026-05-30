// КОМПОНЕНТЫ ИНТЕРФЕЙСА
import { getAllTechnologies, filterProjects, debounce } from './utils.js';

// ПАНЕЛЬ ФИЛЬТРОВ
// Создаёт кнопки и поля для поиска проектов
export class FilterBar {
    constructor(containerId, allProjects, onFilterChange) {
        this.container = document.getElementById(containerId);  // Куда вставлять
        this.allProjects = allProjects;                         // Все проекты
        this.onFilterChange = onFilterChange;                   // Что делать после фильтрации
        this.currentFilters = { search: '', tech: [], category: 'all' }; // Текущие фильтры
        this.allTechnologies = getAllTechnologies(allProjects); // Все технологии
    }
    
    // Рисуем панель фильтров на странице
    render() {
        if (!this.container) return;
        
        // Создаём HTML для панели фильтров
        this.container.innerHTML = `
            <div class="filter-bar" style="margin-bottom: 20px;">
                <input type="text" id="search-input" placeholder="🔍 Поиск проектов..." 
                       style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ccc;">
                
                <select id="category-select" style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                    <option value="all">Все категории</option>
                    <option value="web">Веб-разработка</option>
                    <option value="desktop">Десктоп</option>
                </select>
                
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${this.allTechnologies.map(tech => `
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="checkbox" value="${tech}">
                            <span>${tech}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.setupEventListeners();  // Настраиваем отслеживание действий пользователя
    }
    
    // Настраиваем, что происходит когда пользователь что-то меняет
    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const categorySelect = document.getElementById('category-select');
        const techCheckboxes = document.querySelectorAll('#filter-bar input[type="checkbox"]');
        
        // Функция, которая срабатывает при изменении фильтров
        const handleFilterChange = debounce(() => {
            // Собираем выбранные технологии
            const selectedTech = Array.from(techCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            // Обновляем текущие фильтры
            this.currentFilters = {
                search: searchInput?.value || '',
                tech: selectedTech,
                category: categorySelect?.value || 'all'
            };
            
            // Применяем фильтры к проектам
            const filteredProjects = filterProjects(this.allProjects, this.currentFilters);
            this.onFilterChange(filteredProjects);  // Отправляем отфильтрованные проекты
        }, 300);  // Ждём 0.3 секунды после последнего действия
        
        // Подписываемся на события
        searchInput?.addEventListener('input', handleFilterChange);
        categorySelect?.addEventListener('change', handleFilterChange);
        techCheckboxes.forEach(cb => {
            cb.addEventListener('change', handleFilterChange);
        });
    }
}

// КАРТОЧКИ ПРОЕКТОВ
// Создаёт карточки для каждого проекта
export class ProjectCards {
    constructor(containerId, projects) {
        this.container = document.getElementById(containerId);  // Куда вставлять
        this.projects = projects;                               // Какие проекты показывать
    }
    
    // Рисуем карточки на странице
    render() {
        if (!this.container) return;
        
        // Для каждого проекта создаём HTML карточки
        const cardsHTML = this.projects.map(project => `
            <div class="card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="card-links">
                    <a href="${project.demo}">Посмотреть проект</a>
                    <a href="${project.github}">GitHub</a>
                </div>
            </div>
        `).join('');  // join('') склеивает все карточки в одну строку
        
        this.container.innerHTML = cardsHTML;
    }
    
    // Обновляем список проектов (например, после фильтрации)
    updateProjects(newProjects) {
        this.projects = newProjects;
        this.render();  // Перерисовываем
    }
}

// МОДАЛЬНОЕ ОКНО 
// Всплывающее окно с сообщением
export class Modal {
    constructor() {
        this.createModal();
    }
    
    // Создаём окно на странице (если его ещё нет)
    createModal() {
        if (document.getElementById('global-modal')) return;  // Уже есть - не создаём
        
        const modalHTML = `
            <div id="global-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <p id="modal-message">✅ Спасибо за отправку!</p>
                    <button id="modal-close-btn">Закрыть</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        this.modal = document.getElementById('global-modal');
        this.setupEventListeners();
    }
    
    // Настраиваем, как закрывать окно
    setupEventListeners() {
        const closeBtn = document.getElementById('modal-close-btn');
        closeBtn?.addEventListener('click', () => this.close());
        
        // Клик вне окна тоже закрывает
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) this.close();
        });
    }
    
    // Открыть окно с сообщением
    open(message = '✅ Спасибо за отправку!') {
        const messageEl = document.getElementById('modal-message');
        if (messageEl) messageEl.textContent = message;
        if (this.modal) this.modal.style.display = 'flex';
        
        // Автоматически закрываем через 3 секунды
        setTimeout(() => this.close(), 3000);
    }
    
    // Закрыть окно
    close() {
        if (this.modal) this.modal.style.display = 'none';
    }
}

// ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
// Кнопка для переключения между светлой и тёмной темой
export class ThemeToggle {
    constructor() {
        this.createButton();
        this.loadTheme();
    }
    
    // Создаём кнопку на странице
    createButton() {
        if (document.querySelector('.theme-toggle')) return;  // Уже есть
        
        this.button = document.createElement('button');
        this.button.className = 'theme-toggle';
        this.button.setAttribute('aria-label', 'Переключить тему');
        document.body.appendChild(this.button);
        this.button.addEventListener('click', () => this.toggle());
    }
    
    // Загружаем сохранённую тему
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme === 'dark';
        
        if (isDark) {
            document.body.classList.add('dark-theme');
            this.button.innerHTML = '☀️';  // Солнце = тёмная тема
        } else {
            document.body.classList.remove('dark-theme');
            this.button.innerHTML = '🌙';  // Луна = светлая тема
        }
    }
    
    // Переключаем тему
    toggle() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.button.innerHTML = isDark ? '☀️' : '🌙';
    }
}