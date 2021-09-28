import Pagination from '../../module-5/pagination';
import SideBar from '../../module-4/side-bar';
import CardsList from '../../module-3/cards-list-v1';
import Search from '../search';
import { request } from './request';
import { prepareFilters } from './prepare-filters';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export default class Page {
  element;
  subElements = {};
  components = {};
  pageLimit = 10;
  totalPages = 100;
  filters = new URLSearchParams();

  constructor() {
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);

    // ... your logic
  }

  get template () {
    // ... your logic
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }

  remove () {
    // ... your logic
  }

  destroy () {
    // ... your logic
  }
}
