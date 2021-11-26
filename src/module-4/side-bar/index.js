import FiltersList from '../filters-list/index.js';
import DoubleSlider from "../../module-5/double-slider/index.js";

export default class SideBar {
  element;
  constructor (categoriesFilter = [], brandFilter = [], rangePrice = {}, rangeRating = {}) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;
    this.rangePrice = rangePrice;
    this.rangeRating = rangeRating;
    this.filterListCategory = new FiltersList({
      title: 'Category',
      list: this.categoriesFilter
    });
    this.filterListBrand = new FiltersList({
      title: 'Brand',
      list: this.brandFilter
    });
    this.sliderPrice = new DoubleSlider({
      min: this.rangePrice.min,
      max: this.rangePrice.max,
      filterName: this.rangePrice.filterName
    });
    this.sliderRating = new DoubleSlider({
      min: this.rangeRating.min,
      max: this.rangeRating.max,
      filterName: this.rangeRating.filterName
    })

    this.render();

  }

  get template() {
    return `
              <div class="main__left">
                <div class="main__left-filter">
                    <p class="textFilter set-font">Filters</p>
                    <div class="contButton">
                        <button class="buttonFilter">
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.79823 0.999718L1.01028 6.49446L6.77765 12.0108" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.79823 0.999718L1.01028 6.49446L6.77765 12.0108" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="main__left-bar">
                    <div class="categoryRange set-font">
                        <p class="nameCategory set-font">Multi Range</p>
                        
                        <div id="dbl"></div>
                        <div id="dblRating"></div>
                        
                    </div>
                    <div class="line">
                        <svg width="378" height="1" viewBox="0 0 378 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0.5H377.456" stroke="#D6D6D6"/>
                        </svg>
                    </div>
                    
                    <div id="category"></div>                 
                    
                    <div class="line">
                        <svg width="378" height="1" viewBox="0 0 378 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0.5H377.456" stroke="#D6D6D6"/>
                        </svg>
                    </div>
                    
                    <div id="brand"></div>
                    
                </div>
                <div class="main__left-button">
                    <button id="clear" class="buttonClear set-font center_items">CLEAR ALL FILTERS</button>
                </div>
            </div>
        `
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
    this.element.querySelector('#dbl').append(this.sliderPrice.element);
    this.element.querySelector('#dblRating').append(this.sliderRating.element);
    this.element.querySelector('#category').append(this.filterListCategory.element);
    this.element.querySelector('#brand').append(this.filterListBrand.element);
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
