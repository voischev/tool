/*
curl https://raw.githubusercontent.com/voischev/tool/main/Observer.js > Observer.js
*/
class Observer {
    #subscribers = [];
    #proxy = null;
    constructor(target) {
        const subscribers = this.#subscribers;
        this.#proxy = new Proxy(target, {
            set(target, prop, value) {
                const oldValue = target[prop];
                const result = Reflect.set(target, prop, value);
                if (result) {
                    subscribers.forEach(callback => callback(prop, value, oldValue));
                }
                return result;
            }
        });
    }
    get proxy() {
        return this.#proxy;
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

