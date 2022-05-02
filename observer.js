/*
curl https://raw.githubusercontent.com/voischev/tool/main/observer.js > observer.js

const user = new Observer(elem.innerHTML);
user.subscribe(() => {
    elem.innerHTML = user.value
})
user.value = 'Ivan';
*/
class Observer {
    #subscribers = [];
    #value = null;
    constructor(initialValue) {
        this.#value = initialValue;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#subscribers.forEach(callback => callback());
    }

    subscribe(callback) {
        if (this.#subscribers.includes(callback) === false) {
            this.#subscribers.push(callback);
        }
        return () => {
            this.#subscribers = this.#subscribers.filter((subscriber) => subscriber !== callback);
        }
    }
}
