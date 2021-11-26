export default class DoubleSlider {
  element;

  constructor({
    min = 100,
    max = 200,
    value = "",
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
    this.selected = selected;
    this.formatValue = formatValue(value);
    this.addFormatValue();
    this.countLeftValue();
    this.countRightValue();
    this.render();
    this.thumbLeft = this.element.querySelector('.range-slider__thumb-left');
    this.thumbRight = this.element.querySelector('.range-slider__thumb-right');
    this.progress = this.element.querySelector('.range-slider__progress')
    this.leftValue = this.element.querySelector('[data-element="from"]');
    this.rightValue = this.element.querySelector('[data-element="to"]');
    this.initEvents();
  }

  addFormatValue(valueSlider) {
    return this.formatValue + valueSlider;
  }

  initEvents() {
    const wrapper = this.element.querySelector('.range-slider__inner');
    let isMovingThumbLeft = false;
    let isMovingThumbRight = false;

    this.thumbLeft.addEventListener('pointerdown', event => {
      isMovingThumbLeft = true;
      isMovingThumbRight = false;
    });

    this.thumbRight.addEventListener('pointerdown', event => {
      isMovingThumbLeft = false;
      isMovingThumbRight = true;
    });

    document.addEventListener('pointermove', event => {
      let rect = wrapper.getBoundingClientRect();
      if (isMovingThumbLeft) {
        this.selected.from = this.min + Math.round((event.clientX - rect.left) / rect.width * (this.max - this.min));
        this.update();
      }
      else if (isMovingThumbRight) {
        this.selected.to = this.min + Math.round((event.clientX - rect.left) / rect.width * (this.max - this.min));
        this.update();
      }
    });

    document.addEventListener('pointerup', event => {
      isMovingThumbLeft = false;
      isMovingThumbRight = false;
    })
  }

  get template() {
    return `<div class="range-slider">
              <p class="filter-name">${this.filterName}</p>
              <span data-element="from">${this.addFormatValue(this.selected.from)}</span>
              <div class="range-slider__inner">
                <span data-element="progress" class="range-slider__progress" 
                style="left: ${this.countLeftValue()}; right: ${this.countRightValue()}"></span>
                <span data-element="thumbLeft" class="range-slider__thumb-left" 
                style="left: ${this.countLeftValue()}"></span>
                <span data-element="thumbRight" class="range-slider__thumb-right" 
                style="right: ${this.countRightValue()}"></span>
              </div>
              <span data-element="to">${this.addFormatValue(this.selected.to)}</span>
            </div>`
  }

  countLeftValue() {
    return (this.selected.from - this.min)/(this.max - this.min) * 100 + '%';

  }

  countRightValue() {
    return (this.max - this.selected.to)/(this.max - this.min) * 100 + '%';
  }

  update() {
    if (this.selected.from < this.min) {
      this.selected.from = this.min
    }
    else if (this.selected.to > this.max) {
      this.selected.to = this.max
    }
    else if (this.selected.to < this.min) {
      this.selected.to = this.min
    }
    else if (this.selected.from > this.selected.to) {
      this.selected.from = this.selected.to
    }
    this.thumbLeft.style.left = this.countLeftValue();
    this.thumbRight.style.right = this.countRightValue();
    this.progress.style.left = this.countLeftValue();
    this.progress.style.right = this.countRightValue();
    this.leftValue.textContent = this.addFormatValue(this.selected.from);
    this.rightValue.textContent = this.addFormatValue(this.selected.to);
    if (this.element) {
      this.element.dispatchEvent(new CustomEvent('range-selected', {
        detail: {
          filterName: this.filterName,
          value: {
            from: this.selected.from,
            to: this.selected.to
          }
        }
      }));
    }
    const evtRange = new CustomEvent('filter-changed', {
      bubbles: true
    })
    this.element.dispatchEvent(evtRange);
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
