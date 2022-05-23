/*
curl https://raw.githubusercontent.com/voischev/tool/main/ProxyObserver.js > ProxyObserver.js

const po = new ProxyObserver((entries) => {
    entries.forEach(({ value, prop, target }) => {
        console.log(value, prop, target);
    });
});

const user = po.observe({ name: 'Ivan' });
user.age = '34';
*/
class ProxyObserver {
    #observationTargets = [];
    #queuedEntries = [];
    #callback = null;
    constructor(callback) {
        if (typeof callback !== 'function') {
            throw new Error('callback must be a function');
        }
        this.#callback = callback;
    }

    observe(target) {
        const isTargetAlreadyObserved = this.#observationTargets.some(item => item === target);

        if (isTargetAlreadyObserved) {
          return;
        }

        const isObject = (target && (typeof target === 'object' || typeof target === 'function'));

        if (!isObject) {
            throw new Error('target must be an Object');
            return;
        }

        this.#observationTargets.push(target);

        let flag = false;
        const handler = (target, prop, value) => {
            const result = Reflect.set(target, prop, value);

            if (typeof result === 'function') {
                result.bind(target);
            }

            if (result) {
                this.#queuedEntries.push({
                    prop,
                    value,
                    target,
                });

                if (!flag) {
                    flag = true;
                    requestAnimationFrame(() => {
                        flag = false;
                        if (this.#queuedEntries.length) {
                            this.#callback(this.takeRecords(), this);
                        }
                    });
                }
            }

            return result;
        }

        const proxy = new Proxy(target, { set: handler });

        if (this.#queuedEntries.length) {
            this.#callback(this.takeRecords(), this);
        }

        return proxy;
    }

    unobserve(target) {
        this.#observationTargets = this.#observationTargets.filter(item => item !== target);
    }

    disconnect() {
        this.#observationTargets = [];
        this.#queuedEntries = [];
        this.#callback = null;
    }

    takeRecords() {
        const records = this.#queuedEntries.slice();
        this.#queuedEntries = [];
        return records;
    }
}
