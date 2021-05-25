var issueContainerEl = document.getElementById("issues-container");

var getRepoIssues = function(repo) {
    // Set apiUrl, use passed through value of repo to dynamically alter it repo format === "user/repo"
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // Fetch apiURL, then pass through the reponse (aka Promise), if promise is ".ok" parse the fetched JSON to a js object, else alert user that there was a problem.
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data)
            });
        } else {
            alert("There was a problem with your request!")
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "No issues were found within the specified repo"
    } else {
        for (var i = 0; i < issues.length; i++) {
            var issueEl = document.createElement ("a");
                issueEl.classList = "list-item flex-row justify-space-between align-center";
                issueEl.setAttribute("href", issues[i].html_url);
                issueEl.setAttribute("target", "_blank");
            
            // Create span to hold info
            var titleEl = document.createElement("span")
                titleEl.textContent = issues[i].title;
    
            // Append to parent
            issueEl.appendChild(titleEl);
    
            // create a type element
            var typeEl = document.createElement("span");
    
            // verify that issue is an issue and not a pull request
            if (issues[i].pull_request) {
                typeEl.textContent = "(Pull Request)"
            }  else {
                typeEl.textContent = "(Issue)"
            };
    
            issueEl.appendChild(typeEl);
        }
        issueContainerEl.appendChild(issueEl);
    }

}

getRepoIssues("jbped/brain-picker")