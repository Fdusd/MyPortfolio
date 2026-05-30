import { debounce } from '../utils/index.js';

const API_URL = 'https://rickandmortyapi.com/api/character/?page=1';

export class DataTable {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = [];
        this.filteredData = [];
        this.sortBy = 'name';
        this.statusFilter = 'all';
        this.searchText = '';
    }

    async render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="table-toolbar">
                <input id="table-search" type="search" placeholder="Поиск по имени персонажа">
                <select id="table-status">
                    <option value="all">Все статусы</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">unknown</option>
                </select>
                <select id="table-sort">
                    <option value="name">Сортировать: Имя</option>
                    <option value="species">Сортировать: Вид</option>
                    <option value="status">Сортировать: Статус</option>
                </select>
            </div>
            <div id="table-content" class="table-wrapper"></div>
            <p id="table-notice" class="table-notice">Загрузка таблицы...</p>
        `;

        this.setupListeners();
        await this.loadData();
    }

    setupListeners() {
        const search = document.getElementById('table-search');
        const status = document.getElementById('table-status');
        const sort = document.getElementById('table-sort');

        const apply = debounce(() => {
            this.searchText = search?.value || '';
            this.statusFilter = status?.value || 'all';
            this.sortBy = sort?.value || 'name';
            this.updateTable();
        }, 200);

        search?.addEventListener('input', apply);
        status?.addEventListener('change', apply);
        sort?.addEventListener('change', apply);
    }

    async loadData() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();
            if (!result.results) {
                throw new Error('Неверный ответ API');
            }
            this.data = result.results;
            this.updateTable();
        } catch (error) {
            const notice = document.getElementById('table-notice');
            if (notice) {
                notice.textContent = 'Ошибка загрузки данных. Попробуйте позже.';
            }
            console.error('DataTable load error:', error);
        }
    }

    updateTable() {
        this.filteredData = this.data
            .filter(character => character.name.toLowerCase().includes(this.searchText.toLowerCase()))
            .filter(character => this.statusFilter === 'all' || character.status === this.statusFilter)
            .sort((a, b) => {
                if (this.sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                }
                return a[this.sortBy].localeCompare(b[this.sortBy]);
            });

        this.renderTable();
    }

    renderTable() {
        const tableContent = document.getElementById('table-content');
        const notice = document.getElementById('table-notice');

        if (!tableContent || !notice) return;

        if (this.filteredData.length === 0) {
            notice.textContent = 'Персонажи не найдены по текущим параметрам.';
            tableContent.innerHTML = '';
            return;
        }

        notice.textContent = `Найдено ${this.filteredData.length} персонажей.`;
        tableContent.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Статус</th>
                        <th>Вид</th>
                        <th>Локация</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.filteredData.map(character => `
                        <tr>
                            <td>${character.name}</td>
                            <td>${character.status}</td>
                            <td>${character.species}</td>
                            <td>${character.location.name}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}
