const body=document.body;
const loginBtn1=document.querySelector(".login-btn-1");

const loginOverLay=document.querySelector(".login-overlay");
const loginContainer=document.querySelector(".login-container");
const loginForm=document.querySelector(".login-form");
const loginMail=loginForm.querySelector(".login-email");
const loginPassword=loginForm.querySelector(".login-password");
const forgotLink=loginForm.querySelector(".forgot-link");
const loginCheck=loginForm.querySelector(".login-check");
const loginBtn2=document.querySelector(".login-btn-2");
const registerBtn=document.querySelector(".register-btn");

const registerOverlay=document.querySelector(".register-overlay");

const registerCloseBtn=registerOverlay.querySelector(".close-btn");
const collabBtn=document.querySelector(".collaborate-btn");

const planOverlay=document.querySelector(".plan-overlay");
const planCloseBtn=planOverlay.querySelector(".close-btn");
const backBtn=planOverlay.querySelector(".back-btn");
const continueBtn=planOverlay.querySelector(".continue-btn");
const planCards=planOverlay.querySelectorAll(".plan-card");

//Register Authentication

loginBtn1.addEventListener('click',()=>{
    loginOverLay.classList.add('active');
    headerActions.classList.remove("active");
    closeBtn.classList.remove("not-active");
    body.classList.add("not-active");
})

loginOverLay.addEventListener('click',(e)=>{
    if(!e.target.closest(".login-container")){
        loginOverLay.classList.remove('active');
        body.classList.remove("not-active");
    }
})


registerBtn.addEventListener('click',()=>{
    window.location.href="./register.html";
    // if(ValidateLoginForm()){
    //     let creditinialData=[];
    //     const loginData={
    //         email:loginMail.value,
    //         password:loginPassword.value,
    //         loggedIn:loginCheck.checked,
    //     }
    //     if(JSON.parse(sessionStorage.getItem("loggedData"))){
    //         const mailVal=loginMail.value;
    //         creditinialData=JSON.parse(sessionStorage.getItem("loggedData"));
    //         const matchedUser = creditinialData.find(user => user.email === mailVal);
    //         if(matchedUser){
    //             showAuthenticateToast(
    //                 ".authenticate-toast-container",
    //                 "error",
    //                 "Email already found. Please register with another email!"
    //             );
    //         }
            
    //     }
    //     else{
    //         creditinialData.push(loginData);
    //         sessionStorage.setItem("loggedData",JSON.stringify(creditinialData))
    //         loginForm.reset();
    //         showAuthenticateToast(".authenticate-toast-container","success","User Registered Successfully!");
    //         setTimeout(() => {
    //             registerOverlay.classList.add("active");
    //             loginOverLay.classList.remove('active');
    //         }, 3000);
    //     }

        
        
    // }
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

const toastCloseBtn = document.querySelector(".authenticate-toast-container img");

toastCloseBtn.addEventListener("click", () => {
    const toast = toastCloseBtn.parentElement.parentElement;
    toast.classList.remove("show");
});


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
        setError(loginPassword,"Please Enter the password");
        return false;
    } else if (passwordVal.length < 8) {
        setError(loginPassword,"Password must be at least 8 characters");
        return false;
    } else if (!/[A-Z]/.test(passwordVal)) {
        setError(loginPassword,"Password must contain at least one uppercase letter");
        return false;
    } else if (!/[0-9]/.test(passwordVal)) {
        setError(loginPassword,"Password must contain at least one number");
        return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
        setError(loginPassword,"Password must contain at least one special character");
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
            showAuthenticateToast(".authenticate-toast-container","error","Account not found. Please register first!");
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
            ".authenticate-toast-container",
            "error",
            "Account not found. Please register first!"
        );
        return false;
    }
    if (matchedUser.password !== passwordVal) {
        showAuthenticateToast(
            ".authenticate-toast-container",
            "error",
            "Incorrect password. Try again!"
        );
        return false;
    }
    else{
        sessionStorage.setItem("loginToken",generateToken());
        loginForm.reset();
        showAuthenticateToast(
        ".authenticate-toast-container",
        "success",
        "Login successful!"
        );
    }
    
}

//Forgot Password function

forgotLink.addEventListener('click',(e)=>{
    e.preventDefault();
    if(ValidateLoginForm()){
        if(JSON.parse(sessionStorage.getItem("loggedData"))){
            validateForgotPassWord();
        }
        else{
            showAuthenticateToast(".authenticate-toast-container","error","Account not found. Please register first!");
        }
    }
})

function validateForgotPassWord(){
    const mailVal=loginMail.value;
    const loggedData=JSON.parse(sessionStorage.getItem("loggedData"));
      const matchedUser = loggedData.find(
        user => user.email === mailVal
    );
}


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

