import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'loaders.css/loaders.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const submitButton = document.querySelector('button[type="submit"]')
const loadMoreBtn = document.querySelector(".load-more");
// ініціалізуємо SimpleLightbox 
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: 'alt',
  captionDelay: 200,
});

const messageDefaults = { position: "topRight", timeout: 2000 };

// додаю HTML розмітку карток у gallery (дод однією операцією)
export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
          </a>
          <div class="info">
            <div>
              <p class="info-title">Likes</p>
              <p class="info-value">${likes}</p>
            </div>
            <div>
              <p class="info-title">Views</p>
              <p class="info-value">${views}</p>
            </div>
            <div>
              <p class="info-title">Comments</p>
              <p class="info-value">${comments}</p>
            </div>
            <div>
              <p class="info-title">Downloads</p>
              <p class="info-value">${downloads}</p>
            </div>
          </div>
        </li>
      `,
    )
    .join('');

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

//Очищаю галерею
export function clearGallery() {
  gallery.innerHTML = "";
  lightbox.refresh();
}

// відображення лоадера 
export function showSubmitLoader() {
  hideLoadMoreButton();
  submitButton.disabled = true;
  loader.classList.remove("hidden");
}
// Сховати лоадер
export function hideSubmitLoader() {
  loader.classList.add("hidden");
  submitButton.disabled = false;
}

export function showLoadMoreLoader() {
  hideLoadMoreButton();
  loader.classList.remove("hidden");
}

export function hideLoadMoreLoader() {
  loader.classList.add("hidden");
  showLoadMoreButton();
}

/* показує кнопку Load more. */
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}

/* прибирає кнопку Load more. */
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}

export function showSuccessMessage(message) {
  iziToast.success({
    ...messageDefaults,
    message,
  });
}

export function showErrorMessage(message) {
  iziToast.error({
    ...messageDefaults,
    message,
  });
}

export function showNoticeMessage(message) {
  iziToast.info({
    ...messageDefaults,
    message,
  });
}

export function showWarningMessage(message) {
  iziToast.warning({
    ...messageDefaults,
    title: "Warning",
    message,
  });
}
