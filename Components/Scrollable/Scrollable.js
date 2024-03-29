/*
curl https://raw.githubusercontent.com/voischev/tool/main/Components/Scrollable/Scrollable.js > Scrollable.js
*/
class Scrollable {
    #element = null;
    #style = null;
    #index = null;
    constructor(element, callback) {
        let style = document.getElementById('scrollable');
        if (style) {
            if (style.tagName.toLowerCase() !== 'style') {
                throw new Error('DOMElement id=scrollable is exists.');
            }
        } else {
            style = document.createElement('style');
            style.id = 'scrollable';
            style.innerHTML = [
                '.Scrollable{display:flex;overflow-x:scroll;flex-wrap:nowrap;scroll-snap-type:x mandatory;}',
                '.ScrollableItem{flex:0 0 100%;scroll-snap-align:start;}'
            ].join('');
            document.head.appendChild(style);
        }
        this.#style = style;

        element.classList.add('Scrollable');

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio < 0.75 || !entry.isIntersecting || entry.intersectionRatio === 0) {
                    return;
                }
                this.#index = Array.from(element.children).indexOf(entry.target);

                if (typeof callback === 'function') {
                    callback(entry.target, this.#index, element);
                }
            });
        }, {
            root: element,
            threshold: [0.0, 0.75]
        });

        for (let i = 0; i < element.children.length; i++) {
            if (i === 0) {
                this.#index = 0;
            }
            const item = element.children[i];
            io.observe(item);
            item.classList.add('ScrollableItem');
        }
        this.#element = element;
    }
    get index() {
        return this.#index;
    }
    set index(n) {
        this.#element.scrollLeft = n * this.#element.offsetWidth;
    }
}
