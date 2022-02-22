const form = document.querySelector('.search__form')
    .addEventListener('submit', onSubmit, { passive: false }, { once: false });
const resultsContainer = document.querySelector('.search__findings-list');
const countContainer = document.querySelector('.search__findings');
const errorContainer = document.querySelector('.search__error');

const renderError = () => {
    errorContainer.innerHTML = `
        <img src="./icon/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            Произошла ошибка...
        </p>
  `;
    countContainer.innerHTML = '';
};
const renderEmptyResults = () => {
    errorContainer.innerHTML = `
        <img src="./icon/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            По вашему запросу ничего не найдено, попробуйте уточнить запрос
        </p>
  `;
    countContainer.innerHTML = '';
};

const renderCount = count => {
    countContainer.innerHTML = `
      Найдено <span class="search__findings-amount">${count.toLocaleString(
        'ru-RU'
    )}</span> результатов
  `;
};

const onSubmitStart = () => {
    countContainer.innerHTML = `Загрузка...`;
    resultsContainer.innerHTML = '';
    errorContainer.innerHTML = '';
};

function template(item) {
    const newElement = document.createElement('li');
    newElement.classList.add('search__finding-item');
    newElement.innerHTML = `
      <a class="search__finding-link" href="${item.html_url}">
        ${item.full_name}
      </a>
      <span class="search__finding-description">${item.description}</span>
      `;
    return newElement;
}
async function onSubmit(event) {
    event.preventDefault();
    const insertValue = document.querySelector('.search__textfield').value;
    const url = `https://api.nomoreparties.co/github-search?q=${insertValue}`;
    onSubmitStart();
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            const { total_count, items } = resp;
            if (total_count) {
                renderCount(total_count);
                items.forEach(el => resultsContainer.appendChild(template(el)));
            }
            else {
                renderEmptyResults()
            }
        })
        .catch(() => { renderError() })
}





























