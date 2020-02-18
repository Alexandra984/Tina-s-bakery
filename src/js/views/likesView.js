import {elements} from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart': 'icon-heart-outlined';
    document.querySelector('.recipe_love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
}

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes_link" href="#${like.id}">
                <figure class="likes_fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes_data">
                    <h4 class="likes_name">${like.title}.</h4>
                    <p class="likes_author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes_link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};