const root = document.documentElement.style;
const searchbar = document.querySelector(".searchbar-container")
const profilecontainer = document.querySelector(".profile-container")
const noresults = document.getElementById("no-results");
const btnmode = document.getElementById("btn-mode")
let modetext = document.getElementById("mode-text")
const btnsubmit = document.getElementById("submit")
const input = document.getElementById("input")
const avatar = document.getElementById("avatar")
const userName = document.getElementById("name")
const user = document.getElementById("user")
const  date = document.getElementById("date")
const bio = document.getElementById("bio")
const repos = document.getElementById("repos")
const followers = document.getElementById("followers")
const following = document.getElementById("following")
const user_location = document.getElementById("location")
const page = document.getElementById("page")
const twitter = document.getElementById("twitter")
const company = document.getElementById("company")
let modeicon = document.getElementById("mode-icon")

let url = "https://api.github.com/users/"

 let darkMode = false;
// event listener
 btnsubmit.addEventListener("click",function(){
    if(input.value !="")
    {
        getUserData(url + input.value)
    }
 })
 btnmode.addEventListener("click",function(){
    if(darkMode== false){
        darkModeproperties();
    }
    else lightModeproperties();
 })
//  api call
var data;
 async function getUserData(giturl)
{
     let response =  await fetch(giturl);
     data =  await response.json();
     console.log(data);
    // fetch(giturl).then((response)=> response.json()).then((data)=>console.log(data))

    updateprofile(data);
}
// render
const months =["jan","feb", "mar","apr","may","june","july","aug","sept","oct","nov","dec"];
function updateprofile(data)
{
    if(data.message != "Not found")
    {
        noresults.style.display = "none";
        avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `${data.login}`
    user.href =`${data.html_url}`
      let datesegments = data.created_at.split("T").shift().split("-");
    console.log(datesegments)
     date.innerText = `joined ${datesegments[2]} ${months[datesegments[1]-1]} ${datesegments[0]}`
     bio.innerText = data.bio === null ? "This profile has no bio" : `${data.bio}`;
     repos.innerText = `${data.public_repos}`;
     followers.innerText = `${data.followers}`;
     following.innerText =`${data.following}`;

     user_location.innerText = data.location == null ? "Not avaliable" : `${data.location}`;
     page.innerText = data.blog == null ? "Not avaliable" : `${data.blog}`;
     page.href = data.blog == null ? "a" : data.blog;
     twitter.innerText = data.twitter == null ? "Not avaliable" : `${data.twitter_username}`;
     twitter.href = data.page.href = data.blog == null ? "#" : `https://twitter.com/${data.twitter_username}`;
     company.innerText = data.company == null ? "Not avaliable" : `${data.company}`;
    }
    else{
        noresults.style.display = "block"
    }
}
// light mode
function lightModeproperties()
{
    root.setProperty("--lm-bg","#f6f8ff");
    root.setProperty("--lm-bg-content","#fefefe");
    root.setProperty("--lm-bg-text","4b6a9b");
    root.setProperty("--lm-bg-alt","#2b3442");
    root.setProperty("--lm-shadow-xl","rgba(70,96,187,0.2)");
    root.setProperty("--lm-icon-bg","brightness(100%)");
    modetext.innerText="DARK";
    modeicon.src ="./assets/images/moon-icon.svg"
    

    darkMode = false;
    localStorage.setItem("dark-mode",false)
}
// dark mode
function darkModeproperties(){
    root.setProperty("--lm-bg","#141d2f");
    root.setProperty("--lm-bg-content","#1e2a47");
    root.setProperty("--lm-bg-text","white");
    root.setProperty("--lm-bg-alt","white");
    root.setProperty("--lm-shadow-xl","rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg","brightness(100%)");
    modetext.innerText="LIGHT";
    modeicon.src ="./assets/images/sun-icon.svg"
    
    darkMode = true;
    localStorage.setItem("dark-mode",true)
}
 function init(){
    darkMode = false;
    const value = localStorage.getItem("dark-mode");
    if(value == null){
        localStorage.setItem("darkMode" ,darkMode);
        lightModeproperties();
    } 
    else if(value=="false"){
        lightModeproperties();


    }


    getUserData(url + "dew-coder")
 }
init()
