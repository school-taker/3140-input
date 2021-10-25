/**
 * @typedef HNode
 * @type {object}
 * @property {string} name - an ID.
 * @property {object} props - your name.
 * @property {(HNode | string)[]} children - your age.
 */

/**
 * Render JSX tree to DOM node.
 * @param {Element} el 
 * @param {HNode[] | HNode} tree 
 * @returns {undefined}
 */
export function render(el, tree) {
    if (!Array.isArray(tree)) {
        const { name, props, children } = tree; 
        
        const childEl = document.createElement(name);

        // add props to element
        for (const [key, val] of Object.entries(props)) {
            childEl.setProperty(key, val);
        }

        // render recursively if needed. 
        // render text immediately if it exists.
        for (const child of children) {
            if (typeof child !== 'object') {
                const node = document.createTextNode(child);
                childEl.appendChild(node);
                continue;
            }
            
            render(childEl, child);
        }

        el.appendChild(childEl);
        return;
    }

    // only allow HNode in array, so don't bother type checking
    for (const item of tree) {
        render(el, item);
    }
}

// easily creates an object from arguments. 
// we can't use default value, since user will explicitly define it
export const h = (name, props, ...children) => ({
    name, props: props || {}, children
})