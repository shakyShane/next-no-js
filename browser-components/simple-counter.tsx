import { LitElement, html, property, customElement } from "lit-element";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
    @property() name = "World";
    private count = 0;

    static get properties() {
        return {
            count: { type: Number },
        };
    }

    _onClick = () => {
        this.count += 1;
    };

    render() {
        return html`
            <p>Hello, ${this.name}!</p>
            <button @click=${this._onClick}>Click Count: ${this.count}</button>
        `;
    }
}
