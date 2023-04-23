import { UnsplashAPI } from "./UnsplashAPI";
import Pagination from 'tui-pagination'; 
import 'tui-pagination/dist/tui-pagination.min.css';
import { createGalleryCard } from "./creatGalleryCard";

const container = document.getElementById('tui-pagination-container');
const jsGallery = document.querySelector('.js-gallery');

const options = { 
    totalItems: 0,
    itemsPerPage: 12,
    visiblePages: 5,
    page: 1,
}
const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();


const api = new UnsplashAPI()

api.getPopularImages(page).then(({ total, results }) => {
    pagination.reset(total);
    const markup = createGalleryCard(results);
    jsGallery.insertAdjacentHTML('afterbegin', markup);
});

pagination.on('afterMove', (event) => {
    const currentPage = event.page;
    api.getPopularImages(currentPage).then(({ total, results }) => {
        jsGallery.innerHTML = '';
        const markup = createGalleryCard(results);
        jsGallery.insertAdjacentHTML('afterbegin', markup);
});
});
