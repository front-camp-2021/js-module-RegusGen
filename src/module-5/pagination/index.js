export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;

  constructor({
    totalPages = 12,
    page = 1,
    currentPage = 1,
  } = {}) {
    this.totalPages = totalPages;
    this.page = currentPage;
    this.render();
    this.buttonPrevPage = this.element.querySelector('[data-element="prev"]');
    this.buttonNextPage = this.element.querySelector('[data-element="next"]');
    this.pagesList = this.element.querySelector('.pagination');
    this.initEvent();
  }

  initEvent() {
    this.buttonPrevPage.addEventListener('click', event => {
      this.goToPrevPage();
    });

    this.buttonNextPage.addEventListener('click', event => {
      this.goToNextPage();
    });

    this.pagesList.addEventListener('click', event => {
      let page = event.target.dataset.id;
      this.goToPage(parseInt(page));
    })
  }

  updatePages() {
    if (!this.totalPages) {
      this.totalPages = 1
    }
    if (this.page < 1) {
      this.page = 1
    }
    else if (this.page > this.totalPages) {
      this.page = this.totalPages
    }

    let pages = '';
    for (let i =0; i < this.totalPages; i++) {
      pages += this.pageTemplate(i);
    }
    this.element.querySelector('.pagination').innerHTML = pages;

    this.element.querySelector('.active').classList.remove('active');
    this.element.querySelectorAll('a')[this.page - 1].classList.add('active');
  }

  update() {
    if (this.page < 1) {
      this.page = 1
    }
    else if (this.page > this.totalPages) {
      this.page = this.totalPages
    }
    this.element.querySelector('.active').classList.remove('active');
    this.element.querySelectorAll('a')[this.page - 1].classList.add('active');

    const evt = new CustomEvent("filter-changed", {
      bubbles: true
    });
    this.element.dispatchEvent(evt);
  }

  pageTemplate(index) {
    if (index === (this.page - 1)) {
      return `<a data-id="${index + 1}" class="active">${index + 1}</a>`
    } else {
      return `<a data-id="${index + 1}">${index + 1}</a>`
    }
  }

  get template() {
    let pages = '';
    for (let i =0; i < this.totalPages; i++) {
      pages += this.pageTemplate(i);
    }
    return `<div class="footer">
            <div class="footer__pgnLeft">
                <button data-element="prev" type="button" class="footer__pgnLeft-icon center_items">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.09959 13L1.07361 7L7.09959 1" stroke="black" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="pagination set-font">
                ${pages}
            </div>
            <div class="footer__pgnRight">
                <button data-element="next" type="button" class="footer__pgnRight-icon center_items">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.93566 1L7.96164 7L1.93566 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            </div>`
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  goToPage(page) {
    this.page = page;
    this.update();
  }

  goToPrevPage () {
    this.page -= 1;
    this.update();
  }

  goToNextPage () {
    this.page += 1;
    this.update();
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
