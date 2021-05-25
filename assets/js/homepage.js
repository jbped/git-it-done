var userFormEl = document.getElementById("user-form");
var nameInputEl = document.getElementById("username");
var repoContainerEl = document.getElementById("repos-container");
var repoSearchTerm = document.getElementById("repo-search-term");
var languageButtonsEl = document.getElementById("language-buttons");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get event value
    var username = nameInputEl
        .value
        .trim();
    
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please provide a GitHub username");
    }
}

// fetch repos for passed through user 
var getUserRepos = function(user) {
    // var response = 
    var apiUrl = "https://api.github.com/users/" + user + "/repos"
    
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayRepos(data, user);
            }); 
        } else {
            alert("No GitHub users matched the provided username")
        }
    })
    .catch(function(error){
        alert("Unable to connect to GitHub")
    })
};

// filter repos by language type
var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";


    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: GitHub User Not Found")
        }

    });
}

// diplay repos
var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.innerText = "No repos found for specified user";
        return;
    }
    // Clear existing repo data
    repoContainerEl.textContent = "";
    repoSearchTerm.textConten = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("a");
            repoEl.className = "list-item flex-row justify-space-between align-center"
            repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // Add span for repo name to be displayed in
        var titleEl = document.createElement("span")
            titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
    

        // check if current repo has any issues on the issue board
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl)

        // append container to repo container
        repoContainerEl.appendChild(repoEl);
    }
}

var buttonClickHandler = function (event) {
    var language = event.target.getAttribute("data-language");
    if(language) {
        getFeaturedRepos(language);
    }
    repoContainerEl.textContent = ""
}

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click",buttonClickHandler);