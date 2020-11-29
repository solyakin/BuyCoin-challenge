// const github_data = {
//     "token" : "784a3e4de9c746f5169aec3c6f13e9d51c8e2c56",
//     "user": "solyakin"
// }
//use mouseover event listener for jumpto btn

const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".menu_left");
const repositoryList = document.querySelector(".repository_list");
const profile_details = document.querySelector(".profile-name");
const avatar = document.querySelector(".avatar_icon");
const avatarPhoto = document.querySelector(".avatar-photo")
const statusBtn = document.querySelector(".status-btn");
const statusText = document.querySelector(".status-text");
const repoLanguageColor = document.querySelector('.repo-language-color');
const repototalCount = document.querySelector('.repototalCount');
const contact = document.querySelector(".contact");
const follower = document.querySelector(".follower");
const followerIcon =document.querySelector(".follower_icon");
const starredIcon = document.querySelector(".starred_icon");
const profileImage = document.querySelector(".profile-image");
const userBio = document.querySelector(".user-bio");
const UserLocation = document.querySelector(".location");
const link = document.querySelector(".link");
const twitter = document.querySelector(".twitter");
const dropDownType = document.querySelector(".drop_down_type");
const dropDownLanguage = document.querySelector(".drop_down_language");
const typeBtn = document.querySelector(".type_button");
const langBtn = document.querySelector(".language_button")
const searchBox = document.querySelector(".search_wrapper"); 
const licensed = document.querySelector('.licensed');
const searchHistory = document.querySelector(".search_history");
const typeMirror = document.querySelector(".type_mirror");
const jumpToBtn = document.querySelector(".jump-to-button");
const star = document.querySelector(".octicon-star");
const justiceScale = document.querySelector('.justice-scale');


hamburger.addEventListener("click", () => {
  hamburgerMenu.style.display === "block" ? hamburgerMenu.style.display = "none" : hamburgerMenu.style.display = "block";
})

function displayBtn(e){
  jumpToBtn.classList.toggle("mystyle");
  // console.log("moused over")
}

statusBtn.addEventListener("mouseover", () => {
  if(statusText.style.display === "none"){
    statusText.style.display ="block";
    statusBtn.classList.add('hover-style');
  }else{
    statusText.style.display = "none";
    statusBtn.classList.remove('hover-style');
  }
});


window.toggleStar = (e) => {
  console.log("clicked")
  star.style.background = "black";
}
typeBtn.addEventListener("click", () => {
  dropDownType.classList.toggle("mystyle");
});
langBtn.addEventListener("click", () =>{
  dropDownLanguage.classList.toggle("mystyle");
});
searchBox.addEventListener("click", () => {
  searchHistory.style.display = "block";
  searchBox.classList.add("another");
});

const baseurl = "https://api.github.com/graphql";

const headers = {
    "content-type" : "application/json",
    Authorization: "bearer 3b5bb79df6b2fb359ab93df10a2cf124c18b37d8"
}

const body = {
  "query": `
          query {
            viewer{
              avatarUrl
              name
              login
              bio
              location
              websiteUrl
              twitterUsername
              followers{
                totalCount
              }
              following{
                totalCount
              }
              starredRepositories{
                totalCount
              }
              repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
                totalCount
                nodes {
                  name
                  url
                  createdAt
                  description
                  updatedAt
                  stargazerCount 
                  forkCount
                  licenseInfo{
                    name
                    featured
                  }
                  primaryLanguage{
                          name
                          color
                  }
                }
              }
            }
        }
        `
}

fetch(baseurl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
    }     
).then(response => response.json())
.then(data => {
  Object.entries(data).map(([key, value]) => {
    
    const profile = value.viewer;
    console.log(profile);

    //Rendering the profile image 
    const markUpPhoto = document.createElement("IMG");
    markUpPhoto.setAttribute('src', profile.avatarUrl);
    markUpPhoto.setAttribute("alt", "The Profile pic");


    let avatarIcon = document.createElement('img');
    avatarIcon.setAttribute('src', profile.avatarUrl)
    avatarIcon.setAttribute('class', 'avatar');

    let smallPhoto = document.createElement('img')
    smallPhoto.setAttribute('src', profile.avatarUrl)
    smallPhoto.setAttribute('class', 'avatar');

    profileImage.appendChild(markUpPhoto);
    avatar.appendChild(avatarIcon);
    avatarPhoto.appendChild(smallPhoto); // for the small photo in hamburger list

    //rendering the repository count
    let repoCount = document.createElement('span');
    repoCount.setAttribute('class', 'count-span');
    repoCount.innerHTML = profile.repositories.totalCount;

    repototalCount.appendChild(repoCount);


    //Rendering  the profile section
    let div = document.createElement("div");
    let profileName = document.createElement("h1");
    profileName.setAttribute('class', 'profile_caption');
    profileName.innerHTML = profile.name;

    //rendering username in the hamburger list
    let avatarSpan = document.createElement("span");
    avatarSpan.innerHTML = profile.name;
    avatarPhoto.appendChild(avatarSpan);
    //end

    let profileLogin = document.createElement("p");
    profileLogin.setAttribute('class', 'profile_login');
    profileLogin.innerHTML= profile.login;

    let title = document.createElement('p');
    title.innerHTML= profile.bio;

    div.appendChild(profileName);
    div.appendChild(profileLogin);
    
    profile_details.appendChild(div);
    userBio.appendChild(title);


    //rendering the follower section
    let container = document.createElement("div");
    container.setAttribute('class', 'following');
    let cover = document.createElement("p");
    cover.setAttribute('class', 'text_grey large_font');
    cover.appendChild(followerIcon);
    let span = document.createElement("span");
    span.innerHTML = profile.followers.totalCount + ' follower';
    cover.appendChild(span);
    container.appendChild(cover);

    let FollowingCover = document.createElement("p");
    FollowingCover.setAttribute('class', 'text_grey large_font');
    FollowingCover.innerHTML = '. ' + profile.following.totalCount + ' following' + ' .';
    container.appendChild(FollowingCover);

    let starredRepo = document.createElement("p");
    starredRepo.setAttribute('class', 'text_grey large_font');
    starredRepo.appendChild(starredIcon);
    let spanTwo = document.createElement("span");
    spanTwo.innerHTML = profile.starredRepositories.totalCount;
    starredRepo.appendChild(spanTwo);
    container.appendChild(starredRepo);

    follower.appendChild(container);

    //end of follower section

    //rendering the contact section
    let markUpContact = document.createElement("div");
    let list = document.createElement('ul');
    list.setAttribute('class', 'style');
    let listLocation = document.createElement('li');
    listLocation.setAttribute('class', 'hide list-item');
    listLocation.appendChild(UserLocation);
    let listWebUrl = document.createElement('li');
    listWebUrl.setAttribute('class', 'link list-item');
    listWebUrl.appendChild(link);
    let listSocialMedia = document.createElement('li');
    listSocialMedia.setAttribute('class', 'hide list-item');
    listSocialMedia.appendChild(twitter);
    // let locationSvg = document.createElement('svg');
    // locationSvg.setAttribute('class', 'fa fa-link');

    let locationSpan = document.createElement('span');
    let webUrlAnchor = document.createElement('a');
    let socialMediaAnchor = document.createElement('a');

    locationSpan.innerHTML = profile.location;
    let webUrlAnchorNode = document.createTextNode(profile.websiteUrl);
    let socialMediaAnchorNode = document.createTextNode(profile.twitterUsername);

    webUrlAnchor.appendChild(webUrlAnchorNode);
    socialMediaAnchor.appendChild(socialMediaAnchorNode);

    listLocation.appendChild(locationSpan);
    listWebUrl.appendChild(webUrlAnchor);
    listSocialMedia.appendChild(socialMediaAnchor);

    list.appendChild(listLocation);
    list.appendChild(listWebUrl);
    list.appendChild(listSocialMedia);
    markUpContact.appendChild(list);
    contact.appendChild(markUpContact);

    // //end of profile info


    //handling the repository lists
    profile.repositories.nodes.map(repo => {
      const repositories = repo;
      console.log(repositories.licenseInfo);
      let repository = document.createElement("div");
      repository.setAttribute('class', '_repository');
      let repositoriesData = document.createElement("div");
      repositoriesData.setAttribute('class', 'repository-detail-section');
      let repo_casing = document.createElement('div');
      let anchor = document.createElement("a");
      let anchorNode = document.createTextNode(repositories.name);
      anchor.setAttribute('href', '#');
      anchor.setAttribute('class', 'project-title')
      anchor.appendChild(anchorNode);

      let description = document.createElement("p");
      description.setAttribute('class', 'repo_description');
      description.innerHTML = repositories.description;

      let repoBottom = document.createElement('div');
      repoBottom.setAttribute('class', 'repo-language-color');

      let languageColor = document.createElement("span");
      languageColor.setAttribute('class', 'text_grey updated-time border')
      repositories.primaryLanguage === null ? languageColor.style.display = 'none' : languageColor.style.background = repositories.primaryLanguage.color;

      let languageName =document.createElement("p");
      languageName.setAttribute('class', 'text_grey updated-time')
      repositories.primaryLanguage === null ? languageName.style.display = 'none' : languageName.innerHTML = repositories.primaryLanguage.name;

      let div = document.createElement('div');
      div.setAttribute('class', 'star-section')
      let starredGazer = document.createElement('a');
      starredGazer.setAttribute('class', 'text_grey updated-time')
      let textNode = document.createTextNode(repositories.stargazerCount);
      starredGazer.appendChild(textNode);
      let images = document.createElement("img");
      images.setAttribute('src', 'star.svg');

      div.appendChild(images);
      div.appendChild(starredGazer);
      
      repositories.stargazerCount === 0 ? starredGazer.style.display = 'none' : starredGazer.innerHTML = repositories.stargazerCount;
      repositories.stargazerCount === 0 ? div.style.display = 'none' : div.classList.add('star-section');

      let licenseContainer = document.createElement('div');
      licenseContainer.setAttribute('class', 'license-section');

      let licenseSpan = document.createElement('span');
      licenseSpan.setAttribute('class', 'text_grey margin');
      let scale = document.createElement('img');
      scale.setAttribute('src', 'justice-scale.svg');
      scale.setAttribute('class', 'justice-scale');

      licenseContainer.appendChild(scale);
      licenseContainer.appendChild(licenseSpan);
  
      repositories.licenseInfo === null ? licenseSpan.style.display = 'none'  : licenseSpan.innerHTML = 'MIT License';
      repositories.licenseInfo === null ? licenseContainer.style.display = 'none' : licenseContainer.classList.add('license-section');
      
      let updated = document.createElement("p");
      updated.setAttribute('class', 'text_grey updated-time margin')
      updated.innerHTML = 'Updated on ' + repositories.updatedAt.slice(0,7);
      console.log(repositories.updatedAt.slice(0,8));

      repoBottom.appendChild(languageColor);
      repoBottom.appendChild(languageName);
      repoBottom.appendChild(div);
      repoBottom.appendChild(licenseContainer);
      repoBottom.appendChild(updated);

      //star botton section
      let repoStarContainer = document.createElement('div');
      repoStarContainer.setAttribute("class", "repository-star");

      let repoStarBtn = document.createElement('button');
      let btnSpan = document.createElement('img');
      btnSpan.setAttribute('src', 'star.svg');
      btnSpan.setAttribute('class', 'star-icon');
      repoStarBtn.appendChild(btnSpan);
      let btnText = document.createElement("span");
      btnText.innerHTML = 'star';
      repoStarBtn.appendChild(btnText)
      repoStarBtn.addEventListener('click', () =>{
        btnText.innerHTML === 'star' ? btnText.innerHTML = 'unstar' : btnText.innerHTML = 'star';
        // btnSpan.style.backgroundColor = "black";
      })
      repoStarContainer.appendChild(repoStarBtn);
      // repoStarContainer.appendChild(starred);

      let line = document.createElement('hr');
      line.setAttribute('class', 'repo-line')

      repositoriesData.appendChild(anchor);
      repositoriesData.appendChild(description);
      repositoriesData.appendChild(repoBottom);
      // repositoriesData.appendChild(line);

      repository.appendChild(repositoriesData);
      repository.appendChild(repoStarContainer);
      
      repo_casing.appendChild(repository);
      repo_casing.appendChild(line);
      repositoryList.appendChild(repo_casing);

    //   const markup_two = `

    //   <div class="_repository">
    //     <div class="repository-detail-section">
    //       <a href="#"><span>${repositories.name}</span></a>
    //       <p style = "display : ${repositories.description} ? block : none" class="repo_description">${repositories.description}</p>
    //       <p>${repositories.primaryLanguage.name}</P>
    //       <p class="text_grey updated-time">Updated on ${repositories.updatedAt.toLocaleString()}</p>
    //     </div>

    //     <div class = "repository-star">
    //       <button>

    //         <svg class="octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
    //         <span>
    //           star
    //         </span>
    //       </button>
    //     </div>
    //   </div>
    //   <hr/>
    // `
    // repositoryList.insertAdjacentHTML("beforeend", markup_two)


      })
  })

})
.catch(error => console.log(JSON.stringify(error)))

