
const categories=[["Singer","Composer","Songwriter","DJ","Rapper","Vocalist",
  "Instrumentalist","Producer","Audio Engineer","Studio Musician","Musician","Other"],
  [
    "Choreographer","Dancer","Instructor","Freestyle",
    "Classical","Hip Hop","Contemporary","Ballet","Crew Member","Director","Other"
  ],
  ["Actor","Actress","Director","Assistant Director","Editor",
    "Script Writer","Dialogue Writer","Producer","Executive Producer","Art Director",
    "Costume Designer","Makeup Artist","VFX Artist","Other"
  ]
]
const genres=[
  [
    "Pop","Hiphop","EDM","World","Jazz","Folk",
    "R & B","Blues","Country","Audio Engineer","Studio Musician","Musician","Classical","Rock" 
  ],
 [
    "Ballet Dancer","Contemporary","Hip Hop","Kathak",
    "Bharatanatyam","Salsa","Jazz Dance","Folk Dance",
    "Choreographer","Freestyle","Breakdance","Kuchipudi"
  ],
  [
    "Actor","Director","Producer","Cinematographer",
    "Screenwriter","Editor","Playback Singer",
    "Stunt Artist","Art Director","Costume Designer",
    "Film Composer","Assistant Director"
  ]
]

/*Filter Bar */
const filterBtn = document.querySelector(".filter-btn");
const filterDropdown = document.querySelector(".filter-dropdown");
const categoryList=document.querySelectorAll(".category-list");
const genreList=document.querySelectorAll(".genre-list");

categoryList.forEach((list,i)=>{
  const catArr=categories[i];
  list.innerHTML="";
  catArr.forEach(cat=>{
    list.innerHTML+=`<li class="child-menu-item filter-role">${cat}</li>`
  })
})

genreList.forEach((list,i)=>{
  const genreArr=genres[i];
  list.innerHTML="";
  genreArr.forEach(genre=>{
    list.innerHTML+=`<li class="child-menu-item filter-genre">${genre}</li>`
  })
})


filterBtn.addEventListener("click", () => {
  filterDropdown.classList.toggle("active");
});
const filterListItems=filterDropdown.querySelectorAll(".child-menu-item");
filterListItems.forEach(item=>{
   item.addEventListener("click",()=>{
    item.classList.toggle("active");
    applyFilters()
   })
})
/*Sort Btn*/
const sortBtn = document.querySelector(".sort-btn");
const sortDropdown = document.querySelector(".sort-dropdown");
const sortListItems=sortDropdown.querySelectorAll(".sort-dropdown-list-item");

sortBtn.addEventListener("click", () => {
  sortDropdown.classList.toggle("active");
});


sortListItems.forEach(item=>{
  item.addEventListener("click",()=>{
    sortListItems.forEach(item=>item.classList.remove("active"));
    item.classList.add("active");
    applyFilters();
  })
})

/*Render data from json */
const artists=JSON.parse(sessionStorage.getItem("artists"));
let filteredArtists=artists;

const artistCardWrapper=document.querySelector(".artist-card-wrapper")
let artistCardContainer=document.querySelector(".artist-card-container");
let currentPage=1;

const itemsPerPage=9;

function renderPagination() {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = 1;
  }

  if (totalPages <= 1) return;

  if (currentPage > 1) {
    paginationContainer.innerHTML += `<button class="prev">Prev</button>`;
  }

  let pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
  }

  pages.forEach(p => {
    if (p === "...") {
      paginationContainer.innerHTML += `<span class="dots">...</span>`;
    } else {
      paginationContainer.innerHTML += `<button class="page ${p === currentPage ? "active" : ""}">${p}</button>`;
    }
  });

  if (currentPage < totalPages) {
    paginationContainer.innerHTML += `<button class="next">Next</button>`;
  }

  paginationContainer.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("prev")) currentPage--;
      else if (btn.classList.contains("next")) currentPage++;
      else currentPage = Number(btn.textContent);
      renderArtists();
      renderPagination();
    });
  });
}

function renderArtists(){
  artistCardContainer.innerHTML="";
  if(filteredArtists.length >0){
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  let pageArtists = filteredArtists.slice(start, end);
      
      pageArtists.forEach(artist=>{
        artistCardContainer.innerHTML+=`<a href="./artist-detail.html" class="artist-card"  data-id="${artist.id}">
                  <div class="img-wrapper">
                    <img src="./assets/images/artist/artistimg${((artist.id - 1) % 20) + 1}.webp" alt="artistimg${((artist.id - 1) % 20) + 1}"/>
                  </div>
                  <h3 class="name">${artist.name}</h3>
                  <p class="role">${artist.role}</p>
                </a>`
      })
  }
  else{
    artistCardContainer.innerHTML=`<p class="not-found">Artist Not Found</p>`
  }
  const artistCards=document.querySelectorAll(".artist-card");
  if(artistCards){
    hoverCards();
    selectCards();
  }
    

}

renderPagination();
renderArtists();

/*Filter functions */
let filtered=filteredArtists;
let selectedFilters=[]
function applyFilters() {
  selectedFilters = []; 
  const searchInput = document.querySelector(".search-input");

  searchInput.addEventListener("input", (e) => {
    let searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm) {

      filteredArtists = artists.filter(artist => {

        const genres = artist.genres || [];

        return (
          artist.name.toLowerCase().includes(searchTerm) ||
          artist.role.toLowerCase().includes(searchTerm) ||
          artist.city.toLowerCase().includes(searchTerm) ||
          genres.some(genre =>
            genre.toLowerCase().includes(searchTerm)
          )
        );

      });

    } else {
      filteredArtists = [...artists]; 
    }

    currentPage = 1;
    renderPagination();
    renderArtists();
  });
  const listItems=filterDropdown.querySelectorAll(".child-menu-item");
  let activeItems=[...listItems].filter(item=>item.classList.contains("active"))

  activeItems.forEach(item => {

  const value = item.textContent.trim();

  const type = item.classList.contains("filter-role")? "role": "genre";

  const mainType = item
  .closest(".menu-item")
  .querySelector(".filter-toggle")
  .childNodes[2]  
  .textContent
  .trim();


  const subCat=type=="role"?"role":"genres"
  
  
  let obj={
    "category":mainType,
    "subcategory":subCat,
    "value":value
  }
  
  selectedFilters.push(obj);
  console.log(selectedFilters)

});

console.log(document.querySelector(".filter-toggle").childNodes[2].textContent)
filterArtists()
}


function filterArtists() {

  filteredArtists = artists.filter(artist => {

    const categoryFilters = selectedFilters.filter(f => f.category).map(f => f.category);

    if (categoryFilters.length &&
      !categoryFilters.includes(artist.category)) {
      return false;
    }

    const roleFilters = selectedFilters
      .filter(f => f.subcategory === "role")
      .map(f => f.value);

    if (roleFilters.length &&
        !roleFilters.includes(artist.role)) {
      return false;
    }

    const genreFilters = selectedFilters
      .filter(f => f.subcategory === "genres")
      .map(f => f.value);

    if (genreFilters.length &&
        !artist.genres.some(g => genreFilters.includes(g))) {
      return false;
    }

    return true;
  });

  renderArtists();
  renderPagination();
}

applyFilters()

/*click event for cards */
function selectCards(){
  const artistCards=document.querySelectorAll(".artist-card");
  artistCards.forEach(card=>{
    card.addEventListener("click",(e)=>{
      e.preventDefault();
      sessionStorage.setItem("selectedId",card.dataset.id)
      window.location.href="./artist-detail.html";
    })
  })

}

/*Hover effect for cards*/
const artistSection=document.querySelector(".artist-section");
const contentContainer=artistSection.querySelector(".content-container");
const hoverWrapper=artistSection.querySelector(".hover-wrapper");

function hoverCards(){
  const artistCardContainer=document.querySelector(".artist-card-container");
  const previewImg = document.querySelector(".hover-wrapper .artist-media img");
  const artistTags=document.querySelector(".hover-wrapper .artist-tags");
  const mutualCount=document.querySelector(".mutual-wrapper .count");
  const detailCounts=document.querySelectorAll(".detail-item .count")
  artistCardContainer.addEventListener("mouseover", (e) => {
  const card = e.target.closest(".artist-card");
 
  if (!card) return;

  const id=card.dataset.id;
  const hoverArtist=filteredArtists.find(artist=>artist.id==id);
  const genres=hoverArtist.genres;

  const cardImg = card.querySelector("img");
  previewImg.src = cardImg.src;
  mutualCount.textContent=`${Math.floor(Math.random()*81)+10} Mutuals`;
  artistTags.innerHTML="";
  genres.forEach(genre=>{
    artistTags.innerHTML+=`<span class="tag">${genre}</span>`
  })
  detailCounts.forEach(count=>{
    if(count.classList.contains("connection")){
      count.textContent=Math.floor(Math.random()*950)+50 +"+";
    }
    const rand=Math.floor(Math.random()*100)+1 
    count.textContent=rand.toString().padStart(2,"0");
  })
  contentContainer.classList.add("not-active");
  hoverWrapper.classList.add("active");
});

artistCardContainer.addEventListener("mouseout", (e) => {
  if (artistCardContainer.contains(e.relatedTarget)) return;

  contentContainer.classList.remove("not-active");
  hoverWrapper.classList.remove("active");
});

}



