// ФАЙЛ С ДАННЫМИ

// МОИ ПРОЕКТЫ 
// Массив с проектами.
export const PROJECTS = [
    {
        id: 1,                                    // Уникальный номер
        title: 'Портфолио сайт',                  // Название проекта
        description: 'Личный сайт с адаптивной версткой', // Описание
        image: 'static/images/tomat.jpg',         // Путь к картинке
        technologies: ['HTML', 'CSS', 'JS'],      // Какие технологии использовал
        github: 'https://github.com/Fdusd/-------2/tree/main',                              // Ссылка на GitHub
        demo: 'https://github.com/Fdusd/-------2/tree/main',                                // Ссылка на демо-версию
        category: 'web'                           // Категория: web, desktop, mobile
    },
    {
        id: 2,
        title: 'Учёт оборудования',
        description: 'Программа для учета техники',
        image: 'static/images/Kiwi.jpg',
        technologies: ['C#', 'WinForms'],
        github: '#',
        demo: '#',
        category: 'desktop'
    },
    {
        id: 3,
        title: 'Новый проект',
        description: 'Скоро здесь появится что-то интересное',
        image: 'static/images/tomat.jpg',
        technologies: ['React', 'Node.js'],
        github: '#',
        demo: '#',
        category: 'web'
    }
];

// МОИ НАВЫКИ
// Чему я научился
export const SKILLS = [
    { name: 'HTML', level: 4, maxLevel: 5, years: 1, description: 'Хорошо' },
    { name: 'CSS', level: 3, maxLevel: 5, years: 1, description: 'Средне' },
    { name: 'C#', level: 4, maxLevel: 5, years: 2, description: 'Хорошо' },
    { name: 'JavaScript', level: 3, maxLevel: 5, years: 0.5, description: 'Средне' },
    { name: 'SQL', level: 3, maxLevel: 5, years: 1, description: 'Средне' }
];

// МОИ ДОСТИЖЕНИЯ
// Мои успехи (цифры и что они означают)
export const ACHIEVEMENTS = [
    { number: '5+', label: 'Завершённых проектов' },
    { number: '100+', label: 'Часов кода' },
    { number: '3', label: 'Языка программирования' }
];

// КОНТАКТНАЯ ИНФОРМАЦИЯ
// Как со мной связаться
export const CONTACT_INFO = [
    { icon: '📞', label: 'Номер', value: '+7 904 491-72-40' },
    { icon: '✉️', label: 'Почта', value: 'ionserdmi@gmail.com' },
    { icon: '📍', label: 'Адрес', value: 'улица Пушкина, дом 121' }
];

// ГРАФИК РАБОТЫ
// Когда я на связи
export const WORKING_HOURS = [
    { day: 'Пн', hours: '10:00 - 18:00' },
    { day: 'Вт', hours: '10:00 - 18:00' },
    { day: 'Ср', hours: '10:00 - 18:00' },
    { day: 'Чт', hours: '10:00 - 18:00' },
    { day: 'Пт', hours: '10:00 - 16:00' },
    { day: 'Сб-Вс', hours: 'Выходной' }
];

// ПОЛЕЗНЫЕ ССЫЛКИ
// Ссылки на другие сайты
export const USEFUL_LINKS = [
    { url: 'https://www.youtube.com/', title: 'YouTube', icon: '🎬' },
    { url: 'https://github.com/', title: 'GitHub', icon: '💻' },
    { url: 'https://stackoverflow.com/', title: 'Stack Overflow', icon: '📚' }
];

// ПРИВЕТСТВИЯ
// Разные приветствия для разного времени суток
export const GREETINGS = {
    morning: '🌅 Доброе утро! Добро пожаловать на мой сайт.',
    afternoon: '☀️ Добрый день! Рад видеть вас на моём сайте.',
    evening: '🌙 Добрый вечер! Приятного просмотра сайта.'
};