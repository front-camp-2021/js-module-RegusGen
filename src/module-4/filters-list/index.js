export default class FiltersList {
  element;
  constructor ({
     title = '',
     list = []
  } = {}) {
    this.title = title;
    this.list = list;
    this.render();

  }

  get template() {
      return `<div class="category set-font">
                        <p class="nameCategory set-font">${this.title}</p>
                        <div class="listCategory">
                            <form>
                                ${this.list.map((item) => {
                                    return this.checkboxTemplate(item)
      }).join("")}
                            </form>                           
                        </div>
                    </div>`
  }

  addFilter(id) {
      let filter = this.list.find((item) => {
          return item.value === id
      })
      filter.checked = true;
      const evt = new CustomEvent("filter-changed", {
          bubbles: true
      });
      this.element.dispatchEvent(evt);
  }

  removeFilter(id) {
      let filter = this.list.find((item) => {
          return item.value === id
      })
      filter.checked = false;
      const evt = new CustomEvent("filter-changed", {
          bubbles: true
      });
      this.element.dispatchEvent(evt);
  }

  render() {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = this.template;
      this.element = wrapper.firstElementChild;
  }

  reset() {
      this.element.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
          if (checkbox.checked) {
              checkbox.checked = false;
          }
      })

      this.list.forEach((item) => item.checked = false)
      const evtRange = new CustomEvent('filter-changed', {
          bubbles: true
      })
      this.element.dispatchEvent(evtRange);
  }

  checkboxTemplate(item) {
      return `<input type="checkbox" id=${item.value} name="Category" ${item.checked ? "checked" : ""}>
              <label for=${item.value}>${item.title}</label><br>`
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
