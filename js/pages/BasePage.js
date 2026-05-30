export default class BasePage {
    render() {
        throw new Error('Каждая страница должна реализовать render() метод');
    }
}
