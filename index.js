import { addToFavourites, deleteFromFavourites, mealInFavourites } from "./favourites_handler.js";

const fetchMealsByName = (partial_meal_name) => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${partial_meal_name}`);
}

const createMealResultItem = (meal_details) => {
    if(!meal_details) {
        console.log("Meal details missing : ", meal_details);
        return;
    }

    const meal_item_container = document.createElement("a");
    meal_item_container.setAttribute("meal_id", meal_details?.idMeal || null);
    meal_item_container.href = `details/details.html?id=${meal_details?.idMeal}`;
    meal_item_container.target = "blank";
    meal_item_container.title = "Click to see details";
    meal_item_container.classList.add("meal_item");

    const meal_name = document.createElement("span");
    meal_name.classList.add("meal_name");
    meal_name.textContent = meal_details?.strMeal || "Meal name missing";
    meal_item_container.appendChild(meal_name);

    const fav_icon = document.createElement("span");
    fav_icon.classList.add("material-symbols-outlined", "favourite_icon");
    // show meal as favourite if id is in favourites
    if(mealInFavourites(meal_details?.idMeal)) {
        fav_icon.classList.add("favourite_meal");
    }
    fav_icon.title = "Set as favourite";
    fav_icon.textContent = "favorite";
    meal_item_container.appendChild(fav_icon);


    // fav icons event listener
    // click favourite_icon will set the meal as favourite
    fav_icon.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.toggle("favourite_meal");
        // adding or removing meal from favourite meals list depends if 'favourite_meal' class is present
        if(event.target.classList.contains("favourite_meal")) {
            addToFavourites(meal_details?.idMeal)
        }else {
            deleteFromFavourites(meal_details?.idMeal);
        }
    });

    return meal_item_container;
}

const searchResultHandler = (event) => {
    const meals_search_res_container = document.getElementById("search_results_container");
    meals_search_res_container.textContent = "";
    
    if(!event.target.value || !event.target.value.trim()) {
        // hide search results container
        // restore default ui for input box
        event.target.parentElement.classList.remove("show_results");
        return;
    }

    // show search results container
    // change ui of input box to show results
    event.target.parentElement.classList.add("show_results");
    
    fetchMealsByName(event.target.value)
    .then(res => res.json())
    .then(json_res => {
        // render meal search responses
        json_res?.meals?.forEach(meal => {
            const meal_container = createMealResultItem(meal);
            meals_search_res_container.appendChild(meal_container);
        });
    })
    .catch(error => {
        console.log("Error while fetching meals: ", error);
    });
}

document.getElementById("meal_search_input").addEventListener("input", searchResultHandler);
// document.getElementById("meal_search_input").addEventListener("change", searchResultHandler);