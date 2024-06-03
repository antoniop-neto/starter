import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // taking the id from URL
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    // Loading Recipe
    await model.loadRecipe(id);
    // Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
