const artistSection=document.querySelector(".artist-section");
const breadCrumbText= artistSection.querySelector(".breadcrumb-item.active");
const userName=artistSection.querySelector(".username");
const city=artistSection.querySelector(".city");
const age=userName.querySelector(".age")
const bioText=artistSection.querySelector(".bio-text"); 
const genreContainer=artistSection.querySelector(".genre-container");
const fileInfo=document.querySelector(".resume-wrapper .file-info");

const worksContainer=document.querySelector(".works-container");

const contactText=document.querySelector(".contact-text");
const timeImg=document.querySelector(".time-img");
const timeText=document.querySelector(".time-text");
const goalText=document.querySelector(".goal-text");
const placeText=document.querySelector(".place-text");

const videoCount=document.querySelector(".portfolio-section .video-count");
const videoContainer=document.querySelector(".portfolio-section .video-container");

const perSonalitySection=document.querySelector(".personality-section");

const leftWrapper=perSonalitySection.querySelector(".left-wrapper");
const rangeInputs=perSonalitySection.querySelectorAll("input[type='range']");

const featuredSection=document.querySelector(".featured-section");
const seeMore=featuredSection.querySelector(".see-more-link");
const artistCards=featuredSection.querySelectorAll(".artist-card-container .artist-card");
const contentWrapper=featuredSection.querySelector(".content-wrapper");

//check, if user logged
const loggeduser=JSON.parse(sessionStorage.getItem("loggedUser"));

if(loggeduser){
  const loggedMail=loggeduser.email;
  const users=JSON.parse(sessionStorage.getItem("registeredUsers"));
  const user=users.find(user=>user.email == loggedMail)
  displayLoggedData(user)
}

function displayLoggedData(data){
  displayArtistData(data);
  displayWorkStyleData(data);
  displayPortfolioData(data);
  displayPersonality(data);
  console.log(data)
}

function padZero(num){
  if(num > 9){
    return num;
  }
  else{
    return "0"+num;
  }
}


function  displayArtistData(data){
  const userDetail=data.personalDetails;
  const profileData=data.profile;

  breadCrumbText.textContent=userDetail.username;
  city.textContent=userDetail.place;

  const birthDate=userDetail["birth-date"];
  const userAge=padZero(Number(new Date().getFullYear())-birthDate.split("-")[0]);
  age.textContent=userAge;

  userName.innerHTML=`${userDetail.username} <span>(Female <span class="age">${userAge}</span>)</span>`;
  bioText.textContent=profileData.description;

  const counts=artistSection.querySelectorAll(".user-stat .count");
  counts.forEach(count=>{
    const random = Math.floor(Math.random() * 491) + 10;
    if(count.classList.contains("connection"))
      count.textContent=random+"+"
    else
      count.textContent=random;
  })

  const genres=data.genres;
  genreContainer.innerHTML="";

  genres.forEach(genre=>{
    genreContainer.innerHTML+=`<div class="genre text-capitalize">${genre}</div>`;
  })

  fileInfo.innerHTML=`<span class="file-name">${profileData.resume.fileName}</span>(<span class="file-size">${profileData.resume.fileSize}</span>)`
  const fileName=fileInfo.querySelector(".file-name");
  requestAnimationFrame(() => {
    if (fileName.scrollWidth > fileName.clientWidth) {
      fileName.title = fileName.textContent;
    } else {
      fileName.removeAttribute("title");
    }
  });
}


function checkEllipsis(){
  const fileName=document.querySelector(".file-name");
    if (fileName.scrollWidth > fileName.clientWidth) {
      fileName.title = fileName.textContent;   
    } else {
      fileName.removeAttribute("title");  
    } 
}

window.addEventListener("resize", checkEllipsis);


//display workstyle data
function displayWorkStyleData(data){
  const workStyle=data.workstyle;

  if(workStyle.time=="night"){
    timeImg.src=`./assets/images/${workStyle.time}.png`;
    timeImg.alt=`${workStyle.time}`;
  }
  else{
    timeImg.src="./assets/images/day.png";
    timeImg.alt=`day`;
  }

  contactText.textContent=workStyle.contact;
  timeText.textContent=workStyle.time;
  goalText.textContent=workStyle.goal.join(', ');
  placeText.textContent=workStyle.place;

}

function displayPortfolioData(data){
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const titles=["New York Concert", "LA Event", "London Vibes","Music on the Go", "Album 404","New Year Event"]
  const year=Number(new Date().getFullYear());

  const length=data.portfolio.videos.length;

  videoCount.textContent=`${length} ${length==1?"Video":"Videos"}`
  
  videoContainer.innerHTML="";

  for(let i=0;i<length;i++){
    
  const month = MONTHS[Math.floor(Math.random() * MONTHS.length)];

  videoContainer.innerHTML+=`<div class="video">
              <div class="video-img-container">
                <img src="./assets/images/artist/artistimg${(i % 20) + 1}.webp" class="artist-img" alt="artistimg${(i % 20) + 1}">
                <img src="./assets/images/play.png" alt="play button" class="play-btn">
              </div>
              <h3 class="video-title">${titles[i % titles.length]}</h3>
              <p class="date">${month} ${year-Math.floor(Math.random()*5)}</p>
            </div>`
  }

}


function displayPersonality(data){
  const personality=data.personality;
  const rangeValues=data.pickout;
  
  leftWrapper.innerHTML="";
  personality.forEach(per=>{
    leftWrapper.innerHTML+=`<div class="content-container">
      <h3>${per.question}</h3>
      <p>${per.answer}</p>
    </div>`
  })

  rangeInputs.forEach((r,i)=>{
    r.value=rangeValues[i];
  })
}

const visibleCount = 4;

seeMore.addEventListener("click", (e) => {
  
  e.preventDefault();

  const expanded = seeMore.classList.toggle("active");

  artistCards.forEach((card, i) => {
    card.classList.toggle("hidden", !expanded && i > visibleCount);
  });
  if(window.innerWidth>1024){
    contentWrapper.classList.toggle("not-active");
  }
  
  seeMore.innerHTML = expanded
    ? `See Less <img src="./assets/images/arrow.webp" alt="arrow">`
    : `See More <img src="./assets/images/arrow.webp" alt="arrow">`;
});

function handleLayout() {
  if (seeMore.classList.contains("active") && window.innerWidth > 1024) {
    contentWrapper.classList.add("not-active");
  } else {
    contentWrapper.classList.remove("not-active");
  }
}

window.addEventListener("resize", handleLayout);
handleLayout();
window.addEventListener("resize", handleLayout);
handleLayout(); 