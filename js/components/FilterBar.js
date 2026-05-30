import { getAllTechnologies, filterProjects, debounce } from '../utils/index.js';

export class FilterBar {
    constructor(containerId, projects, onFilterChange) {
        this.container = document.getElementById(containerId);
        this.projects = projects;
        this.onFilterChange = onFilterChange;
        this.currentFilters = { search: '', tech: [], category: 'all' };
        this.allTechnologies = getAllTechnologies(projects);
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="filter-bar">
                <input id="search-input" type="search" placeholder="🔍 Поиск проектов...">
                <select id="category-select">
                    <option value="all">Все категории</option>
                    <option value="web">Веб-разработка</option>
                    <option value="desktop">Десктоп</option>
                </select>
                <div class="filter-checkboxes">
                    ${this.allTechnologies.map(tech => `
                        <label class="filter-item">
                            <input type="checkbox" value="${tech}">
                            ${tech}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        this.setupListeners();
    }

    setupListeners() {
        const searchInput = document.getElementById('search-input');
        const categorySelect = document.getElementById('category-select');
        const techCheckboxes = Array.from(document.querySelectorAll('#filter-bar input[type="checkbox"]'));

        const handleFilter = debounce(() => {
            const selectedTech = techCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
            this.currentFilters = {
                search: searchInput?.value || '',
                tech: selectedTech,
                category: categorySelect?.value || 'all'
            };
            const filtered = filterProjects(this.projects, this.currentFilters);
            this.onFilterChange(filtered);
        }, 250);

        searchInput?.addEventListener('input', handleFilter);
        categorySelect?.addEventListener('change', handleFilter);
        techCheckboxes.forEach(cb => cb.addEventListener('change', handleFilter));
    }
}
