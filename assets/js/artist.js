
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

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((menuItem, index) => {
  const categoryList = menuItem.querySelector(".category-list");
  const genreList    = menuItem.querySelector(".genre-list");

  categoryList.innerHTML = "";
  categories[index].forEach(cat => {
    const li = document.createElement("li");
    li.classList.add("child-menu-item");
    li.textContent = cat;
    categoryList.appendChild(li);
  });

  genreList.innerHTML = "";
  genres[index].forEach(genre => {
    const li = document.createElement("li");
    li.classList.add("child-menu-item");
    li.textContent = genre;
    genreList.appendChild(li);
  });
});


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


let originalArtists = [...artists];
let currentSort = "default";
const filterBtn=document.querySelector(".filter-btn")
const filterDropdown = document.querySelector(".filter-dropdown");
const searchInput = document.querySelector(".search-input");
const sortItems = document.querySelectorAll(".sort-dropdown-list-item");

filterBtn.addEventListener("click",()=>{
  filterDropdown.classList.toggle("active")
})

//menu click

document.querySelectorAll(".menu-item").forEach(menu => {

  const header = menu.querySelector(":scope > .filter-toggle");

  header.addEventListener("click", () => {

    document.querySelectorAll(".menu-item").forEach(m=>{
      if(m!==menu){
        m.classList.remove("active");

        m.querySelectorAll(".child-menu-item")
          .forEach(li=>li.classList.remove("active"));
      }
    });

    menu.classList.toggle("active");
    applyFilters();
  });

  // open sub section
  menu.querySelectorAll(".submenu-item").forEach(sub=>{
    const subHead = sub.querySelector(".filter-label");

    subHead.addEventListener("click", e=>{
      e.stopPropagation();

      sub.parentElement.querySelectorAll(".submenu-item")
        .forEach(s=>{
          if(s!==sub) s.classList.remove("active");
        });

      sub.classList.toggle("active");
    });
  });

});

//filter
filterDropdown.addEventListener("click", e=>{

  if(!e.target.classList.contains("child-menu-item")) return;

  e.target.classList.toggle("active");
  applyFilters();
});

//search
searchInput.addEventListener("input", applyFilters);

//sort
sortBtn.addEventListener("click",()=>{
  sortDropdown.classList.toggle('active');
})

sortItems.forEach(item=>{
  item.addEventListener("click", ()=>{
    sortItems.forEach(i=>i.classList.remove("active"));
    item.classList.add("active");

    currentSort = item.dataset.sort;
    applySort();
    renderArtists();
  });
});


//filter
function applyFilters(){

  const activeMenu = document.querySelector(".menu-item.active");

  if(!activeMenu){
    filteredArtists = [...originalArtists];
    applySearch();
    applySort();
    renderArtists();
    renderPagination();
    return;
  }

  const mainCategory = activeMenu
    .querySelector(".filter-toggle")
    .childNodes[2].nodeValue.trim();

  const roleFilters = [
    ...activeMenu.querySelectorAll(".category-list .child-menu-item.active")
  ].map(li=>li.textContent.trim());


  const genreFilters = [
    ...activeMenu.querySelectorAll(".genre-list .child-menu-item.active")
  ].map(li=>li.textContent.trim());

  filteredArtists = originalArtists.filter(artist=>{

  
    if(artist.category !== mainCategory) return false;


    if(roleFilters.length && !roleFilters.includes(artist.role)){
      return false;
    }

  
    if(genreFilters.length){
      if(!artist.genres) return false;

      const match = artist.genres.some(g =>
        genreFilters.includes(g)
      );

      if(!match) return false;
    }

    return true;
  });

  applySearch();
  applySort();
  renderArtists();
  renderPagination();
}

//search function

function applySearch(){

  const term = searchInput.value.toLowerCase().trim();
  if(!term) return;

  filteredArtists = filteredArtists.filter(a =>
    a.name.toLowerCase().includes(term) ||
    a.role.toLowerCase().includes(term) ||
    a.city.toLowerCase().includes(term) ||
    a.genres?.some(g => g.toLowerCase().includes(term))
  );
}

//apply sort

function applySort(){

  if(currentSort==="ascending"){
    filteredArtists.sort((a,b)=>
      a.name.localeCompare(b.name)
    );
  }

  if(currentSort==="descending"){
    filteredArtists.sort((a,b)=>
      b.name.localeCompare(a.name)
    );
  }
}
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



