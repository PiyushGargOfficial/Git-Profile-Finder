window.addEventListener('load', init);

const client_id = 'f30ba19e6f8c0a183934';
const client_secret = '523f3ba46d0b44ae3dc48a7d42affee58a02383b';

function init() {
    bindEvents();
}

function bindEvents() {
    document.querySelector("#search").addEventListener('click', fetchUser);
    document.querySelector("#form").addEventListener('submit', submitForm);
}

const fetchUser = async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;

    const call = await fetch(`https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${client_secret}`);
    document.querySelector(".error").style.display = "none";
    document.querySelector("#repos").innerHTML = '';

    const data = await call.json();

    if (data.message !== "Not Found") {
        showProfile(data);
        const callRepos = await fetch(`https://api.github.com/users/${username}/repos?client_id=${client_id}&client_secret=${client_secret}&per_page=100&type=owner`);
        const repoData = await callRepos.json();
        showRepos(repoData);
    } else {
        document.querySelector(".error").style.display = "block"
    }
}

const showProfile = (data) => {
    const profile = document.querySelector("#profile");
    profile.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img src="${data.avatar_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><a href="${data.html_url}"><button type="button" class="btn btn-primary">Github</button></a></li>
    <li class="list-group-item">Followers : ${data.followers}</li>
    <li class="list-group-item">Following : ${data.following}</li>
    <li class="list-group-item">Public Repos : ${data.public_repos}</li>
    <li class="list-group-item">Gists : ${data.public_gists}</li>
    <li class="list-group-item">Location : ${data.location}</li>
  </ul>
</div>
    `
}

const showRepos = data => {
    const repos = document.querySelector("#repos");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand col-6" href="#">${data[i].name}</a>
        <div class="navbar" id="navbarText">
          <ul class="navbar-nav col-6 d-flex flex-column">
            <li class="nav-item col-12">
              <a class="nav-link" href="${data[i].html_url}"><button type="button" class="btn btn-danger">Github</button></a>
            </li>
            <li class="nav-item col-12">
              Watchers : ${data[i].watchers_count}
            </li>
            <li class="nav-item col-12">
            Stars : ${data[i].stargazers_count}
            </li>
            <li class="nav-item col-12">
            Description : ${data[i].description}
            </li>
          </ul>
        </div>
      </nav>
        `;
        repos.appendChild(div);
    }
}

const submitForm = e => {
    e.preventDefault();
}