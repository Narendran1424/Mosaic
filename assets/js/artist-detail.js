const artistSection=document.querySelector(".artist-section");
const breadCrumbText= artistSection.querySelector(".breadcrumb-item.active");
const userName=artistSection.querySelector(".username");
const city=artistSection.querySelector(".city");
const age=userName.querySelector(".age")
const bioText=artistSection.querySelector(".bio-text"); 
const genreContainer=artistSection.querySelector(".genre-container");
const artistImg=artistSection.querySelector(".artist-img");
const fileInfo=document.querySelector(".resume-wrapper .file-info");
const fileTooltip=fileInfo.querySelector(".tooltip");

const worksContainer=document.querySelector(".works-container");

const contactText=document.querySelector(".contact-text");
const contactImg=document.querySelector(".contact-img")
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
const artistCardContainer=featuredSection.querySelector(".artist-card-container")

const contentWrapper=featuredSection.querySelector(".content-wrapper");

const shareBtn=document.querySelector(".share-btn");

//check, if user logged
const artists=JSON.parse(sessionStorage.getItem("artists"));
let artistId=JSON.parse(sessionStorage.getItem("selectedId"));


function renderArtists() {
  if (!artists) return;
  artistCardContainer.innerHTML="";
  artistCardContainer.innerHTML = artists.map((artist, index) => `
    <div class="artist-card ${index >= 5 ? "hidden" : ""}" 
         data-id="${artist.id}">
         
      <div class="img-wrapper">
        <img 
          src="./assets/images/artist/artistimg${((artist.id - 1) % 20) + 1}.webp" 
          alt="artistimg${((artist.id - 1) % 20) + 1}"
        />
      </div>

      <h3 class="name">${artist.name}</h3>
      <p class="role">${artist.role}</p>

    </div>
  `).join("");
  
}

renderArtists();

const artistCards=artistCardContainer.querySelectorAll(".artist-card");

toggleArtists(artistCards);

//function for see more button
function toggleArtists(artistCards) {
  seeMore.addEventListener("click", (e) => {
    e.preventDefault();
    const expanded = seeMore.classList.toggle("active");

    artistCards.forEach((card, i) => {
      card.classList.toggle("hidden", !expanded && i > 4);
    });
    if(window.innerWidth>1024){
      contentWrapper.classList.toggle("not-active");
    }
    
    seeMore.innerHTML = expanded
      ? `See Less <img src="./assets/images/arrow.webp" alt="arrow">`
      : `See More <img src="./assets/images/arrow.webp" alt="arrow">`;
  }); 
}

artistCards.forEach(card=>{
  card.addEventListener("click",()=>{
    sessionStorage.setItem("selectedId",card.dataset.id)
    window.location.href="./artist-detail.html";
  })
})


function handleLayout() {
  if (seeMore.classList.contains("active") && window.innerWidth > 1024) {
    contentWrapper.classList.add("not-active");
  } else {
    contentWrapper.classList.remove("not-active");
  }
}

window.addEventListener("resize",()=>{
  handleLayout();
  checkEllipsis();
});

handleLayout();

if(artistId){
  const artist=artists.find(artist=>artist.id == artistId)
  displaySelected(artist)
}

function displaySelected(data){
  displayArtistData(data);
  displayWorkStyleData(data);
  displayPortfolioData(data);
  displayPersonality(data);

}


function  displayArtistData(data){

  breadCrumbText.textContent=data.name;
  userName.innerHTML=`${data.name} <span>(Female <span class="age">${data.age}</span>)</span>`;

  artistImg.src=`./assets/images/artist/artistimg${((data.id - 1) % 20) + 1}.webp`;
  artistImg.alt=`artistimg${((data.id - 1) % 20) + 1}`
  city.textContent=data.city;
  
  bioText.textContent=data.description;

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

  
  if(data.resume){
    fileInfo.innerHTML=`<span class="file-name">${data.resume.fileName}</span>(<span class="file-size">${data.resume.fileSize}</span>)<span class="tooltip">${profileData.resume.fileName}</span>`;
  }
  
  const fileName=fileInfo.querySelector(".file-name");
    if (fileName.scrollWidth > fileName.clientWidth) {
      fileTooltip.textContent= fileName.textContent;
      fileInfo.classList.add("active");
    } else {
      fileInfo.classList.remove("active");
    }

}


function checkEllipsis(){
  const fileName=fileInfo.querySelector(".file-name");
  
  if (fileName.scrollWidth > fileName.clientWidth) {
    fileInfo.classList.add("active")  
  } else {
    fileInfo.classList.remove("active");  
  } 
}


//display workstyle data
function displayWorkStyleData(data){
  console.log(data.contact)
  if(data.time=="night"){
    console.log("true")
    timeImg.src=`./assets/images/${data.time}.png`;
    timeImg.alt=`${data.time}`;
  }

  else{
    timeImg.src="./assets/images/day.png";
    timeImg.alt=`day`;
  }
  if(data.contact=="phone"){
    contactImg.classList.add("call-img");
  }
  else{
    contactImg.classList.remove("call-img");
  }
  contactImg.src=`./assets/images/${data.contact=="mail"?"more":data.contact}.png`
  contactImg.alt=`data.contact`;
  contactText.textContent=data.contact;
  timeText.textContent=data.time;
  goalText.textContent=data.goal.join(', ');
  placeText.textContent=data.work;

}

function displayPortfolioData(data){
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const titles=["New York Concert", "LA Event", "London Vibes","Music on the Go", "Album 404","New Year Event"]
  const year=Number(new Date().getFullYear());

  const length=data.videoCount;

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
  const rangeValues=data.pickOut;
  
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







if(navigator.share){
  shareBtn.addEventListener('click',async()=>{
    try{
      await navigator.share({
        title:'Mosaic',
        text:breadCrumbText.textContent,
        url:window.location.href,

      })
    }
    catch(err){
      console.log(err);
    }
  })

}

