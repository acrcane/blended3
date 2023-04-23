import { UnsplashAPI } from './UnsplashAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { createGalleryCard } from './creatGalleryCard';
import { Notify } from 'notiflix';

const container = document.getElementById('tui-pagination-container');
const jsGallery = document.querySelector('.js-gallery');
const formEl = document.querySelector('.js-search-form');

formEl.addEventListener('submit', onFormSubmit);

const options = {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

const api = new UnsplashAPI();

api.getPopularImages(page).then(({ total, results }) => {
  container.classList.remove('is-hidden');
  pagination.reset(total);
  const markup = createGalleryCard(results);
  jsGallery.insertAdjacentHTML('afterbegin', markup);
});

function popular(event) {
  const currentPage = event.page;
  api.getPopularImages(currentPage).then(({ total, results }) => {
    jsGallery.innerHTML = '';
    const markup = createGalleryCard(results);
    jsGallery.insertAdjacentHTML('afterbegin', markup);
  });
}

pagination.on('afterMove', popular);

function onFormSubmit(event) {
  event.preventDefault();
  const { query } = event.currentTarget.elements;
  const searchValue = query.value.trim();
  console.log(searchValue);
    if (searchValue === '') return;
  pagination.off('afterMove', popular);
    pagination.off('afterMove', imagesByQuery);
  api.query = searchValue;
    api.getImagesByQuery(page).then(({ total, results }) => {
        if (results.length === 0) { 
            container.classList.add('is-hidden');
            Notify.failure('Images not found');
            return;
        }   
    container.classList.remove('is-hidden');
    jsGallery.innerHTML = '';
    pagination.reset(total);
    const markup = createGalleryCard(results);
        jsGallery.insertAdjacentHTML('afterbegin', markup);
        Notify.success(`Found ${total} images`);
  });
  pagination.on('afterMove', imagesByQuery);
}

function imagesByQuery(event) {
      const currentPage = event.page;
  api.getImagesByQuery(currentPage).then(({ total, results }) => {
    jsGallery.innerHTML = '';
    const markup = createGalleryCard(results);
    jsGallery.insertAdjacentHTML('afterbegin', markup);
  });
}
