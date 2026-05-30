// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// ОПРЕДЕЛЕНИЕ ВРЕМЕНИ СУТОК
// Функция возвращает, какое сейчас время суток: утро, день или вечер
export const getGreetingByHour = () => {
    const currentHour = new Date().getHours();  // Получаем текущий час (0-23)
    
    if (currentHour >= 5 && currentHour < 12) {
        return 'morning';   // Утро: с 5 до 12
    }
    if (currentHour >= 12 && currentHour < 18) {
        return 'afternoon'; // День: с 12 до 18
    }
    return 'evening';       // Вечер: с 18 до 5 утра
};

// ПОИСК ПРОЕКТОВ
// Фильтрует проекты по поисковому запросу и выбранным технологиям
// Параметры: 
//   projects - список всех проектов
//   filters - объект с настройками фильтрации { search, tech, category }
export const filterProjects = (projects, filters) => {
    // Проходим по каждому проекту и проверяем, подходит ли он под фильтры
    return projects.filter(project => {
        
        // Проверка 1: Поиск по тексту (название или описание)
        const matchesSearch = !filters.search || 
            project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            project.description.toLowerCase().includes(filters.search.toLowerCase());
        
        // Проверка 2: Фильтр по технологиям
        const matchesTech = !filters.tech || filters.tech.length === 0 ||
            filters.tech.some(tech => project.technologies.includes(tech));
        
        // Проверка 3: Фильтр по категории
        const matchesCategory = !filters.category || filters.category === 'all' ||
            project.category === filters.category;
        
        // Проект показывается, если он прошел ВСЕ три проверки
        return matchesSearch && matchesTech && matchesCategory;
    });
};

// ПОЛУЧЕНИЕ ВСЕХ ТЕХНОЛОГИЙ 
// Собирает все технологии из всех проектов
export const getAllTechnologies = (projects) => {
    // Используем reduce для сборки массива технологий
    return projects.reduce((allTechs, project) => {
        // Для каждой технологии в проекте
        project.technologies.forEach(tech => {
            // Если такой технологии ещё нет в списке - добавляем
            if (!allTechs.includes(tech)) {
                allTechs.push(tech);
            }
        });
        return allTechs;
    }, []); // Начинаем с пустого массива
};

// СРЕДНИЙ УРОВЕНЬ НАВЫКОВ
// Вычисляет средний уровень всех навыков
export const getAverageSkillLevel = (skills) => {
    // Сначала складываем все уровни
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    // Делим на количество навыков и округляем до 1 знака
    return (total / skills.length).toFixed(1);
};

// ЗАДЕРЖКА ДЛЯ ПОИСКА
// Используется, чтобы не искать при каждом нажатии клавиши,
// а подождать, пока пользователь закончит печатать
export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);           // Сбрасываем предыдущий таймер
        timer = setTimeout(() => func(...args), delay); // Запускаем новый
    };
};

// РАБОТА С ХРАНИЛИЩЕМ (localStorage)
// Простые функции для сохранения и получения данных
export const storage = {
    // Получить данные из localStorage
    get: (key, defaultValue = null) => {
        const value = localStorage.getItem(key);
        try {
            // Пытаемся превратить текст в объект
            return JSON.parse(value) ?? defaultValue;
        } catch {
            // Если не получилось - возвращаем как есть
            return value ?? defaultValue;
        }
    },
    
    // Сохранить данные в localStorage
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    // Получить данные из sessionStorage
    sessionGet: (key, defaultValue = null) => {
        const value = sessionStorage.getItem(key);
        try {
            return JSON.parse(value) ?? defaultValue;
        } catch {
            return value ?? defaultValue;
        }
    },
    
    // Сохранить данные в sessionStorage
    sessionSet: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};

//  ПРОВЕРКА ФОРМЫ
// Проверяет, правильно ли пользователь заполнил форму
export const validateForm = (formData) => {
    const errors = [];  // Массив для хранения ошибок
    
    // Проверка ФИО
    if (!formData.fio || formData.fio.trim().length < 2) {
        errors.push('ФИО должно содержать минимум 2 символа');
    }
    
    // Проверка телефона
    if (!formData.phone) {
        errors.push('Введите номер телефона');
    } else {
        // Убираем все лишние символы (пробелы, дефисы, скобки)
        const cleanPhone = formData.phone.replace(/[\s+\-()]/g, '');
        if (cleanPhone.length < 10 || cleanPhone.length > 12) {
            errors.push('Введите корректный номер телефона (10-12 цифр)');
        }
    }
    
    // Проверка даты
    if (!formData.date) {
        errors.push('Выберите дату');
    } else {
        const today = new Date().toISOString().split('T')[0];
        if (formData.date < today) {
            errors.push('Дата не может быть раньше сегодняшней');
        }
    }

    // Возвращаем результат: есть ошибки или нет, и список ошибок
    return {
        isValid: errors.length === 0,  // true если ошибок нет
        errors: errors                  // массив с ошибками
    };

};


