const skills = ["Singer","Composer","Songwriter","DJ","Rapper","Vocalist",
  "Instrumentalist","Producer","Audio Engineer","Studio Musician","Musician",
  "Choreographer","Dancer","Instructor","Freestyle","Classical",
  "Hip Hop","Contemporary","Ballet","Crew Member","Director",
  "Actor","Actress","Assistant Director","Editor",
  "Script Writer","Dialogue Writer","Executive Producer","Art Director",
  "Costume Designer","Makeup Artist","VFX Artist"
];

const cities = [
  "New York","London","Paris","Tokyo","Sydney","Dubai","Singapore",
  "Toronto","Berlin","Rome","Madrid","Mumbai","Chennai","Bengaluru",
  "Hyderabad","Bangkok","Kuala Lumpur","Istanbul","Los Angeles","Cape Town"
];

const menuItems = filterDropdown.querySelectorAll(".menu-item");
const filterBtn = document.querySelector(".filter-btn");
const filterDropdown = document.querySelector(".filter-dropdown");
const cityMenu=filterDropdown.querySelector(".city-menu");
const skillMenu=filterDropdown.querySelector(".skill-menu");

const sortBtn = document.querySelector(".sort-btn-wrapper");
const sortDropdown = document.querySelector(".sort-dropdown");

const projectsContainer=document.querySelector(".projects-card-container");
const showText=document.querySelector(".show-text");

let projects=JSON.parse(sessionStorage.getItem("projects"));


let filteredProjects=projects;


//Render projects dynamically

function renderProjects(){

    projectsContainer.innerHTML="";
    if(filteredProjects.length>0){
        showText.textContent=`Showing ${ filteredProjects.length} Projects...`
        filteredProjects.forEach((project,i)=>{
    
            const date=project.date.toString().split("/")
            projectsContainer.innerHTML+=`<div class="project-card">
                        <div class="card-header ${(i % 4 === 1 || i % 4 === 2) ? "h-sm" : ""}">
                        <img src="./assets/images/projects/projectsimg${project.img}.webp" alt="projectsimg${project.img}">
                        </div>
                        <h3 class="card-title">${project.title}</h3>
                        <p class="card-text">${project.summary}</p>
                        <div class="card-footer">
                            <p class="date-time"><img src="./assets/images/date.webp" class="date" alt="date">${date[0]}/${date[1]}</p>
                            <p class="location"><img src="./assets/images/location.webp" class="location" alt="location">${project.city}</p>
                        </div>
            </div>`   
        })
    }
    else{
        showText.textContent=`No Projects...`
        projectsContainer.innerHTML="<p class='not-found'>Projects Not Found</p>"
    }
    setCardHeight();
    updateSmallCard();

}

renderProjects()

function setCardHeight(){
  const cards = document.querySelectorAll(".project-card");
     cards.forEach(card => {
        card.style.height = "auto";
    });

    if (window.innerWidth <= 1024)return;
     
    for (let i = 0; i < cards.length - 1; i++) {

        const current = cards[i];
        const next = cards[i + 1];

        const currentHeader = current.querySelector(".card-header");
        const nextHeader = next.querySelector(".card-header");

        if (
            currentHeader?.classList.contains("h-sm") &&
            nextHeader?.classList.contains("h-sm")
        ) {
            current.style.height = "auto";
            next.style.height = "auto";

            const maxHeight = Math.max(
                current.offsetHeight,
                next.offsetHeight
            );

            current.style.height = maxHeight + "px";
            next.style.height = maxHeight + "px";

            i++; 
        }
    }
}

function updateSmallCard(){
       const cards = document.querySelectorAll(".project-card");

    cards.forEach((card, i) => {

        const header = card.querySelector(".card-header");

        header.classList.remove("h-sm");

        if (window.innerWidth > 1024) {

            if (i % 4 === 1 || i % 4 === 2) {
                header.classList.add("h-sm");
            }
        } else if ((window.innerWidth < 1024 & window.innerWidth>768)){
        
            if (i % 3 === 1) {
                header.classList.add("h-sm");
            }
        }else if ((window.innerWidth < 769 & window.innerWidth>480)){
        
            if (i % 2 === 1) {
                header.classList.add("h-sm");
            }
        }else{
            header.classList.remove("h-sm");
        }
    });
}

window.addEventListener('resize', setCardHeight);
window.addEventListener('resize', updateSmallCard);

filtered = filteredProjects.map(project => ({...project}));



let activeSkills = [];
let activeCities = [];
let activeSort = "default";
let searchTerm = "";




//Search function
searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    applyFilters();
});



//Filter function
filterBtn.addEventListener("click", () => {
    filterDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!filterDropdown.contains(e.target) && !filterBtn.contains(e.target)) {
        filterDropdown.classList.remove("active");
    }
});

cityMenu.innerHTML = "";
cities.forEach(city => {
    cityMenu.innerHTML += `
        <div class="checkbox-wrapper">
            <input type="checkbox" name="${city}" id="${city}">
            <label for="${city}">${city}</label>
        </div>`;
});

skillMenu.innerHTML = "";
skills.forEach(skill => {
    skillMenu.innerHTML += `<li class="skill">${skill}</li>`;
});

const checkBoxes = cityMenu.querySelectorAll("input[type='checkbox']");
checkBoxes.forEach(checkBox => {
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            activeCities.push(checkBox.name);
        } else {
            activeCities = activeCities.filter(c => c !== checkBox.name);
        }
        applyFilters();
    });
});

const skillItems = skillMenu.querySelectorAll(".skill");
skillItems.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
        if (item.classList.contains("active")) {
            activeSkills.push(item.textContent);
        } else {
            activeSkills = activeSkills.filter(s => s !== item.textContent);
        }
        applyFilters();
    });
});



menuItems.forEach(item => {
    item.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        menuItems.forEach(menuItem => {
            menuItem.classList.remove("active");
            menuItem.querySelector(".down-arrow").classList.remove("active");
        });
        if (!isActive) {
            item.classList.add("active");
            item.querySelector(".down-arrow").classList.add("active");
        }
    });
});

//Sort functions
sortBtn.addEventListener("click", () => {
    sortDropdown.classList.toggle("active");
});

const sortListItems = sortDropdown.querySelectorAll(".sort-dropdown-list-item");
sortListItems.forEach(item => {
    item.addEventListener("click", () => {
        sortListItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        activeSort = item.dataset.sort; 
        applyFilters();
        sortDropdown.classList.remove("active");
    });
});


document.addEventListener("click", (e) => {
    if (!sortDropdown.contains(e.target) && !sortBtn.contains(e.target)) {
        sortDropdown.classList.remove("active");
    }
});

function applyFilters() {
    let result = [...projects];


    if (searchTerm) {
        result = result.filter(project =>
            project.title.toLowerCase().includes(searchTerm)
        );
    }


    if (activeCities.length > 0) {
        result = result.filter(project =>
            activeCities.includes(project.city)
        );
    }


    if (activeSkills.length > 0) {
        result = result.filter(project =>
            project.skills.some(skill => activeSkills.includes(skill))
        );
    }


    if (activeSort === "ascending") {
        result.sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
    } else if (activeSort === "descending") {
        result.sort((a, b) =>
            b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        );
    }

    filteredProjects = result;
    renderProjects();
}
applyFilters();