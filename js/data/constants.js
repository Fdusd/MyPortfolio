// Константы сайта

export const PROJECTS = [
    {
        id: 1,
        title: 'Портфолио сайт',
        description: 'Личный сайт с адаптивной версткой',
        image: 'static/images/tomat.jpg',
        technologies: ['HTML', 'CSS', 'JS'],
        github: 'https://github.com/Fdusd/-------2/tree/main',
        demo: 'https://github.com/Fdusd/-------2/tree/main',
        category: 'web'
    },
    {
        id: 2,
        title: 'Учёт оборудования',
        description: 'Программа для учета техники',
        image: 'static/images/Kiwi.jpg',
        technologies: ['C#', 'WinForms'],
        github: 'https://github.com/Fdusd/Project-Data',
        demo: 'https://github.com/Fdusd/Project-Data',
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

export const SKILLS = [
    { name: 'HTML', level: 4, maxLevel: 5, years: 1, description: 'Хорошо' },
    { name: 'CSS', level: 3, maxLevel: 5, years: 1, description: 'Средне' },
    { name: 'C#', level: 4, maxLevel: 5, years: 2, description: 'Хорошо' },
    { name: 'JavaScript', level: 3, maxLevel: 5, years: 0.5, description: 'Средне' },
    { name: 'SQL', level: 3, maxLevel: 5, years: 1, description: 'Средне' }
];

export const ACHIEVEMENTS = [
    { number: '5+', label: 'Завершённых проектов' },
    { number: '100+', label: 'Часов кода' },
    { number: '3', label: 'Языка программирования' }
];

export const CONTACT_INFO = [
    { icon: '📞', label: 'Номер', value: '+7 904 491-72-40' },
    { icon: '✉️', label: 'Почта', value: 'ionserdmi@gmail.com' },
    { icon: '📍', label: 'Адрес', value: 'улица Пушкина, дом 121' }
];

export const WORKING_HOURS = [
    { day: 'Пн', hours: '10:00 - 18:00' },
    { day: 'Вт', hours: '10:00 - 18:00' },
    { day: 'Ср', hours: '10:00 - 18:00' },
    { day: 'Чт', hours: '10:00 - 18:00' },
    { day: 'Пт', hours: '10:00 - 16:00' },
    { day: 'Сб-Вс', hours: 'Выходной' }
];

export const USEFUL_LINKS = [
    { url: 'https://www.youtube.com/', title: 'YouTube', icon: '🎬' },
    { url: 'https://github.com/', title: 'GitHub', icon: '💻' },
    { url: 'https://rutube.ru/video/f3b615db135287a64584737e664e1e4b/?utm_source=embed&utm_medium=referral&utm_campaign=logo&utm_content=f3b615db135287a64584737e664e1e4b&utm_term=yastatic.net&t=1', title: 'Мой любимый сайт', icon: '📚' }
];

export const GREETINGS = {
    morning: '🌅 Доброе утро! Добро пожаловать на мой сайт.',
    afternoon: '☀️ Добрый день! Рад видеть вас на моём сайте.',
    evening: '🌙 Добрый вечер! Приятного просмотра сайта.'
};
