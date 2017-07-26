$('document').ready( ()=> {
  $('#theForm').on('submit', getRepositories )
})

function getRepositories(event){
  event.preventDefault();
  username = $('#username').val();
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()

}

function handleJSON(){
  let respObj = JSON.parse(this.responseText)
  return respObj
}

function makeRepoHTML(respObj){
  let lies = respObj.map((repo)=>{
    debugger
    // return repo.url
    return '<li>' + repo.full_name + ' - <a href="#" data-repo="' + repo.name + '"data-username="' + repo.full_name.split('/')[0] + '" onclick="getCommits(this)">Get Commits</a></li>'
  }).join(' ')
  let HTML = `/https:\/\/github.com\/octocat\/Hello-World/ <ul> ${lies} </ul>`
  return HTML
  // return lies

}


function displayRepositories(){

  HTML = makeRepoHTML(handleJSON.call(this))
  $('#repositories').empty()
  $('#repositories').append(HTML)
}


function getCommits(repoEl) {
  const repoName = repoEl.dataset.repo
  const userName = repoEl.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${userName}/${repoName}/commits`)
  req.send()
}

function makeCommitHTML(respObj){
  let lies = respObj.map((commit) => {
    return `<li><strong> ${commit.commit.author.name} </strong> - ${commit.commit.message} </li>`
  }).join('')
  let HTML = `<ul> ${lies} </ul>`
  return HTML
}


function displayCommits(){
  HTML = makeCommitHTML(handleJSON.call(this))
  $('#details').empty()
  $('#details').append(HTML)
}
