/**
 * const user = new Observer(elem.innerHTML);
 * user.onUpdate(() => {
 *     elem.innerHTML = user.value
 * })
 */
class Observer {
    #observers = [];
    #value = null;
    constructor(initialValue) {
        this.#value = initialValue;
    }

    get value() {
      return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#observers.forEach(callback => callback());
    }

    onUpdate(callback) {
        this.#observers.push(callback);
        return () => {
            const index = this.#observers.indexOf(callback);
            this.#observers = this.#observers.splice(index, 1);
        }
    }
}
