import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showSubmitLoader,
  hideSubmitLoader,
  showLoadMoreLoader,
  hideLoadMoreLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showWarningMessage,
  showNoticeMessage,
  showSuccessMessage,
  showErrorMessage,
} from './js/render-functions.js';

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

const messageDefaults = { position: "topRight", timeout: 2000 };

// глобальний стан пагінації
let currentQuery = "";
let currentPage = 1;
let loadedCount = 0;

form.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim();
  //Якщо рядок пустий
  if (!query) {
    showWarningMessage("Please enter a search query!");
    return;
  }

  memoizeQuery(query);
  resetPagination();
  clearGallery();
  hideLoadMoreButton();
  showSubmitLoader();

  try {
    const { hits = [], totalHits = 0 } = await getImagesByQuery(currentQuery, currentPage);

    if (hits.length === 0) {
      showNoticeMessage('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    createGallery(hits);
    loadedCount += hits.length;

    // Показуємо кнопку, якщо є ще що вантажити
    if (loadedCount < totalHits) {
      showSuccessMessage(`Found ${totalHits} images for "${currentQuery}". Showing ${hits.length}.`);
      showLoadMoreButton();
    } else {
      showNoticeMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch {
    showErrorMessage("Something went wrong. Please try again later.");
  } finally {
    hideSubmitLoader();
  }
}

// Обробник кнопки Load more
async function onLoadMore() {
  // Збільшуємо сторінку
  currentPage += 1;
  showLoadMoreLoader();

  try {
    const { hits = [], totalHits = 0 } = await getImagesByQuery(currentQuery, currentPage);
   
    if (hits.length === 0) {
      // досягли кінця
      showNoticeMessage("We're sorry, but you've reached the end of search results.");
      return;
    }

    // Висота однієї картки перед додаванням
    const firstCard = document.querySelector(".gallery-item");
    const cardHeight = firstCard
      ? firstCard.getBoundingClientRect().height
      : 0;

    createGallery(hits);
    loadedCount += hits.length;

    // Плавний скрол на дві висоти картки
    if (cardHeight) {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
      });
    }

    if (loadedCount >= totalHits) {
      hideLoadMoreButton();
      showNoticeMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch {
    showErrorMessage("Something went wrong. Please try again later.");
  } finally {
    hideLoadMoreLoader();
  }
}

function memoizeQuery(query) {
  currentQuery = query;
}

function resetPagination() {
  currentPage = 1;
  loadedCount = 0;
}
