import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

import {elements, renderLoader, clearLoader} from './views/base';


// ******** Global state of the app ************
// search object
// current recipe object
// shopping list object
// liked recipes
const state = {};

// Search controller
const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();


    if (query) {
        // 2) new search object and added to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        // 4) Search for recipes
        try {
            await state.search.getResults();

            // 5) render result on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert("something wrong with the search");
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        // console.log(goToPage);
        searchView.renderResults(state.search.result, goToPage);
    }
});

// Recipe controller
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        // create new recipe object
        state.recipe = new Recipe(id);
        

        // get recipe data and parse ingredients
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            
        // calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        // render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
        } catch(err) {
            alert("Error processing recipe");
        }
    }
}
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    }
    console.log(state.recipe);
});