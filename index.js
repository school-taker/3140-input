import { getTextType, getAllTextTypes } from './textType.js';
import { h, render } from './tinyJsx.js';

// retrieve all elements for later use
const input = document.querySelector('input[type=text]');
const checkbox = document.querySelector('input[type=checkbox');
const outputEl = document.querySelector('.output');


// get html node for a type. Rendered using custom JSX library 
function getTypeHtml({ format, value }) {
    const container = document.createElement('div');
    render(container, [
        h('div', null, 
            h('strong', null, 'format: '),
            format || ''
        ),
        h('div', null, 
            h('strong', null, 'value: '),
            value || ''
        ),
    ]);

    return container;
}


// non pure mutation. Checks both inputs for values automatically.
function setNewHtml() {
    const text = input.value.trim();
    outputEl.innerHTML = '';

    // if checked, render all text types. Map is simple here
    if (!checkbox.checked) {
        const els = getAllTextTypes(text).map(getTypeHtml);
        for (const el of els) {
            outputEl.appendChild(el);
        }
        return;
    } 
    
    const el = getTypeHtml(getTextType(text));
    outputEl.appendChild(el);
}


// just be reactive to either input. Same functionality
input.addEventListener('input', setNewHtml);
checkbox.addEventListener('input', setNewHtml);