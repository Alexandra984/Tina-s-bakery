export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector('.search_field'),
    searchResultList: document.querySelector(".results_list"),
    searchRes: document.querySelector('.results'),
    searchPages: document.querySelector('.results_pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping_list'),
    likesMenu: document.querySelector('.likes_field'),
    likesList: document.querySelector('.likes_list'),
};

export const elementStrings = {
    loader: 'loader'
};

// creat loader spinner
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}