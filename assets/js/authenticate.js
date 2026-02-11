const body=document.body;

const loginBtn1=document.querySelector(".login-btn-1");
const logoutBtn=document.querySelector(".logout-btn")

const loginOverLay=document.querySelector(".login-overlay");
const loginContainer=document.querySelector(".login-container");
const loginForm=document.querySelector(".login-form");
const loginMail=loginForm.querySelector(".login-email");
const loginPassword=loginForm.querySelector(".login-password");
const forgotLink=loginForm.querySelector(".forgot-link");
const loginCheck=loginForm.querySelector(".login-check");
const loginBtn2=document.querySelector(".login-btn-2");
const registerBtns=document.querySelectorAll(".register-btn");
const logoutOverlay = document.querySelector(".logout-overlay");
const logoutContainer = logoutOverlay.querySelector(".logout-container");
const logoutCloseBtn = logoutContainer.querySelector(".logout-close-btn");
const logoutContentContainer = logoutContainer.querySelector(".logout-content-container");
const cancelLogoutBtn = logoutContainer.querySelector(".cancel-btn");
const confirmLogoutBtn = logoutContainer.querySelector(".confirm-btn");
const logoutSuccessContainer = logoutContainer.querySelector(".logout-success-container"
);

const registerOverlay=document.querySelector(".register-overlay");
const resetOverlay=document.querySelector(".reset-overlay");

const registerCloseBtn=registerOverlay.querySelector(".close-btn");
const collabBtn=document.querySelector(".collaborate-btn");

const planOverlay=document.querySelector(".plan-overlay");
const planCloseBtn=planOverlay.querySelector(".close-btn");
const backBtn=planOverlay.querySelector(".back-btn");
const continueBtn=planOverlay.querySelector(".continue-btn");
const planCards=planOverlay.querySelectorAll(".plan-card");


function lockBody() {
  const scrollBarWidth =
  window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty(
  "--scrollbar-width",
  scrollBarWidth + "px"
);

 body.classList.add("not-active");
}

//Login Authentication

loginBtn1.addEventListener('click',()=>{
    loginOverLay.classList.add('active');
    loginForm.reset();
    loginForm.querySelectorAll(".error").forEach(err=>err.textContent="");
    headerActions.classList.remove("active");
    closeBtn.classList.remove("not-active");
    // body.classList.add("not-active");
    lockBody()
})

loginOverLay.addEventListener('click',(e)=>{
    if(!e.target.closest(".login-container")){
        loginOverLay.classList.remove("active");
        body.classList.remove("not-active");
    }
})




registerBtns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        loginOverLay.classList.remove('active');
        resetOverlay.classList.remove("active");
        registerOverlay.classList.add("active");
        
    })
})



function showAuthenticateToast(toastSelector, bgcolor, message) {
  loginOverLay.scrollTo({ top: 0, behavior: "smooth" });
  const toast = document.querySelector(toastSelector);
  toast.querySelector("p").innerHTML = message;
  toast.classList.remove("error");
  toast.classList.remove("success");
  toast.classList.add(bgcolor);
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

const toastCloseBtns= document.querySelectorAll(".authenticate-toast-container img");

toastCloseBtns.forEach(btn=>{
    btn.addEventListener("click", () => {
    const toast = btn.parentElement.parentElement;
    toast.classList.remove("show");
});

})


function ValidateLoginForm(){
    let success=true;
    const mailVal=loginMail.value;
    const passwordVal=loginPassword.value;

    if(!validateloginMail(mailVal)){
        success=false;
    }
        
    if(!validatePassword(passwordVal)){
        success=false;
    }
    return success;
    
}

loginMail.addEventListener('input',()=>{
    if(!validateloginMail(loginMail.value)){
    }
})


function validateloginMail(mailVal){
    if (mailVal === "") {
        setError(loginMail,"Please enter the email");
       return false;
    }
    else if (!validateEmail(mailVal)) {
        setError(loginMail,"Please enter the valid email");
       return false;
    }
    else{
        setSuccess(loginMail);
        return true;
    }
    
}

loginPassword.addEventListener('input',()=>{
    if(!validatePassword(loginPassword.value)){
    }
})

const hexArr= [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f'];
function generateToken(){
    let token="";
    for(let i=0; i<16; i++){
        const rand=Math.floor(Math.random()*16)
        token+=hexArr[rand];
    }
    return token;
}

function validatePassword(passwordVal){
    if (passwordVal === "") {
        setError(loginPassword,"please enter the password");
        return false;
    } else if (passwordVal.length < 8) {
        setError(loginPassword,"Min 8 characters required");
        return false;
    } else if (!/[A-Z]/.test(passwordVal)) {
        setError(loginPassword,"Need atleast one uppercase letter");
        return false;
    } else if (!/[0-9]/.test(passwordVal)) {
        setError(loginPassword,"Password must contain atleast one number");
        return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
        setError(loginPassword,"Need  atleast one special character");
        return false;
    } else {
        setSuccess(loginPassword)
        return true;
    }
}

function setError(element,message){
   const wrapper=element.closest(".input-wrapper");
   const errorElement=wrapper.querySelector(".error");
   errorElement.innerHTML=message;
}

function setSuccess(element){
   const wrapper=element.closest(".input-wrapper");
   const errorElement=wrapper.querySelector(".error");
   errorElement.innerHTML="";
}



//Login Authentication

loginBtn2.addEventListener("click",()=>{
    if(ValidateLoginForm()){
        if(JSON.parse(sessionStorage.getItem("registeredUsers"))){
            validateLoginData();
        }
        else{
            showAuthenticateToast(".login-toast-container","error","Account not found. Please register first!");
        }
    }
})

function validateLoginData(){
    const mailVal=loginMail.value;
    const passwordVal=loginPassword.value;
    const loggedData=JSON.parse(sessionStorage.getItem("registeredUsers"));
      const matchedUser = loggedData.find(
        user => user.email === mailVal
    );
    if (!matchedUser) {
        showAuthenticateToast(
            ".login-toast-container",
            "error",
            "Account not found. Please register first!"
        );
        return false;
    }
    if (matchedUser.personalDetails.password !== passwordVal) {
        showAuthenticateToast(
            ".login-toast-container",
            "error",
            "Incorrect password. Try again!"
        );
        return false;
    }
    else{
        const loggedUser={
            "email":mailVal,
            "loginToken":generateToken()
        }
        sessionStorage.setItem("loggedUser",JSON.stringify(loggedUser));
        loginForm.reset();

        showAuthenticateToast(
        ".login-toast-container",
        "success",
        "Login successful!"
        );
        setTimeout(()=>{
            loginOverLay.classList.remove('active')
        },3000)
        body.classList.remove("not-active")
        
    }
    
}

//Forgot Password function

forgotLink.addEventListener("click",()=>{
    loginForm.reset();
    loginForm.querySelectorAll(".error").forEach(err=>err.textContent="");
    loginOverLay.classList.remove("active");
    resetOverlay.classList.add("active");
})
const resetMail=resetOverlay.querySelector(".reset-email");
const resetBtn=resetOverlay.querySelector(".reset-btn");

function validateResetMail(mailVal){
    if (mailVal === "") {
        setError(resetMail,"Please enter the email");
       return false;
    }
    else if (!validateEmail(mailVal)) {
        setError(resetMail,"Please enter the valid email");
       return false;
    }
    else{
        setSuccess(resetMail);
        return true;
    }
    
}

resetMail.addEventListener('input',()=>{
    validateResetMail(resetMail.value)
})
resetBtn.addEventListener('click',()=>{
    if(validateResetMail(resetMail.value)){ 
        showAuthenticateToast(".reset-toast-container","success","Reset link sent to your email!");
        setTimeout(()=>{
            resetMail.value="";
            
            resetOverlay.classList.remove("active");
            body.classList.remove("not-active");
        },2000)
    }
    
    
})

resetOverlay.addEventListener('click',(e)=>{
    if(!e.target.closest(".reset-container")){
        resetMail.value="";
        resetOverlay.querySelector(".error").textContent="";
        resetOverlay.classList.remove('active');

        body.classList.remove("not-active");
    }
})


const loginBtn=resetOverlay.querySelector(".login-text .login-btn")

loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    resetMail.value="";
    resetOverlay.querySelector(".error").textContent="";
    resetOverlay.classList.remove('active');
    loginOverLay.classList.add('active');
})



//logout functions

logoutBtn.addEventListener("click", () => {
    body.classList.add("not-active");
    logoutOverlay.classList.add("active");
      
});
  

function closeLogout() {
  logoutOverlay.classList.remove("active");
  body.classList.remove("not-active");
  logoutSuccessContainer.innerHTML = "";
  logoutContentContainer.classList.remove("not-active");
}
logoutCloseBtn.addEventListener("click", () => {
  closeLogout();
  if(logoutContentContainer.classList.contains("not-active")){
    window.location.href="./index.html";
  }
});

confirmLogoutBtn.addEventListener('click',()=>{
    if(sessionStorage.getItem("loggedUser")){
        sessionStorage.removeItem("loggedUser");
        logoutContentContainer.classList.add("not-active");
        logoutSuccessContainer.innerHTML += `<h3>Logout Successful!</h3>
        <p class="logout-msg success">You have been securely logged out. Thank you for using our service. See you soon!</p>`;
        loginBtn1.classList.remove("not-active");
        logoutBtn.classList.add("not-active");
    }
    else{
        logoutContentContainer.classList.add("not-active");
        logoutSuccessContainer.innerHTML = `
          <h3>Logout Failed</h3>
          <p class="logout-msg failed">
            Something went wrong during logout. Please try again.
          </p>`
    }
    setTimeout(() => {
        closeLogout();
    }, 2000);
})


cancelLogoutBtn.addEventListener("click", () => {
  closeLogout();
});

logoutOverlay.addEventListener("click", (e) => {
  if (!e.target.closest("logout-container")) {
    closeLogout();
  }
});


console.log(logoutBtn)
function displayAuthenticationBtns(){
    if(JSON.parse(sessionStorage.getItem("loggedUser"))){
        logoutBtn.classList.remove("not-active");
        loginBtn1.classList.add("not-active");
    }
    else{
        loginBtn1.classList.remove("not-active");
        logoutBtn.classList.add("not-active");
    }
}


displayAuthenticationBtns();

//register modals
collabBtn.addEventListener('click',()=>{
    registerOverlay.scrollTop = 0;
    registerOverlay.classList.remove("active");
    planOverlay.classList.add("active");
    
})

registerCloseBtn.addEventListener('click', ()=>{
    registerOverlay.classList.remove("active");
    body.classList.remove("not-active");

})

planCloseBtn.addEventListener('click',()=>{
    planOverlay.classList.remove("active");
    body.classList.remove("not-active");
})

backBtn.addEventListener('click',()=>{
    planOverlay.scrollTop=0;
    planOverlay.classList.remove("active");
    registerOverlay.classList.add("active");
})

planCards.forEach(card=>{
    card.addEventListener("click",()=>{
        planCards.forEach(c=>c.classList.remove("active"));
        card.classList.add("active");
    })
})


continueBtn.addEventListener('click',()=>{
    const activeCard = [...planCards].some(
        card => card.classList.contains("active")
    );

    if (activeCard) {
        window.location.href = "./register.html";
    }
})