import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export class BasePage {
    constructor(pageTitle) {
        this.pageTitle = pageTitle;
        this.header = new Header('header-component');
        this.footer = new Footer('footer-component');
    }

    async init() {
        document.title = `Fdusd | ${this.pageTitle}`;
        this.header.init();
        await this.render();
        this.footer.init();
    }

    async render() {
        throw new Error('render() must be implemented by subclass');
    }
}
