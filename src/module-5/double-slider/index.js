export default class DoubleSlider {
  element;

  constructor({
    min = 100,
    max = 200,
    formatValue = value => value,
    selected = {
      from: min,
      to: max
    },
    precision = 0,
    filterName = 'Price'
  } = {}) {
    this.filterName = filterName;
    this.min = min;
    this.max = max;
    this.render();
  }

  get template() {
    return `<div class="range-slider">
              <p class="filter-name">${this.filterName}</p>
              <span>${this.min}</span>
              <div class="range-slider__inner">
                <span data-element="progress" class="range-slider__progress" style="left: 0%; right: 0%"></span>
                <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: 0%"></span>
                <span data-element="thumbRight" class="range-slider__thumb-right" style="right: 0%"></span>
              </div>
              <span>${this.max}</span>
            </div>`
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

}
