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
let reachedEnd = false;

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

    if (isEmptyResponse(hits)) {
      return;
    }

    createGallery(hits);
    loadedCount += hits.length;

    // Показуємо кнопку, якщо є ще що вантажити
    if (!isReachedEnd(totalHits)) {
      showSuccessMessage(`Found ${totalHits} images for "${currentQuery}". Showing ${hits.length}.`);
      showLoadMoreButton();
    } else {
      showNoticeMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch(error) {
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
   
    if (isEmptyResponse(hits)) {
      return;
    }

    createGallery(hits);
    loadedCount += hits.length;

    scrollWindow();

    if (isReachedEnd(totalHits)) {
      showNoticeMessage("We're sorry, but you've reached the end of search results.");
    };
  } catch {
    showErrorMessage("Something went wrong. Please try again later.");
  } finally {
    hideLoadMoreLoader(!reachedEnd);
  }
}

function memoizeQuery(query) {
  currentQuery = query;
}

function resetPagination() {
  reachedEnd = false;
  currentPage = 1;
  loadedCount = 0;
}

function scrollWindow() {
  const cardHeight = document.querySelector(".gallery-item").getBoundingClientRect().height
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth'
  });
}

function isEmptyResponse(hits) {
  if (hits.length === 0) {
    reachedEnd = true;
    showNoticeMessage("We're sorry, but you've reached the end of search results.");

    return true;
  }

  return false;
}

function isReachedEnd(totalHits) {
  if (loadedCount >= totalHits) {
    reachedEnd = true;

    return true;
  }

  return false;
}
