document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const resultsDiv = document.getElementById("results");
    const errorMessage = document.getElementById("errorMessage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentPage = 1;
    let currentQuery = "";

    searchBtn.addEventListener("click", () => {
        currentQuery = searchInput.value.trim();
        if (currentQuery) {
            currentPage = 1;
            fetchRepos();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchRepos();
        }
    });

    nextBtn.addEventListener("click", () => {
        currentPage++;
        fetchRepos();
    });

    function fetchRepos() {
        resultsDiv.innerHTML = "";
        errorMessage.textContent = "";

        const url = `https://api.github.com/search/repositories?q=${currentQuery}&per_page=3&page=${currentPage}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items.length === 0) {
                    errorMessage.textContent = "No results found.";
                    return;
                }

                data.items.forEach(repo => {
                    const repoCard = document.createElement("div");
                    repoCard.classList.add("repo-card");
                    repoCard.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || "No description available"}</p>
                        <p>⭐ ${repo.stargazers_count} | ${repo.language || "Unknown Language"}</p>
                    `;
                    resultsDiv.appendChild(repoCard);
                });

                prevBtn.disabled = currentPage === 1;
                nextBtn.disabled = data.items.length < 3;
            })
            .catch(() => {
                errorMessage.textContent = "An error occurred. Please try again.";
            });
    }
});
