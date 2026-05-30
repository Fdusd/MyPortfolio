// Вспомогательные функции и утилиты

export const getGreetingByHour = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return 'morning';
    }
    if (currentHour >= 12 && currentHour < 18) {
        return 'afternoon';
    }
    return 'evening';
};

export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export const filterProjects = (projects, filters) => {
    return projects.filter(project => {
        const matchesSearch = !filters.search ||
            project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            project.description.toLowerCase().includes(filters.search.toLowerCase());

        const matchesTech = !filters.tech || filters.tech.length === 0 ||
            filters.tech.some(tech => project.technologies.includes(tech));

        const matchesCategory = !filters.category || filters.category === 'all' ||
            project.category === filters.category;

        return matchesSearch && matchesTech && matchesCategory;
    });
};

export const getAllTechnologies = (projects) => {
    return projects.reduce((allTechs, project) => {
        project.technologies.forEach(tech => {
            if (!allTechs.includes(tech)) {
                allTechs.push(tech);
            }
        });
        return allTechs;
    }, []);
};

export const getAverageSkillLevel = (skills) => {
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return (total / skills.length).toFixed(1);
};

export const storage = {
    get: (key, defaultValue = null) => {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value) ?? defaultValue;
        } catch {
            return value ?? defaultValue;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    sessionGet: (key, defaultValue = null) => {
        const value = sessionStorage.getItem(key);
        try {
            return JSON.parse(value) ?? defaultValue;
        } catch {
            return value ?? defaultValue;
        }
    },
    sessionSet: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};

export const validateForm = (formData) => {
    const errors = [];

    if (!formData.fio || formData.fio.trim().length < 2) {
        errors.push('ФИО должно содержать минимум 2 символа');
    }

    if (!formData.phone) {
        errors.push('Введите номер телефона');
    } else {
        const cleanPhone = formData.phone.replace(/[\s+\-()]/g, '');
        if (cleanPhone.length < 10 || cleanPhone.length > 12) {
            errors.push('Введите корректный номер телефона (10-12 цифр)');
        }
    }

    if (!formData.date) {
        errors.push('Выберите дату');
    } else {
        const today = new Date().toISOString().split('T')[0];
        if (formData.date < today) {
            errors.push('Дата не может быть раньше сегодняшней');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
