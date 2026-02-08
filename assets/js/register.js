

const step1=document.querySelector(".step-1");
const step2=document.querySelector(".step-2");
const step3=document.querySelector(".step-3");
const step4=document.querySelector(".step-4");
const step5=document.querySelector(".step-5");
const step6=document.querySelector(".step-6");
const step7=document.querySelector(".step-7");
const step8=document.querySelector(".step-8");
const step9=document.querySelector(".step-9");
const step10=document.querySelector(".step-10");
const step11=document.querySelector(".step-11");

const back1Btn=step1.querySelector(".back-btn");
const back2Btn=step2.querySelector(".back-btn");
const back3Btn=step4.querySelector(".back-btn");
const back4Btn=step5.querySelector(".back-btn");
const back5Btn=step6.querySelector(".back-btn");
const back6Btn=step7.querySelector(".back-btn");
const back7Btn=step8.querySelector(".back-btn");
const back8Btn=step9.querySelector(".back-btn");
const back9Btn=step10.querySelector(".back-btn");
const back10Btn=step11.querySelector(".back-btn");



const continue1Btn=step1.querySelector(".continue-btn");
const continue2Btn=step2.querySelector(".continue-btn");
const continue3Btn=step4.querySelector(".continue-btn");
const continue4Btn=step5.querySelector(".continue-btn");
const continue5Btn=step6.querySelector(".continue-btn");
const continue6Btn=step7.querySelector(".continue-btn");
const continue7Btn=step8.querySelector(".continue-btn");
const continue8Btn=step9.querySelector(".continue-btn");
const continue9Btn=step10.querySelector(".continue-btn");
const continue10Btn=step11.querySelector(".continue-btn");


const userMail=step2.querySelector(".user-mail");
const registerFormSecion=document.querySelector(".register-form-section");

function scrollTop(){
  registerFormSecion.scrollTo({top:0, behavior:"smooth"})
}

//left wrapper
const card1=document.querySelector(".row-5.col-3");
const card2=document.querySelector(".row-5.col-4");

const cards1=document.querySelectorAll(".row-6.col-1");
const cards2=document.querySelectorAll(".row-6.col-2");
if(step9.classList.contains("active")){
  card1.classList.remove("h-145");
  card2.classList.remove("h-145");
  cards1.forEach(c=>c.classList.add("active"));
}
else{
  card1.classList.add("h-145");
  card2.classList.add("h-145");
  cards1.forEach(c=>c.classList.remove("active"));
}

function addCards(){

    if(window.innerWidth<=1024 && window.innerWidth>768){
        if(step11.classList.contains("active")){

            card1.classList.remove("h-145");
            card2.classList.remove("h-145");
            cards1.forEach(c=>{
                c.classList.add("active")
                c.classList.remove("h-115");
            });
            cards2.forEach(c=>c.classList.add("active"));
        }
        
        else {
            card1.classList.add("h-145");
            card2.classList.add("h-145");
            cards1.forEach(c=>{
                c.classList.remove("active")
                c.classList.add("h-115");
            });
            cards2.forEach(c=>c.classList.remove("active"));
        }
    }
    else{
        card1.classList.add("h-145");
        card2.classList.add("h-145");
        cards1.forEach(c=>{
            c.classList.remove("active")
            c.classList.add("h-115");
        });
        cards2.forEach(c=>c.classList.remove("active"));
    }
}
addCards()
window.addEventListener('resize', addCards);

//Step 1 

//Datepicker
const dateInputs = document.querySelectorAll(".audit-form-container input[type='date']");


const dateText=step1.querySelector(".date-text");

const calendarDays = document.querySelectorAll(".custom-date-day");

calendarDays.forEach(dayBtn => {
  dayBtn.addEventListener("click", () => {
    let day = Number(dayBtn.dataset.day);
    let month = Number(dayBtn.dataset.month);
    let year = Number(dayBtn.dataset.year);

    let selectedDate = new Date(year, month - 1, day);

  });
});

function padZero(num){
  if(num > 9){
    return num;
  }
  else{
    return "0"+num;
  }
}
let flag=0;
let selectedMonth;
let selectedDatee;
let selectedYear;
 const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 
function createDatepicker(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const tags = datePicker.querySelectorAll(".tag");
  
  let today = new Date();

  let current = new Date(today);

  let selectedDate = null;

 

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]} ${year}`;
    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let days = [];

    for (let i = firstDay; i > 0; i--) {
      days.push({
        day: prevLastDate - i + 1,
        faded: true,
        date: new Date(year, month - 1, prevLastDate - i + 1)
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push({
        day: i,
        faded: false,
        date: new Date(year, month, i)
      });
    }

    const nextDays = 42 - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push({
        day: i,
        faded: true,
        date: new Date(year, month + 1, i)
      });
    }

    days.forEach((d, index) => {
      const btn = document.createElement("button");
      btn.classList.add("date");
      btn.type = "button";
      btn.textContent = d.day;
      
      if (d.faded) btn.classList.add("faded");
       if (d.date.toDateString() === today.toDateString() &&
        !btn.classList.contains("current-date") 
      ) {
       
        if(!btn.classList.contains("faded")){
           btn.classList.remove("current-day")
          btn.classList.add("current-date");

        }
        
      }
      if (d.date.toDateString() === today.toDateString() && selectedDate === null) {
        if(!btn.classList.contains("faded")){
          btn.classList.add("current-day");
        }
        
      }


      if (selectedDate && d.date.toDateString() === selectedDate.toDateString()) {
        if(!btn.classList.contains("faded")){
          btn.classList.add("current-day"); 
        }
      }
     
      btn.addEventListener("click", () => {
        const allButtons = datesContainer.querySelectorAll(".date");
        selectedDate = d.date;

        if (flag === 0) {
          allButtons.forEach(b => b.classList.remove("current-date"));

          allButtons.forEach((b, i) => {
            if (b.classList.contains("current-day")) {
              const btnDate = days[i].date;
              if (
                btnDate.getMonth() === current.getMonth() &&
                btnDate.getFullYear() === current.getFullYear()
              ) {
                b.classList.remove("current-day");
                b.classList.add("current-date");
              }
            }
          });

          flag = 1; 
        }

        allButtons.forEach(b => b.classList.remove("current-day"));
        btn.classList.add("current-day");
        getSelectedDate(datePicker)
        validDateInput(datePicker)
        validateDetailForm();
        datePicker.classList.remove("active");
      });

      datesContainer.appendChild(btn);
    });

  }

    prevBtn.addEventListener("click", () => {
      current.setMonth(current.getMonth() - 1);
      renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
      current.setMonth(current.getMonth() + 1);
      renderCalendar();
    });

    tags.forEach(tag => {
      tag.addEventListener("click", () => {
        let type = tag.dataset.type;

        if (type === "today") selectedDate = new Date();
        if (type === "yesterday") selectedDate = new Date(Date.now() - 86400000);
        if (type === "tomorrow") selectedDate = new Date(Date.now() + 86400000);

          current = new Date(selectedDate);
          renderCalendar();
      });
    });
  renderCalendar();
}

const datepicker=step1.querySelector(".datepicker");

createDatepicker(datepicker)


const days=datepicker.querySelector(".days")
    for(let i=0;i<DAYS.length;i++){
    const dayEl=document.createElement("span");
    dayEl.className="day"
    dayEl.textContent=DAYS[i];
    days.appendChild(dayEl);
}

function getSelectedDate(datePicker){
   const monthNameEl=datePicker.querySelector(".month-name")
  const MonthArr=monthNameEl.textContent.split(" ")
    selectedMonth=Number(MONTHS.findIndex(m => m === MonthArr[0]))+1
    selectedMonth=padZero(selectedMonth)
      const dates=datePicker.querySelectorAll(".dates .date");
      dates.forEach(d=>{
      if(d.classList.contains("current-day")){
        selectedDatee=padZero(Number(d.textContent))
      }
    })
    selectedYear=Number(MonthArr[1])

    const parentEl=datePicker.parentElement;
    const dateInp=parentEl.querySelector(".date-input");
    dateInp.value=`${selectedYear}-${selectedMonth}-${selectedDatee}`;
    const dateText=parentEl.querySelector(".date-text");
    dateText.childNodes[0].textContent=`${selectedYear}-${selectedMonth}-${selectedDatee}`;
}

function  validDateInput(datePicker){
  const parentEl=datePicker.parentElement;
  const dateInp=parentEl.querySelector(".date-input");
  const formGroup = dateInp.parentElement;
  const errorElement = formGroup.querySelector(".error");
  if(dateInp.value==""){
    formGroup.classList.add("error");
  } else {
    formGroup.classList.remove("error");
  }
}


dateText.addEventListener("click", () => {
    const parentContainer = dateText.parentElement;
    const datePicker = parentContainer.querySelector(".datepicker");

    datePicker.classList.toggle("active");

    datePicker._trigger = dateText;
});


document.addEventListener("click", (e) => {
  document.querySelectorAll(".datepicker.active").forEach(dp => {
    const trigger = dp._trigger;

    if (!trigger.contains(e.target) && !dp.contains(e.target)) {
      dp.classList.remove("active");
    }
  });
});

//Validate detail form
const detailForm=step1.querySelector(".detail-form");
const detailInputs=detailForm.querySelectorAll("input");



function validateDetailForm(){
  let isValid = true;
  detailInputs.forEach((input) => {
    const value = input.value.trim();
    const formGroup = input.closest(".form-group");
    const errorElement = formGroup.querySelector(".error");
    
    if(input.type === "checkbox"){
      const errorGroup = input.parentElement.parentElement.parentElement;
      const checkboxError = errorGroup.querySelector(".error");
      
      if(!input.checked){
        isValid = false;
        errorGroup.classList.add("error");
        checkboxError.textContent = `please agree to the terms and conditions`;
      } else {
        errorGroup.classList.remove("error");
        checkboxError.textContent = "";
      }
    } 
    else {
      if (value === "") {
        isValid = false;
        formGroup.classList.add("error");
        errorElement.textContent = `please enter the ${input.name}`;
      }
      else if (input.name === "email") {
        if (!validateEmailField(input)) {
          isValid = false;
        }
      }
      else if(input.id === "password"){
        const passwordValidation = validatePassword(realPassword, formGroup, errorElement);
        if(!passwordValidation){
          isValid = false;
        }
      }
      else if(input.id === "correct-password"){
        if(crtPassword !== realPassword){
          isValid = false;
          formGroup.classList.add("error");
          errorElement.textContent = "Passwords do not match";
        } else if(crtPassword === ""){
          isValid = false;
          formGroup.classList.add("error");
          errorElement.textContent = "Please confirm your password";
        } else {
          formGroup.classList.remove("error");
          errorElement.textContent = "";
        }
      }
      else if(input.id === "mobile"){
        const mobileValidation = validateMobile(value, formGroup, errorElement,input);
        if(!mobileValidation){
          isValid = false;
        }
      }
      else {
        formGroup.classList.remove("error");
        errorElement.textContent = "";
      }
    }
  });

  return isValid;
}

// validate email input
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    );
}


function validateEmailField(input) {
  const value = input.value.trim();
  const formGroup = input.closest(".form-group");
  const errorElement = formGroup.querySelector(".error");

  if (value === "") {
    formGroup.classList.add("error");
    errorElement.textContent = "Please enter the email";
    return false;
  }

  if (!validateEmail(value)) {
    formGroup.classList.add("error");
    errorElement.textContent = "Please enter a valid email";
    return false;
  }

  if (isEmailRegistered(value)) {
    formGroup.classList.add("error");
    errorElement.textContent = "Email already exists";
    return false;
  }

  formGroup.classList.remove("error");
  errorElement.textContent = "";
  return true;
}


//password validation function 
function validatePassword(passwordVal, formGroup, errorElement){
  if (passwordVal === "") {
    formGroup.classList.add("error");
    errorElement.textContent = "Please enter the password";
    return false;
  } else if (passwordVal.length < 8) {
      formGroup.classList.add("error");
      errorElement.textContent = "Min 8 characters required";
      return false;
  } else if (!/[A-Z]/.test(passwordVal)) {
      formGroup.classList.add("error");
      errorElement.textContent = "Need 1 uppercase letter";
      return false;
  } else if (!/[0-9]/.test(passwordVal)) {
      formGroup.classList.add("error");
      errorElement.textContent = "Need 1 number";
      return false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
      formGroup.classList.add("error");
      errorElement.textContent = "Need 1 special character";
      return false;
  } else {
      formGroup.classList.remove("error");
      errorElement.textContent = "";
      return true;
  }
}

//mobile number validation function 
// function formatmobileNumber(value) {
//   const cleaned = value.replace(/[^+\d]/g, "");

//   const match = cleaned.match(/^\+(\d{1,3})(\d{0,10})$/);
//   if (!match) return cleaned;

//   const country = match[1];
//   const number = match[2];

//   const part1 = number.slice(0, 3);
//   const part2 = number.slice(3, 7);
//   const part3 = number.slice(7, 10);

//   let formatted = `+${country}`;
//   if (part1) formatted += ` (${part1})`;
//   if (part2) formatted += ` - ${part2}`;
//   if (part3) formatted += ` ${part3}`;

//   return formatted;
// }
// const countrySelect = document.getElementById("countryCode");
// const countryDisplay = document.getElementById("countryDisplay");

// countryDisplay.addEventListener("click", () => {
//   countrySelect.focus();
//   countrySelect.click();
// });

// countrySelect.addEventListener("change", () => {
//   countryDisplay.textContent = countrySelect.value;
// });


function validateMobile(mobileVal, formGroup, errorElement, inputElement) {

  const cleaned = mobileVal.replace(/[^\d]/g, "");
  

  if (cleaned !== mobileVal && inputElement) {
    inputElement.value = cleaned;
  }
  
  if (cleaned.length > 13 && inputElement) {
    inputElement.value = cleaned.slice(0, 13);
    return false;
  }
  
  const digits = cleaned;

  if (!digits.length) {
    formGroup.classList.add("error");
    errorElement.textContent = "Please enter the mobile number";
    return false;
  }

  if (digits.length < 11) {
    formGroup.classList.add("error");
    errorElement.textContent = "Invalid mobile number";
    return false;
  }

  formGroup.classList.remove("error");
  errorElement.textContent = "";
  return true;
}


//input listener to the form inputs
let realPassword = ""; 
let crtPassword = "";

detailInputs.forEach(inp => {
  inp.addEventListener('input', () => {
    validateDetailForm();
  });
  if(inp.id === "password"){
    inp.addEventListener("input", (e) => {
      const char = e.data;

      if (char) {
        realPassword += char;
      } else {
        realPassword = realPassword.slice(0, -1);
      }
      
      inp.value = "*".repeat(realPassword.length);
      validateDetailForm(); 
    });
  }
  if(inp.id === "correct-password"){
    inp.addEventListener("input", (e) => {
      const char = e.data;

      if (char) {
        crtPassword += char;
      } else {
        crtPassword = crtPassword.slice(0, -1);
      }
      inp.value = "*".repeat(crtPassword.length);
      validateDetailForm(); 
    });
  }

  // if(inp.id==="mobile"){
  //   inp.addEventListener("input", (e) => {
  //     const input = e.target;

  //     let cleaned = input.value.replace(/[^+\d]/g, "");

  //     if (cleaned.indexOf("+") > 0) {
  //       cleaned = "+" + cleaned.replace(/\+/g, "");
  //     }
  //     const digitsCount = cleaned.replace(/\D/g, "").length;

  //     if (digitsCount > MAX_DIGITS) {
  //       input.value = input.dataset.prev || "";
  //       return;
  //     }


  //     input.dataset.prev = cleaned;

  //     input.value = formatmobileNumber(cleaned);
  //   });
  // }

});

//get data from the inputs
function getdetailFormData() {
  const detailFormData = {};
  detailInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      detailFormData[input.name] = input.value.trim();
      
    }
    detailFormData["password"] = realPassword.trim();
    delete detailFormData["correct-password"];
  });
  return detailFormData;
}

//delete all the data from the form inputs
function delFormData(){
    detailForm.reset();
    detailInputs.forEach(input=>{
      const inputWrapper=input.closest(".input-wrapper");
      inputWrapper.classList.remove("error");
      input.value="";
    })
    createDatepicker(datepicker)
  dateText.childNodes[0].textContent="yyyy-mm-dd";
}
//Form submit function
let userData;
let verificationCode;
continue1Btn.addEventListener('click',async()=>{
  if (validateDetailForm()) {
    userData  = getdetailFormData();
    delFormData();
    
    verificationCode=generateVerificationCode();
    const result = await sendVerificationEmail(userData.email, verificationCode);
    const toast=step1.querySelector(".toast-container");
    if (result.success) {
      userMail.value=userData.email;
      step1.classList.remove("active");
      step2.classList.add("active");
    }
    else{
      showToast(
        toast,
        "error",
        "Failed to send verification email!"
      );
    }
    scrollTop();
   
  }
})
function showToast(toast, bgcolor, message) {
  const html=document.documentElement
  html.scrollTo({ top: 0, behavior: "smooth" });
  toast.querySelector("p").innerHTML = message;
  toast.classList.remove("error");
  toast.classList.remove("success");
  toast.classList.add(bgcolor);
  toast.classList.add("show");


  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Store all user data in a structured way
function saveCompleteUserData(userId, sectionName, sectionData) {
  const users = getRegisteredUsers();

  let user = users.find(u => u.userId === userId);

  if (!user) {
    user = {
      userId: userId, 
      email: sectionData.email, 
      personalDetails: {},
      artists: [],
      genres: [],
      profile: {},
      portfolio: {},
      personality: {},
      pickout: {},
      publish: {}
    };
    users.push(user);
  }

  user[sectionName] = sectionData;

  setRegisteredUsers(users);
  return user;
}

function generateUserId() {
  const users = getRegisteredUsers();
  return users.length ? users[users.length - 1].userId + 1 : 1;
}

function getRegisteredUsers() {
  return JSON.parse(sessionStorage.getItem("registeredUsers")) || [];
}

function setRegisteredUsers(users) {
  sessionStorage.setItem("registeredUsers", JSON.stringify(users));
}

function isEmailRegistered(email) {
  const users = getRegisteredUsers();
  return users.some(
    user => user.email.toLowerCase() === email.toLowerCase().trim()
  );
}


//Step2 Email verification
const editEmailBtn=step2.querySelector(".edit-email-btn");
editEmailBtn.addEventListener('click',()=>{
  userMail.removeAttribute("readonly");
  userMail.focus();
})

// const EMAILJS_CONFIG = {
//   publicKey: 'caIP3a7BkCxjJ_Iqq',      
//   serviceId: 'service_n7n2mwb',      
//   templateId: 'template_n49deic'     
// };

// (function() {
//   emailjs.init(EMAILJS_CONFIG.publicKey);
// })();
const resendBtn = step2.querySelector('.resend-btn');
const codeInput= step2.querySelector('.verify-code');

// Generate & Store Verification Code
function generateVerificationCode() {
  return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Send Email via EmailJS
// async function sendVerificationEmail(email, code) {
//   const toast=step1.querySelector(".toast-container")
//   // const userName = email.split('@')[0];
  
//   const templateParams = {
//     to_email: email,
//     code: code
//   };
  
//   try {
//     const response = await emailjs.send(
//       EMAILJS_CONFIG.serviceId,
//       EMAILJS_CONFIG.templateId,
//       templateParams
//     );
    
//     return { success: true };
//   } catch (error) {
//     showToast(toast, "error", "Failed to send verification code")
//     return { success: false, error: error.text || error.message };
//   }
// }


// // Verification Code Input 
// let prevValue = '';

// codeInput.addEventListener('input', () => {
//   let codeVal = codeInput.value.replace(/\D/g, '');

//   if (codeVal.length > 4) {
//     codeInput.value = prevValue;
//     return;
//   }

//   prevValue = codeVal;
//   codeInput.value = codeVal;
//   validateVerificationCode(codeVal)

// });


// // Resend Code 
// resendBtn.addEventListener('click', async () => {
//   userMail.setAttribute("readonly",true);
//   userData.email=userMail.value;

//   verificationCode= generateVerificationCode();

//   const result = await sendVerificationEmail(userMail.value, verificationCode);
//   const toast=step2.querySelector(".toast-container");
//   if (result.success) {
//     codeInput.value = '';
//     errorElement.textContent="";
//     showToast(toast,"success","New code sent!");
//   } else {
//     codeInput.value = '';
//     errorElement.textContent="";
//     showToast(toast,"error","Failed to send new code!");
//   }
  
// });

// function validateVerificationCode(codeVal) {
//   const verifyWrapper = step2.querySelector(".email-verify-wrapper");
//   const error = verifyWrapper.querySelector(".error");
//   error.textContent = ''; 
//   if (codeVal.length === 4) {
//    if (codeVal.toString() === verificationCode.toString()) {
//       error.textContent = "";
//       return true;
//     }
//     else {
//       error.textContent = 'Invalid code. Please try again.';
//       return false;
//     }
//   }


//   return false;
// }

// continue2Btn.addEventListener('click', () => {
//   const verifyWrapper=step2.querySelector(".email-verify-wrapper");
//   const error=verifyWrapper.querySelector(".error");
//   const codeVal=codeInput.value
//   if (validateVerificationCode(codeVal)) {
//     codeInput.value="";
//     error.textContent="";
    
//     let userId = sessionStorage.getItem("currentUserId");
//     if (!userId) {
//         userId = generateUserId();
//         sessionStorage.setItem("currentUserId", userId);
//     } else {
//       userId = Number(userId);
//     }
//     saveCompleteUserData(userId, "personalDetails", userData);
//     step2.classList.remove("active");
//     step3.classList.add("active");
//   } 
// });

//Step 3 login

const loginBtn=step3.querySelector(".login-btn");

loginBtn.addEventListener("click",()=>{
  step3.classList.remove("active");
  step4.classList.add("active");
});

//step 4
const artistInputs=step4.querySelectorAll("input[name='artist']");
const artistChipContainer=step4.querySelector(".artist-chip-container");
const artistChips = {
  music: [
    "Singer","Composer","Songwriter","DJ","Rapper","Vocalist",
    "Instrumentalist","Producer","Audio Engineer","Studio Musician","Musician","Other"],

  dance: [
    "Choreographer","Dancer","Instructor","Freestyle",
    "Classical","Hip Hop","Contemporary","Ballet","Crew Member","Director","Other"
  ],

  film: ["Actor","Actress","Director","Assistant Director","Editor",
    "Script Writer","Dialogue Writer","Producer","Executive Producer","Art Director",
    "Costume Designer","Makeup Artist","VFX Artist","Other"
  ]
};


artistInputs.forEach(inp=>{
  inp.addEventListener("change",()=>{
    if(inp.checked){
      const checkedArtist=inp.dataset.artist;
      for(let key in artistChips){
        if(checkedArtist==key){
          const arr=artistChips[key];
          renderArtistChips(arr)
        }
      }
    }
  })
})

function renderArtistChips(artists){
  artistChipContainer.innerHTML="";
  artists.forEach(artist=>{
    artistChipContainer.innerHTML+=`<div class="chip">${artist}</div>`
  })
  getSelectedArtists();
}



let selectedArtists=[];
function getSelectedArtists(){
  artistChipContainer.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");

    selectedArtists = [...artistChipContainer.querySelectorAll(".chip")]
      .filter(c => c.classList.contains("active"))
      .map(c => c.textContent);

    console.log(selectedArtists);
  });
  });
}

getSelectedArtists();

continue3Btn.addEventListener("click",()=>{
  if(selectedArtists.length>0){
  
  const userId = sessionStorage.getItem("currentUserId");
  
    saveCompleteUserData(userId, "artists", selectedArtists);
    step4.classList.remove("active");
    step5.classList.add("active");
  }
})

//Step 5 
const genreChips=step5.querySelectorAll(".genre-chip-container .chip");
let selectedGenres=[];
genreChips.forEach(chip => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");

    selectedGenres = [...genreChips]
      .filter(c => c.classList.contains("active"))
      .map(c => c.textContent);

    console.log(selectedGenres);
  });
});

continue4Btn.addEventListener("click",()=>{
  if(selectedGenres.length>0){
  
  const userId = sessionStorage.getItem("currentUserId");

    saveCompleteUserData(userId, "genres", selectedGenres) ;
    step5.classList.remove("active");
    step6.classList.add("active");
  }
})

//Step 6
const profieInputs=step6.querySelectorAll("input ,textarea");

function validateProfileInputs(){
  let isValid = true;

  profieInputs.forEach(inp=>{
    const formGroup = inp.closest(".form-group");
    const errorElement = formGroup.querySelector(".error");

    if(inp.id === "photo"){
      if(!validatePhoto(inp, formGroup, errorElement)){
        isValid = false;
      }
    }
    else if(inp.id === "resume"){
      if(!validateResume(inp, formGroup, errorElement)){
        isValid = false;
      }
    }

    else{
      const value = inp.value.trim();

      if(value === ""){
        formGroup.classList.add("error");
        errorElement.textContent = `please enter the ${inp.name}`;
        isValid = false;
      } else {
        formGroup.classList.remove("error");
        errorElement.textContent = "";
      }
    }
  });

  return isValid;
}


function delProfileInputData(){
  profieInputs.forEach(inp=>{
    const formGroup = inp.closest(".form-group");
    const errorElement = formGroup.querySelector(".error")
    inp.value="";
    formGroup.classList.remove("error");
    errorElement.textContent = "";
  })
  
  resetResumeInput();
  resetPhotoInput();
}

profieInputs.forEach(inp=>{
  inp.addEventListener("input",()=>{
    validateProfileInputs();
  })
})

const photoInput = step6.querySelector("#photo");
const photoPreview = step6.querySelector(".photo-wrapper .add-img");
const photoText = step6.querySelector(".photo-text");
const photoWrapper = step6.querySelector(".img-wrapper");


photoInput.addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;

  const formGroup = photoInput.closest(".form-group");
  const errorElement = formGroup.querySelector(".error");

  if(!validatePhoto(photoInput, formGroup, errorElement)) return;

  const url = URL.createObjectURL(file);
  photoPreview.src = url;

  formGroup.classList.add("uploaded")
  photoWrapper.classList.add("active");
  photoPreview.classList.add("active");
  photoText.classList.add("not-active"); 
});

function validatePhoto(input, formGroup, errorElement){
  const file = input.files[0];

  if(!file){
    formGroup.classList.add("error");
    errorElement.textContent = "Please upload photo";
    return false;
  }

  const validTypes = ["image/jpeg","image/png","image/webp"];

  if(!validTypes.includes(file.type)){
    formGroup.classList.add("error");
    errorElement.textContent = "please upload the valid file";
    input.value="";
    return false;
  }

  if(file.size > 2*1024*1024){
    formGroup.classList.add("error");
    errorElement.textContent = "Image must be below 2MB";
    input.value="";
    return false;
  }

  formGroup.classList.remove("error");
  errorElement.textContent="";
  return true;
}

function resetPhotoInput(){
  const photoGroup=step6.querySelector(".photo-group")
  photoGroup.classList.remove("uploaded")
  photoWrapper.classList.remove("active");
  photoPreview.classList.remove("active");
  photoPreview.src="./assets/images/add.webp";
  photoText.classList.remove("not-active"); 
}

function validateResume(input, formGroup, errorElement){
  const imgWrapper=formGroup.querySelector(".img-wrapper");
  const resumeImg=formGroup.querySelector(".add-img");
  const resumeText=formGroup.querySelector(".resume-text");
  const resumePreview=formGroup.querySelector(".resume-preview");
  const fileName=resumePreview.querySelector(".file-name");
  const fileSize=resumePreview.querySelector(".file-size");
  const file = input.files[0];
  // con

  if(!file){
    formGroup.classList.remove("error");
    errorElement.textContent="";
    return true; 
  }

  const validTypes = [
    "application/pdf",
    // "application/msword",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if(!validTypes.includes(file.type)){
    formGroup.classList.add("error");
    errorElement.textContent="please upload the pdf file";
    input.value="";
    return false;
  }

  if(file.size > 5*1024*1024){
    formGroup.classList.add("error");
    errorElement.textContent="Max 5MB";
    input.value="";
    return false;
  }
  imgWrapper.classList.add("active");
  resumeImg.classList.add("active");
  resumeImg.src = "./assets/images/pdf.png"; 
  resumeText.classList.add("not-active");
  resumePreview.classList.add("active");
  fileName.textContent = file.name;

  // file size
  const sizeKB = (file.size / 1024).toFixed(1);
  fileSize.textContent = `${sizeKB} KB`;

  formGroup.classList.remove("error");
  errorElement.textContent="";
  return true;
}

function resetResumeInput(){
  const formGroup=step6.querySelector(".resume-group");
  const imgWrapper=formGroup.querySelector(".img-wrapper");
  const resumeImg=formGroup.querySelector(".add-img");
  const resumeText=formGroup.querySelector(".resume-text");
  const resumePreview=formGroup.querySelector(".resume-preview");
  const fileName=resumePreview.querySelector(".file-name");
  const fileSize=resumePreview.querySelector(".file-size");

  imgWrapper.classList.remove("active");
  resumeImg.classList.remove("active");
  resumeImg.src = "./assets/images/add.webp"; 
  resumeText.classList.remove("not-active");
  resumePreview.classList.remove("active");
  fileName.textContent = "";
  fileSize.textContent = "";
}

function fileToBase64(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> resolve(reader.result);
    reader.onerror = err => reject(err);
  });
}


continue5Btn.addEventListener('click',async()=>{
  if (validateProfileInputs()) {
    console.log("success")
    
    const profileData=await getProfileData();
    let userId = sessionStorage.getItem("currentUserId");
    if (!userId) {
      userId = generateUserId();
       sessionStorage.setItem("currentUserId", userId);
    } else {
      userId = Number(userId);
    }
    saveCompleteUserData(userId, "profile", profileData);
    delProfileInputData();

    step6.classList.remove("active");
    step7.classList.add("active")
  }
})

async function getProfileData(){
  const data = {
    resume:{src:"",fileName:"",fileSize:""},
  };

  profieInputs.forEach(inp=>{
    if(inp.type !== "file"){
      data[inp.id] = inp.value.trim();
    }
  });

  const photoFile = photoInput.files[0];
  if(photoFile){
    data.photo = await fileToBase64(photoFile);
  }

  const resumeInput = step6.querySelector("#resume");
  const resumeFile = resumeInput.files[0];

  if(resumeFile){
    data.resume.src=await fileToBase64(resumeFile);
    data.resume.fileName=resumeFile.name;
    const sizeKB = (resumeFile.size / 1024).toFixed(1);
    data.resume.fileSize = `${sizeKB} KB`;

  }
  return data;
}

//Step 7

const linksWrapper = step7.querySelector(".portfolio-links");
const videoInput = step7.querySelector("#video");
const portfolioContainer = document.querySelector(".portfolio-links");

portfolioContainer.addEventListener("click", (e) => {
  if (e.target.closest(".add-label")) {

    const inputs = portfolioContainer.querySelectorAll(".portfolio-input");
    const lastInput = inputs[inputs.length - 1];

    if (lastInput.value.trim() === "") {
      lastInput.focus();
      return;
    }


    const div = document.createElement("div");
    div.classList.add("portfolio-link");

    div.innerHTML = `<div class="input-container">
      <input type="url" name="portfolio-link[]" class="portfolio-input">
      <span class="remove-link">✖</span>
      </div>
      <p class="error"></p>
    `;

    portfolioContainer.appendChild(div);
  }
});

const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\S*)$/;


portfolioContainer.addEventListener("input", (e) => {
  if (!e.target.classList.contains("portfolio-input")) return;

  const input = e.target;
  const value = input.value.trim();

  if (value === "") {
    showError(input, "please enter the link");
    return;
  }

  if (!urlRegex.test(value)) {
    showError(input, "please enter the valid link");
    return;
  }

  clearError(input);
});


function showError(input, message) {
  const container = input.closest(".portfolio-link");
  const error = container.querySelector(".error");
  error.textContent = message;
}

function clearError(input) {
  const container = input.closest(".portfolio-link");
  const error = container.querySelector(".error");
  error.textContent = "";
}



portfolioContainer.addEventListener("click", (e) => {
  if (!e.target.closest(".remove-link")) return;
  e.target.closest(".portfolio-link").remove();
});

function getAllLinks() {
  const arr = [];
  portfolioContainer.querySelectorAll("input").forEach(inp => {
    const v = inp.value.trim();
    if (v) arr.push(v);
  });
  return arr;
}


const previewContainer = document.querySelector(".video-preview-container");
const videoError = videoInput.closest(".form-group").querySelector(".error");

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];

  previewContainer.innerHTML = "";
  videoError.textContent = "";

  if (!file) return;

  if (!file.type.startsWith("video/")) {
    videoError.textContent = "Only video allowed";
    videoInput.value = "";
    return;
  }


  if (file.size > MAX_SIZE) {
    videoError.textContent = "Max size 20MB";
    videoInput.value = "";
    return;
  }

  // preview
  const url = URL.createObjectURL(file);

  const wrapper = document.createElement("div");
  wrapper.classList.add("video-item");

  wrapper.innerHTML = `
    <video src="${url}" controls></video>
    <div class="video-info">
      <span>${file.name}</span>
      <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
      <button class="remove-video">Remove</button>
    </div>
  `;

  previewContainer.appendChild(wrapper);
});

previewContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-video")) {
    previewContainer.innerHTML = "";
    videoInput.value = "";
  }
});
