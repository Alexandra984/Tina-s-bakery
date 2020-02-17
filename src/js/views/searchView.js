import {elements} from './base';

// read the input from input form

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results_link'));
    resultsArr.forEach(el => {
        el.classList.remove('results_link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add('results_link--active');
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    } 
    return title;
    
}
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a href="#${recipe.recipe_id}" class="results_link results_link--active">
                <figure class="results_fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results_data">
                    <h4 class="results_name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results_author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results_btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? (page - 1) : (page + 1)}</span>
        <svg class="search_icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`

const renderButtons = (page, numResults, resPerPage ) => {
    // how many pages are
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, "next");
    }else if (page < pages) {
        // Both buttons
        button =
            `${createButton(page, "prev")}
            ${createButton(page, "next")}`;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, "prev");
    }
    elements.searchPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    
    // for each page render the buttons
    renderButtons(page, recipes.length, resPerPage);
};