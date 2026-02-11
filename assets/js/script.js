
//Typing effect
const typingText = document.querySelector(".typing-text");
const textArray = ["Mosaic", "Dancer", "Artist"];
const typingDelay = 300;
const erasingDelay = 200;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typingText.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
  	setTimeout(erase, newTextDelay);
  }

}

function erase() {
	if (charIndex > 0) {
    typingText.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", () =>{
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});


//Counter effect
const counters = document.querySelectorAll('.count');

function animateCounter(counter, duration = 2000) {
  const target = +counter.dataset.count;
  const steps = 100; 
  const increment = target / steps; 
  const intervalTime = duration / steps; 
  let current = 0;
  let stepCount = 0;

  const timer = setInterval(() => {
    current += increment;
    stepCount++;

    if (stepCount >= steps) {
      counter.textContent = target + (target > 1 ? "+" : "");
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current) + (target > 1 ? "+" : "");
    }
  }, intervalTime);
}


const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, 2000); 
      obs.unobserve(entry.target); 
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

//Slider
const categoryListItems = document.querySelectorAll(".category-list li");
const sliderWrapper = document.querySelector(".slider-wrapper");
const prevBtn = sliderWrapper.querySelector(".prev");
const nextBtn = sliderWrapper.querySelector(".next");
const indicator = sliderWrapper.querySelector(".slider-indicator-container .progress-fill");
const outer = sliderWrapper.querySelector(".slider-indicator-container .progress-bar");
const container = sliderWrapper.querySelector(".slider-container");

let currentIndex = 0;
let isTransitioning = false;
let slideWidth = 0;
let gap = 0;
let originalCount = 0;

function calculateGap() {
  return Math.max(15, window.innerWidth * 0.01304);
}

function moveIndicator(index) {
  if (originalCount <= 1) {
    indicator.style.width = "100%";
    return;
  }

  const realIndex = (index - originalCount + originalCount) % originalCount;
  const barWidth = outer.offsetWidth;
  const step = barWidth / originalCount;

  indicator.style.transition = "width 0.6s ease";
  indicator.style.width = `${(realIndex + 1) * step}px`;
}



function updateSlide(index, animate = true) {
  container.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
  container.style.transform = `translateX(${-index * slideWidth}px)`;
  moveIndicator(index);
}


function goToSlide(next = true) {
  if (isTransitioning) return;

  if (!next && currentIndex === originalCount) {
    currentIndex = container.querySelectorAll(".slider").length - originalCount - 1;
    updateSlide(currentIndex, false);
    return;
  }

  isTransitioning = true;
  currentIndex += next ? 1 : -1;
  updateSlide(currentIndex);
}
function handleTransitionEnd() {
  isTransitioning = false;
  const allSlides = container.querySelectorAll(".slider");

  if (currentIndex >= allSlides.length - originalCount) {
    currentIndex = originalCount;
    updateSlide(currentIndex, false);
  } else if (currentIndex < originalCount) {
    currentIndex = allSlides.length - originalCount - 1;
    updateSlide(currentIndex, false);
  }
}

function renderSlider(item, count) {
  container.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="slider">
        <img src="./assets/images/${item}/${item}img${i}.webp" alt="${item}img${i}">
      </div>`
    );
  }
  initSlider();
}

function initSlider() {
  container.style.transition = "none";
  container.style.transform = "translateX(0)";
  container.querySelectorAll(".slider.clone").forEach(c => c.remove());

  const slides = [...container.querySelectorAll(".slider")];
  if (!slides.length) return;

  originalCount = slides.length;

  slides.forEach(slide => {
    const start = slide.cloneNode(true);
    const end = slide.cloneNode(true);
    start.classList.add("clone");
    end.classList.add("clone");
    container.prepend(start);
    container.append(end);
  });

  gap = calculateGap();
  slideWidth =
    container.querySelector(".slider").getBoundingClientRect().width + gap;

  currentIndex = originalCount;
  isTransitioning = false;

  updateSlide(currentIndex, false);
}

prevBtn.addEventListener("click", () => goToSlide(false));
nextBtn.addEventListener("click", () => goToSlide(true));
container.addEventListener("transitionend", handleTransitionEnd);

window.addEventListener("resize", () => {
  gap = calculateGap();
  slideWidth =
    container.querySelector(".slider").getBoundingClientRect().width + gap;
  updateSlide(currentIndex, false);
});

categoryListItems.forEach(li => {
  li.addEventListener("click", () => {
    categoryListItems.forEach(item => item.classList.remove("active"));
    li.classList.add("active");

    const counts = {
      artist: 20,
      projects: 12,
      agency: 8
    };

    renderSlider(li.dataset.item, counts[li.dataset.item]);
  });
});

initSlider();


window.addEventListener('load', () => {
  const items = document.querySelectorAll('.carousel-item');
  items.forEach(item => item.getBoundingClientRect());
});

// Newsletter subscribe function
const emailInput=document.querySelector(".newsletter-section .email-input");
const subscribeBtn=document.querySelector(".newsletter-section .subscribe-btn");
const errorElement=document.querySelector(".newsletter-section .error")
subscribeBtn.addEventListener('click', () => {
    if (validate()) {
    setTimeout(() => {
        emailInput.value="";
        errorElement.classList.remove("show");
        errorElement.classList.remove("success");
      }, 4000);

    return;
  }
})

function validate() {
  let success = true;
  const emailVal = emailInput.value.trim();
  if (emailVal === "") {
    errorElement.innerHTML = "Please enter the email";
    errorElement.classList.remove("success");
    errorElement.classList.add("show");
    success=false;
  }
  else if (!validateEmail(emailVal)) {
    errorElement.innerHTML = "Please enter the valid email";
    errorElement.classList.remove("success");
    errorElement.classList.add("show");
    success = false;

  }
  else{
    errorElement.innerHTML = "Email sent successfully";
    errorElement.classList.add("show");
    errorElement.classList.add("success");
  }

  return success;

}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    );
}

//prevent for redirect to the next page, if no user logged 

const exploreBtn=document.querySelector(".explore-btn");

exploreBtn.addEventListener('click',()=>{
  if(!sessionStorage.getItem("loggedUser")){
    loginOverLay.classList.add('active');
    body.classList.add("not-active");
  }
})


const startBtn=document.querySelector(".start-btn");

startBtn.addEventListener('click',()=>{
  if(!sessionStorage.getItem("loggedUser")){
    loginOverLay.classList.add('active');
    body.classList.add("not-active");
  }
})

const navLinks=document.querySelectorAll(".landing-header nav .nav-link");
navLinks.forEach(link=>{
  link.addEventListener('click',(e)=>{
  if(!sessionStorage.getItem("loggedUser")){
    e.preventDefault();
    loginOverLay.classList.add('active');
    body.classList.add("not-active");
  }
})
})



