var issueContainerEl = document.getElementById("issues-container");
var limitWarningEl = document.getElementById("limit-warning")

var getRepoIssues = function(repo) {
    // Set apiUrl, use passed through value of repo to dynamically alter it repo format === "user/repo"
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // Fetch apiURL, then pass through the reponse (aka Promise), if promise is ".ok" parse the fetched JSON to a js object, else alert user that there was a problem.
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data)
            
            // check if api has paginated issues
            if (response.headers.get("Link")) {
               displayWarning(repo);
            }
            });
        } else {
            alert("There was a problem with your request!")
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "No issues were found within the specified repo"
        return;
    }
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
        issueContainerEl.appendChild(issueEl);
    }
}

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
        linkEl.textContent = "the issues board on GitHub.com"
        linkEl.setAttribute("href","https://github.com/" + repo + "/issues")
        linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
}

getRepoIssues("angular/angular")