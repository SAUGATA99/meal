import { deleteFromFavourites, getFavouriteMeals } from "../favourites_handler.js"; 

const createMealCard = (meal_details) => {
    const container = document.createElement("a");
    container.classList.add("meal_card");
    container.href = `${window.location.origin}/details/details.html?id=${meal_details.idMeal}`;
    container.target = "_blank";
    container.title = meal_details.strMeal;

    const image = document.createElement("img");
    image.src = meal_details.strMealThumb;
    image.alt = meal_details.strMeal;
    container.appendChild(image);

    const name = document.createElement("div");
    name.classList.add("name");
    name.title = "Meal name";
    name.textContent = meal_details.strMeal;
    container.appendChild(name);

    // container to contain cuisine and remove button
    const info_and_button = document.createElement("div");
    info_and_button.classList.add("info_action");
    container.appendChild(info_and_button);

    const cuisine_wrapper = document.createElement("span");
    cuisine_wrapper.classList.add("cuisine_wrapper");
    cuisine_wrapper.textContent = "Cuisine: "
    info_and_button.appendChild(cuisine_wrapper);

    const cuisine = document.createElement("span");
    cuisine.classList.add("cuisine");
    cuisine.textContent = meal_details.strArea;
    cuisine_wrapper.appendChild(cuisine);

    const remove_button = document.createElement("button");
    remove_button.classList.add("remove_button");
    remove_button.title = "Remove from favourites";
    remove_button.textContent = "Remove";
    info_and_button.appendChild(remove_button);

    // remove button event listener and handler
    remove_button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        // update favourite meals list in loclstorage
        deleteFromFavourites(meal_details.idMeal);
        // remove meal card
        container.remove();
    });

    return container;
}


document.addEventListener("DOMContentLoaded", (event) => {
    const favourite_meal_ids = getFavouriteMeals();
    const meals_container = document.querySelector(".fav_meals_container");
    favourite_meal_ids.forEach(meal_id => {
        // fetch meal from id
        fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
        .then(res => res.json())
        .then(json => {
            if(json?.meals) {
                const meal_card = createMealCard(json.meals[0]);
                meals_container.appendChild(meal_card);
            }
        })
        .catch(error => console.log(`Error while fetching meal for id '${meal_id}' :`, error));
    });
});