const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        resultsList.innerHTML = '<p>Please enter an ingredient.</p>';
        return;
    }

    const appId = 'ad9f6811';
    const appKey = 'bd55f2b017b6d2f393e4fef92b90d558';

    const url = `https://api.edamam.com/search?q=${encodeURIComponent(searchValue)}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error(error);
        resultsList.innerHTML = `<p>Error fetching recipes. Please try again later.</p>`;
    }
}

function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        resultsList.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    let html = '';
    recipes.forEach(item => {
        const recipe = item.recipe;
        html += `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                <img src="${recipe.image}" alt="${recipe.label}" style="width: 200px;">
                <h3>${recipe.label}</h3>
                <ul>
                    ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.url}" target="_blank">View Full Recipe</a>
            </div>
        `;
    });

    resultsList.innerHTML = html;
}
