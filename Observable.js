/*
curl https://raw.githubusercontent.com/voischev/tool/main/Observable.js > Observable.js

const user = new Observable(elem.innerHTML);
user.subscribe(() => {
    elem.innerHTML = user.value
})
user.value = 'Ivan';
*/
class Observable {
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
