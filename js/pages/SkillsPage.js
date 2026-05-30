import BasePage from './BasePage.js';
import { SKILLS, ACHIEVEMENTS } from '../data/constants.js';
import { getAverageSkillLevel } from '../utils/index.js';
import { DataTable } from '../components/DataTable.js';

export default class SkillsPage extends BasePage {
    async render() {
        this.renderSkillsIntro();
        this.renderSkillsTable();
        this.renderCalculator();
        this.renderCurrencyConverter();
        this.renderVisitsCounter();
        this.renderAchievements();
        await this.renderDataTable();
    }

    renderSkillsIntro() {
        const container = document.getElementById('skills-intro');
        if (!container) return;
        const avgLevel = getAverageSkillLevel(SKILLS);
        container.innerHTML = `
            <img src="static/images/Heh.jpg" alt="Навыки" class="skills-img">
            <p>Я умею жить и учиться новому. Постоянно развиваюсь и осваиваю современные технологии.</p>
            <p><strong>Средний уровень навыков: ${avgLevel} / 5</strong></p>
        `;
    }

    renderSkillsTable() {
        const container = document.getElementById('skills-table');
        if (!container) return;
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

    renderCalculator() {
        const container = document.getElementById('calculator');
        if (!container) return;
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
                <button id="calc-btn" type="button">Вычислить</button>
                <p id="calc-result" class="result-display"></p>
            </div>
        `;

        document.getElementById('calc-btn')?.addEventListener('click', () => {
            const valueA = parseFloat(document.getElementById('calc-a')?.value);
            const valueB = parseFloat(document.getElementById('calc-b')?.value);
            const operation = document.getElementById('calc-op')?.value;
            const resultEl = document.getElementById('calc-result');

            if (isNaN(valueA) || isNaN(valueB)) {
                if (resultEl) resultEl.innerText = '❌ Ошибка: введите оба числа!';
                return;
            }

            let result;
            switch (operation) {
                case '+': result = valueA + valueB; break;
                case '-': result = valueA - valueB; break;
                case '*': result = valueA * valueB; break;
                case '/':
                    if (valueB === 0) {
                        if (resultEl) resultEl.innerText = '❌ Ошибка: деление на ноль!';
                        return;
                    }
                    result = valueA / valueB;
                    break;
                default:
                    result = valueA + valueB;
            }

            if (resultEl) resultEl.innerText = `✅ Результат: ${result}`;
        });
    }

    renderCurrencyConverter() {
        const container = document.getElementById('currency-converter');
        if (!container) return;
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
                <button id="curr-btn" type="button">Конвертировать</button>
                <p id="curr-result" class="result-display"></p>
            </div>
        `;

        const rates = { RUB: 1, USD: 94.5, EUR: 102.3 };
        document.getElementById('curr-btn')?.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('curr-amount')?.value);
            const from = document.getElementById('curr-from')?.value;
            const to = document.getElementById('curr-to')?.value;
            const resultEl = document.getElementById('curr-result');

            if (isNaN(amount) || amount <= 0) {
                if (resultEl) resultEl.innerText = '❌ Введите корректную сумму (>0)';
                return;
            }

            const inRub = amount * rates[from];
            const result = inRub / rates[to];
            if (resultEl) resultEl.innerText = `💱 ${amount} ${from} = ${result.toFixed(2)} ${to}`;
        });
    }

    renderVisitsCounter() {
        const container = document.getElementById('visits-counter');
        if (!container) return;

        if (!localStorage.getItem('visitCounted')) {
            const count = parseInt(localStorage.getItem('visits') || '0', 10) + 1;
            localStorage.setItem('visits', String(count));
            localStorage.setItem('visitCounted', 'true');
        }

        const visitsCount = localStorage.getItem('visits') || '0';
        container.innerHTML = `
            <div class="visits-card">
                <p>Вы посетили эту страницу <strong id="visits-count">${visitsCount}</strong> раз(а)</p>
                <button id="reset-visits" type="button" class="reset-btn">Сбросить счётчик</button>
            </div>
        `;

        document.getElementById('reset-visits')?.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите сбросить счётчик?')) {
                localStorage.setItem('visits', '0');
                localStorage.removeItem('visitCounted');
                document.getElementById('visits-count').textContent = '0';
            }
        });
    }

    renderAchievements() {
        const container = document.getElementById('achievements-container');
        if (!container) return;

        container.innerHTML = `
            <div class="achievements">
                ${ACHIEVEMENTS.map(item => `
                    <div class="achievement-card">
                        <span class="achieve-num">${item.number}</span>
                        <p>${item.label}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async renderDataTable() {
        const container = document.getElementById('data-table-section');
        if (!container) return;
        container.innerHTML = `
            <h2>Таблица персонажей Rick and Morty</h2>
            <div id="data-table"></div>
        `;

        const table = new DataTable('data-table');
        await table.render();
    }
}
