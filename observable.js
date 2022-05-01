/**
 * const user = new Observable(elem.innerHTML);
 * user.onUpdate(() => {
 *     elem.innerHTML = user.value
 * })
 */
class Observable {
    #listeners = [];
    #value = null;
    constructor(initialValue) {
        this.#value = initialValue;
    }

    get value() {
      return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#listeners.forEach(callback => callback());
    }

    onUpdate(callback) {
        this.#listeners.push(callback);
        return () => {
            const index = this.#listeners.indexOf(callback);
            this.#listeners = this.#listeners.splice(index, 1);
        }
    }
}
