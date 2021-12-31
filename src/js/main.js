import '../styles/global/tailwind.css';
import '../styles/global/main.scss';

const searchResultDiv = document.querySelector('.search-result');

async function fetchAPI() {
    const baseURL = `https://book-set-task.herokuapp.com/api/list_books`;
    const response = await fetch(baseURL);
    const books = await response.json();
    let genreInput = document.getElementById('framework').value;
    selectGrid(books, genreInput);
}
fetchAPI();

// Data to display
function selectGrid(results, genreInput) {
    let gHTML = '';

    results.map((result, key) => {
        let dramaCat = results[key].genre;
        let state = dramaCat.includes(genreInput, 0);

        if (state) {
            gHTML += `
                <div>
                ${results[key].id} ${results[key].genre}
                </div>
                <br />
                `;
        }
    });
    searchResultDiv.innerHTML = gHTML;
}

// Calling data on change
const genre = document.getElementById('framework');
genre.addEventListener('change', () => {
    fetchAPI();
});
