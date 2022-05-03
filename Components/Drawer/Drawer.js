class Drawer {
    #element = null;
    constructor() {
        if (Drawer.singleton === true) {
            throw new Error('Drawer is singleton classes.');
            return null;
        }
        Drawer.singleton = true;

        const domElem = document.getElementById('drawer');
        if (domElem) {
            throw new Error('DOMElement id=drawer is exists.');
        }

        const drawer = document.createElement('div');
        drawer.id = 'drawer';
        drawer.style.cssText = 'position:fixed;inset:100% 0px 0px;';
        document.body.appendChild(drawer);
        drawer.onmousedown = function(event) {
            drawer.style.transition = '0s';
            const startOffetTop = drawer.offsetTop;
            const startY = event.clientY;
            let currentOffsetTop = drawer.offsetTop;
            drawer.onmousemove = function(event) {
                if (currentOffsetTop - startY + event.clientY > startOffetTop) {
                    drawer.style.top = startOffetTop - startY + event.clientY + 'px';
                }
                currentOffsetTop = drawer.offsetTop;
            }
            drawer.onmouseup = function() {
                drawer.style.transition = '0.2s';
                drawer.style.top = (currentOffsetTop > startOffetTop + 20) ? '100%' : startOffetTop + 'px';
                drawer.onmousemove = null;
            }
        }
        this.#element = drawer;
    }

    show(content) {
        if (!content) {
            throw new Error('No content');
        }
        this.#element.replaceChildren(content);
        this.#element.style.transition = '0.2s';
        // don't skip transition
        setTimeout(() => {
            this.#element.style.top = 100 + 'px';
        }, 0);
    }
}

