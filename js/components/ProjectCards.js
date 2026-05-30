// Компонент проектных карточек
export class ProjectCards {
    constructor(containerId, projects) {
        this.container = document.getElementById(containerId);
        this.projects = projects;
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = this.projects.map(project => `
            <article class="card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="card-links">
                    <a href="${project.demo}" target="_blank">Демо</a>
                    <a href="${project.github}" target="_blank">GitHub</a>
                </div>
            </article>
        `).join('');
    }

    updateProjects(projects) {
        this.projects = projects;
        this.render();
    }
}
