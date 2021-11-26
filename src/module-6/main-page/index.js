import Pagination from '../../module-5/pagination/index.js';
import SideBar from '../../module-4/side-bar/index.js';
import CardsList from '../../module-3/cards-list-v1/index.js';
import Search from '../search/index.js';
import { request } from './request';
import { prepareFilters } from './prepare-filters';
import Card from "../../module-2/card/index.js";


const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

const rangePrice = {
  min: 0,
  max: 85000,
  filterName: 'Price'
};

const rangeRating = {
  min: 0,
  max: 5,
  precision: 2,
  filterName: 'Rating'
};

export default class Page {
  element;
  pageLimit = 10;
  totalPages = 100;
  filters = new URLSearchParams();
  sideBar;
  listCards;
  pagination;
  quantity;
  search;



  constructor() {
    let dataCategories = request('http://localhost:3000/categories')
    let dataBrands = request('http://localhost:3000/brands')
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit.toString());

    this.render();
    Promise.all([dataCategories, dataBrands]).then((values) => {

      const listCategories = prepareFilters(values[0][0]);

      const listBrands = prepareFilters(values[1][0]);

      this.sideBar = new SideBar(listCategories, listBrands, rangePrice, rangeRating);
      this.element.querySelector('#sideBar').append(this.sideBar.element);

      this.sideBar.element.querySelector('#clear').addEventListener('click', () => {
        this.sideBar.filterListCategory.reset()
        this.sideBar.filterListBrand.reset()
        this.sideBar.sliderPrice.selected.from = this.sideBar.sliderPrice.min;
        this.sideBar.sliderPrice.selected.to = this.sideBar.sliderPrice.max;
        this.sideBar.sliderRating.selected.from = this.sideBar.sliderRating.min;
        this.sideBar.sliderRating.selected.to = this.sideBar.sliderRating.max;
        this.sideBar.sliderPrice.update();
        this.sideBar.sliderRating.update();
      })

      this.sideBar.filterListCategory.element.addEventListener('change', (event) => {
        if (event.target.checked) {
          this.sideBar.filterListCategory.addFilter(event.target.id)
        } else {
          this.sideBar.filterListCategory.removeFilter(event.target.id)
        }
      })

      this.sideBar.filterListBrand.element.addEventListener('change', (event) => {
        if (event.target.checked) {
          this.sideBar.filterListBrand.addFilter(event.target.id)
        } else {
          this.sideBar.filterListBrand.removeFilter(event.target.id)
        }
        })
    })

    this.search = new Search();
    this.element.querySelector('#search').append(this.search.element);

    this.search.element.addEventListener('input', (event) => {
      this.search.textSearch = event.target.value
      const evtRange = new CustomEvent('filter-changed', {
        bubbles: true
      })
      this.search.element.dispatchEvent(evtRange);
    })


    let dataProducts = request('http://localhost:3000/products');

    let products = [];

    dataProducts.then((value) => {
      products = value[0];
      this.quantity = products.length;
      this.element.querySelector('#total').innerHTML = this.quantity + ' results found';
      this.pagination = new Pagination({
        totalPages: Math.ceil(products.length / 9),
        currentPage: 1
      })
      this.element.querySelector('#pagination').append(this.pagination.element)

      this.listCards = new CardsList({
        data: products.slice((this.pagination.page - 1) * 9, this.pagination.page  * 9 ),
        Component: Card
      })
      this.element.querySelector('#listCards').append(this.listCards.element)
    })


    window.addEventListener('filter-changed', () =>{

      let listProducts = products
          .filter((product) => !this.sideBar.filterListCategory.list.some((item) => item.checked) ||
              this.sideBar.filterListCategory.list.some((item) => item.checked && item.value === product.category))
          .filter((product) => !this.sideBar.filterListBrand.list.some((item) => item.checked) ||
              this.sideBar.filterListBrand.list.some((item) => item.checked && item.value === product.brand))
          .filter((product) => product.price >= this.sideBar.sliderPrice.selected.from &&
              product.price <= this.sideBar.sliderPrice.selected.to)
          .filter((product) => product.rating >= this.sideBar.sliderRating.selected.from &&
              product.rating <= this.sideBar.sliderRating.selected.to)
          .filter((product) => !this.search.textSearch.length || product.title.toLowerCase().includes(this.search.textSearch))

      this.quantity = listProducts.length;
      this.element.querySelector('#total').innerHTML = this.quantity + ' results found';

      this.pagination.totalPages = Math.ceil(listProducts.length/9);
      this.pagination.updatePages();

      listProducts = listProducts.slice((this.pagination.page - 1) * 9, this.pagination.page  * 9 )
      this.listCards.update(listProducts)
    })

  }

  get template () {
    return `<div class="store">
                <div class="header">
                    <div class="header__name">
                      <svg class="header__name-icon" width="91" height="72" viewBox="0 0 91 72" fill="none"
                           xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g style="mix-blend-mode:darken">
                          <rect width="91" height="72" fill="url(#pattern0)"/>
                        </g>
                        <defs>
                          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0" transform="scale(0.0128205 0.0181818)"/>
                          </pattern>
                          <image id="image0" width="78" height="55" xlink:href="data:image/png;base64,
                          iVBORw0KGgoAAAANSUhEUgAAAE4AAAA3CAYAAACih3wUAAAAAXNSR0IArs4c6QAAEvhJREFUeAG9m2uMXddVx899zYwfaeq2QZDG
                          M+O4sT2xayIhISE+VKpaFFShfkBKpfYTLXWIWzXQIqGmQKkKIvChQkBVpEhNEZQ2fUSlQAIqUtWKOs74NbEdJ57x+JWXH0lmPA/fmfvk/1t7r
                          3POvXPH9tgzXp5999prr732Xv+99uOce134wK8dS0SFmPI8spulthp6wkaev1mbK2nnY/d8JW2X08UHyPKyGAPttx7c9Y1CIfl4K7hYaCv
                          vTO1YJleSIvUteEvot5OWyclb3z1y6MxnZb+p1CLtfmCo3RaH3rWI+v6B/qRcriTNljVQf4yYQdG+i4/2yI4fmyxu2z74y6VS6RH1UZByQWL
                          aiLfmWdexnQvQS0l1ri5fxyYnX/mR6vADtRbAQUWld0t3ow/MpEs+MOXmlg7Cx4HlpFD41O4HttxxdOzM76tUJx0dO9e6f+dm4WIaaPUkwO9
                          jiCugY0cnLQC27xjaVi6Xfq6md9FcuCVEgbJA2fBVlpC6WAXCzmv8oR11xeRn+nxWCT8aSgUAw2RJY60qTwnfMv+ixSyLHcRuYka3OTYpFpO
                          Hdr1/6AkZHVCqKBVPvPhKQaRxXTulA7kBxkHbMTK8vVIuHVSTu2TeHCM3ENxOlHuxVx1NjBijGE30RWXrlPChpGTAKU+KWgqAuIQcQABJQXEt
                          EwZpWmcNXEG9lIof27lr8OuSdICXaawKVxgRaIq0AwJig1nEY3nUDYLXpXIEESCvM5EVQp2QAzAHznDyiMNOhy1v1zPPgWPYefxl6FnsWVHx
                          L/A+riX6NdladfCOvnCquGNkaGu5UjogBwy0YrFgUWAO6UPF4FwXQFbvDnbVIfZ6bY9EWZ8SW5thZuihIyxMD0x6U6zIZXlVb4fM5F16Au/
                          3to/c82VVrxp4L4ydKirShvoq5f2yuyH1VIWC0DKH+FASLoG6AHJxrMxMdFS0wSkFDV0Hztqlzstp+FDOEGBTpxQkmTwKPHOFeJaaaasrl4
                          p/uGPknr+RZAl4OBYSe19os9zn2JGJwgtHThV37tyyo9JXHlODd3kT8tRWjDyzowrtuYGk4PoGahQHYY+6EFRm2lXdVOa018TcAYwwSZpxEdk
                          o6Tzvc1phBqJA14Q99237pb+UoX6l9MCo11tJrdZMFhfrCTyHR0dfKkFHDk+YAzt3bdmh5TkqtXdYRQSDbgDId2+LvBQl1Tl/LfC66sx++Ej
                          dSoFzEHJKvVmaxhSyYMsBpjI9W+0GlTOjAXGRaxdqnxm+986vqCYFb/zka4Vms5WQuI6447nWzhZ27bp3pFIpj0pge5rMBhJj+xnASeZy2/NS
                          nRsAD2tq7E0yJvajLAMuk/XgAjgxtBy3VM/vZRHPAKxdWLOYAUyG0mpzDdKBUU4e3XLvu/5YBcCz/eP05IV4VUlNdzBHDk0Ud+4aHlSkPa+K
                          DSEqgwogMXlEWImtXAT4Dh7yLNoyeTdAKVhmIAeeWcw+lgBH5ykyVojKkntV4DI5HHVGKaNSvMQiYgiYa7UAjoHj1cKfbh66c4+K7HkpeNR30
                          +FD48Wd7x8e7OursDzDlUNKHeBZmaUqkPBMKCwHHoBmQOYAok2+cyl2lGNdB3COE456gkGeLj83GhXIoCXPM75MXQGNdjNGXPCq2VpU+a2/H
                          Rze9HmZSCNv8tQb6VgPjZ4sHDowXty9e+v9/X19R6RnTwQeSda3F9RKkWyOAqgDsxx4KLrO9SKPfvLELBul/rlgOXkErBvKAHqAN1Vxy2Zcy
                          7RVk0SPrrpPNsUDZKFQFv/Wnw8Ovbt+/tzU38duG4cOTPhDV2H3r947Uu7T8mwl6wHEtwbw8sl2uR0MwK4+iTwYHncBjxVg+mrIRAdeelQx
                          RuQSxuGKNzOqWEpZxJn2UoWOpmY0A4c6OrcBqGkwoU93OWeOQ6Flj3nqUiNqtRastmB3yyLgfXXz4KZHJEwjT3xx9wNbR3TlGBUE631H7li
                          eYBMpLFEJ9OeR5MsWNYs8clT04TroIzMCvMia3PmuPAVOhthncgQiyxetxurzQErqbZjdtFjUjNb1hqOhsZSV163MXNPa9jvxAu/xu+9550N
                          qZqctB0FfX3m/xrae/nDIIofcvEcanGbyiLZwMEiT+YkIoJu208FhduKHg2fmoj4NnYXJF0OPZj6wenVyAc4jyPK0HMAJmghjioJ0f3PQluxv
                          LIVwKLQLunIo2tKhxTYBPJbh20+8564Nv/7OTRs3bbxjYFSKG60bPHOK0202cmKClwgzEOghOB3zeGDIhgU5tmgLKtGG61NlcmPswz1LJQzB
                          YJidq/679oK305re+kHb4iSyGDCzWeRlvcABhg4FTlPtZ+2mos1O1pzHsX2xWNIleCEZWF/78bYdg4fUzXtMSx/kFmVmUR89wKtwMEixGMGw
                          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"/>
                        </defs>
                      </svg>
                      <p class="header__name-text set-font">Online Store</p>
                    </div>
                    <div class="header__menu">
                      <div class="header__menu-icon center_items">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 6.25L8.61984 1L16.2397 6.25V14.5C16.2397
                                        15.3284 15.4816 16 14.5464 16H2.6933C1.75811 16 1 15.3284 1 14.5V6.25Z"
                                stroke="#7E72F2" stroke-linecap="round" stroke-linejoin="round"/>
                          <g transform="translate(5,8)">
                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.689087 9V1H6.5505V9" stroke="#7E72F2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </g>
                        </svg>
                      </div>
                      <div class="header__menu-sign center_items">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.651611 9L5.34074 5L0.651611 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <div class="header__menu-sign center_items">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.651611 9L5.34074 5L0.651611 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <p class="header__menu-section center_items set-font">eCommerce</p>
                      <div class="header__menu-sign center_items">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.651611 9L5.34074 5L0.651611 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <div class="header__menu-sign center_items">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.651611 9L5.34074 5L0.651611 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <p class="header__menu-subsection center_items set-font">Electronics</p>
                    </div>
                </div>
                <div class="main">
                  <div id="sideBar"></div>
                  <div class="main__right">
                    <div class="main__right-top">
                      <div id="total" class="textFilter set-font">${this.quantity} results found</div>
                      <div class="contButton">
                        <button class="buttonHeart">
                          <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9304 2.14929C14.1856 1.41343 13.1751 1 12.1214
                            1C11.0678 1 10.0573 1.41343 9.31241 2.14929L8.54698 2.90512L7.78154 2.14929C6.23017 0.61741 3.7149
                            0.617411 2.16353 2.14929C0.612157 3.68118 0.612157 6.16485 2.16353 7.69674L2.92896 8.45256L8.54698
                            14L14.165 8.45256L14.9304 7.69674C15.6756 6.96122 16.0943 5.96344 16.0943 4.92302C16.0943 3.88259
                            15.6756 2.88481 14.9304 2.14929Z" stroke="white" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div id="search"></div>
                    <div id="listCards"></div>                    
                  </div>
                </div>
                <div id="pagination"></div>
            </div>`
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  remove () {
    if (this.element) {
      this.element.remove()
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
