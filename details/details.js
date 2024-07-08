document.addEventListener("DOMContentLoaded", (event) => {
    // extract meal_id from url
    const urlParams = new URLSearchParams(window.location.search);
    const meal_id = urlParams.get('id');

    if(!meal_id) {
        console.log("Meal id missing.");
        return;
    }

    // fetch meal using meal_id
    fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
    .then(res => res.json())
    .then(json => {
        if(!json?.meals) {
            console.log(`Meal not found for id: ${meal_id}`);
            return;
        }

        const meal_details = json.meals[0];
        
        // inject values
        document.title = meal_details.strMeal;
        document.getElementById("meal_name").textContent = meal_details.strMeal;
        document.getElementById("meal_image").src = meal_details.strMealThumb;
        document.getElementById("meal_image").alt = meal_details.strMeal;
        document.getElementById("cuisine").textContent = meal_details.strArea;
        document.getElementById("category").textContent = meal_details.strCategory;

        const ingredient = document.getElementById("ingredients");
        Object.keys(meal_details).forEach(key => {
            if(key.includes("strIngredient") && meal_details[key].length){
                const ingredient_li = document.createElement("li");
                ingredient_li.textContent = meal_details[key];
    
                ingredient.appendChild(ingredient_li);
            }
        });

        const instruction = document.getElementById("instruction");
        meal_details.strInstructions.split("\r\n").forEach(step => {
            if(step.length) {
                const step_li = document.createElement("li");
                step_li.textContent = step;
    
                instruction.appendChild(step_li);
            }
        });
    })
    .catch(error => console.log("Error while fetching meal: ", error));
});