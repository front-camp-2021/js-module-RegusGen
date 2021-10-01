export default class CardsList {
  element;
  subElements = {};

  constructor ({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;

    // this.element = document.createElement('div');
    // this.element.classList.add('grid_container');
    this.render();
    this.getSubElements();
    this.update(data);
  }

  // render () {
  //   this.data.forEach((product) => {
  //     const card = new this.Component(product);
  //     this.element.appendChild(card.element);
  //   })
  // }

  get template () {
    return `<div>
        <h1>This is Cardlist component</h1>
        <div class="grid_container" data-element="body"></div>
</div>`
  }


  render () {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    this.subElements = result;
  }

  update (data) {
    this.data = data;
    const cards = data.map(item => {
      return new this.Component(item).element;
    });
    if (cards.length) {
      this.subElements.body.replaceChildren(...cards);
    } else {
      this.subElements.body.innerText = 'No products found';
    }
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
