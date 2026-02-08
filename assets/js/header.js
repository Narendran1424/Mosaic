const headerActions=document.querySelector(".header-actions");
const navList=document.querySelector("nav ul")
const menuBtn=document.querySelector(".menu-btn");
const closeBtn=document.querySelector(".close-btn");

menuBtn.addEventListener("click",()=>{
  headerActions.classList.add("active");
  closeBtn.classList.add("active");
  body.classList.add("not-active");
})
closeBtn.addEventListener("click",()=>{
  headerActions.classList.remove("active");
  closeBtn.classList.remove("not-active");
  body.classList.remove("not-active");
})


window.addEventListener("resize",()=>{
  headerActions.classList.remove("active");
  closeBtn.classList.remove("not-active");
})