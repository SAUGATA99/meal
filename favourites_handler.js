const addToFavourites = (meal_id) => {
    const favourites = localStorage.getItem("favourites") ? localStorage.getItem("favourites").split(",") : [];
    if(!favourites.includes(meal_id)) {
        favourites.push(meal_id);
    }

    localStorage.setItem("favourites", favourites.toString());
};

const deleteFromFavourites = (meal_id) => {
    let favourites = localStorage.getItem("favourites");
    if(!favourites) {
        return;
    }
    favourites = favourites.split(",");
    const index_to_delete = favourites.indexOf(meal_id);
    if(index_to_delete>-1) {
        favourites.splice(index_to_delete, 1);
    }

    localStorage.setItem("favourites", favourites.toString());
}

const mealInFavourites = (meal_id) => {
    let favourites = localStorage.getItem("favourites");
    if(!favourites) {
        return false;
    }    
    favourites = favourites.split(",");

    return favourites.includes(meal_id);
}

const getFavouriteMeals = () => {
    if(!localStorage.getItem("favourites")) {
        localStorage.setItem("favourites", "");
    }
    return localStorage.getItem("favourites")?.split(",") || [];
}

export {addToFavourites, deleteFromFavourites, mealInFavourites, getFavouriteMeals}