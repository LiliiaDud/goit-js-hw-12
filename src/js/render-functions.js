import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'loaders.css/loaders.min.css';

const gallery = document.querySelector(".gallery");
const submitButton = document.querySelector('button[type="submit"]');
const loader = document.querySelector(".loader");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

export function createGallery(images) {
    const markup = images
      .map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
          <li class="gallery-item">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
            <div class="info">
              <p><b>Likes</b> ${likes}</p>
              <p><b>Views</b> ${views}</p>
              <p><b>Comments</b> ${comments}</p>
              <p><b>Downloads</b> ${downloads}</p>
            </div>
          </li>
        `)
      .join("");
//дод розмітку в DOM за одну операцію
  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}
// очищаю вміст галереї
export function clearGallery() {
  gallery.innerHTML = "";
}
//показу індикатор завантаження
export function showLoader() {
  submitButton.classList.add("hidden");
  loader.classList.remove("hidden");
}
//приовую індикатор завантаження
export function hideLoader() {
  loader.classList.add("hidden");
  submitButton.classList.remove("hidden");
}