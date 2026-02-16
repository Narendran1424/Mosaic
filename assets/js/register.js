const loginBtn1=document.querySelector(".login-btn-1");
const logoutBtn=document.querySelector(".logout-btn");
const planOverlay=document.querySelector(".plan-overlay");

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

step1.classList.add("active");
step11.classList.remove("active");


// Step 1 

//Datepicker

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
let selectedYear=new Date().getFullYear();

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
  const yearToggle = datePicker.querySelector(".year-toggle");
  const yearDropdown = datePicker.querySelector(".year-dropdown");

  let today = new Date();
  let current = new Date(today);
  let selectedDate = null;

  const START_YEAR = Number(new Date().getFullYear())-200;
  const END_YEAR = Number(new Date().getFullYear())-3;

  yearDropdown.innerHTML = "";

  for (let y = START_YEAR; y <= END_YEAR; y++) {
    const div = document.createElement("div");
    div.className = "year-item";
    div.textContent = y;

    div.addEventListener("click", () => {
      current.setFullYear(y);
      selectedYear=Number(y);
      yearToggle.innerHTML = `${y} <img class="down-arrow" src="./assets/images/down-arrow.png" alt="down arrow">`;
      yearDropdown.classList.remove("active");
      const datePickerCalendar=datePicker.querySelector(".datepicker-calendar");
      datePickerCalendar.classList.remove("not-active");
      renderCalendar();
    });

    yearDropdown.appendChild(div);
  }

  yearToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    yearDropdown.classList.toggle("active");
    const datePickerCalendar=datePicker.querySelector(".datepicker-calendar");
    datePickerCalendar.classList.toggle("not-active");
  });

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]}`;
    yearToggle.innerHTML = `${year} <img class="down-arrow" src="./assets/images/down-arrow.png" alt="down arrow">`;
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

      if (
        d.date.toDateString() === today.toDateString() &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-date");
      }

      if (
        d.date.toDateString() === today.toDateString() &&
        selectedDate === null &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-day");
      }

      if (
        selectedDate &&
        d.date.toDateString() === selectedDate.toDateString() &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-day");
      }

      btn.addEventListener("click", () => {
        const allButtons = datesContainer.querySelectorAll(".date");
        selectedDate = d.date;

        allButtons.forEach(b => b.classList.remove("current-day"));
        btn.classList.add("current-day");

        getSelectedDate(datePicker);
        validDateInput(datePicker);
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

  // document.addEventListener("click", () => {
  //   yearDropdown.classList.remove("active");
  // });

  renderCalendar();
  setYearDropdownHeight(datePicker);
   
}

function setYearDropdownHeight(datePicker) {
  const calendar = datePicker.querySelector(".datepicker-calendar");
  const yearDropdown = datePicker.querySelector(".year-dropdown");

  if (calendar && yearDropdown) {
    yearDropdown.style.height = `${calendar.offsetHeight}px`;
  }
}

window.addEventListener("resize", () => {
  document.querySelectorAll(".datepicker").forEach(dp => {
    setYearDropdownHeight(dp);
  });
});


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
  const dp=document.querySelector(".datepicker.active");
    if (!dp) return;
    const trigger = dp._trigger;

    if (!trigger.contains(e.target) && !dp.contains(e.target)) {
      dp.classList.remove("active");
      dp.querySelector(".year-dropdown").classList.remove("active");
      dp.querySelector(".datepicker-calendar").classList.remove("not-active");
    }

});

//Validate detail form
const detailForm=step1.querySelector(".detail-form");
const detailInputs=detailForm.querySelectorAll("input");

function validateDetailForm(){
  let isValid = true;
  detailInputs.forEach((input) => {
    const value = input.value.trim().toLowerCase();
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
      errorElement.textContent = "Need one uppercase letter";
      return false;
  } else if (!/[0-9]/.test(passwordVal)) {
      formGroup.classList.add("error");
      errorElement.textContent = "Need 1 number";
      return false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
      formGroup.classList.add("error");
      errorElement.textContent = "Need  atleast one special character";
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
  
  if (cleaned.length > 10 && inputElement) {
    inputElement.value = cleaned.slice(0, 10);
    return false;
  }
  
  const digits = cleaned;

  if (!digits.length) {
    formGroup.classList.add("error");
    errorElement.textContent = "please enter the mobile number";
    return false;
  }

  if (digits.length < 10) {
    formGroup.classList.add("error");
    errorElement.textContent = "please enter the valid mobile number";
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
  selectedYear=Number(new Date().getFullYear())
  datepicker.querySelector(".year-toggle").innerHTML=`${new Date().getFullYear()} <img class="down-arrow" src="./assets/images/down-arrow.png" alt="down arrow">`
  dateText.childNodes[0].textContent="yyyy-mm-dd";
}
//Form submit function
let userData;
let verificationCode;
continue1Btn.addEventListener('click',async()=>{
  if (validateDetailForm()) {
    userData  = getdetailFormData();
    
    
    verificationCode=generateVerificationCode();
    const result = await sendVerificationEmail(userData.email, verificationCode);
    continue1Btn.removeAttribute("disabled");
    const toast=step1.querySelector(".toast-container");
    if (result.success) {
      userMail.value=userData.email;
      step1.classList.remove("active");
      step2.classList.add("active");
      delFormData();
    }
    else{
      showToast(
        toast,
        "error",
        "Failed to send verification email!"
      );
    }
   
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

back1Btn.addEventListener("click",()=>{
  window.location.href="./index.html"
  body.classList.add("not-active")
  planOverlay.classList.add("active");
})
//To Save all user data 
function saveCompleteUserData(userId, sectionName, sectionData) {
  const users = getRegisteredUsers();

  let user = users.find(u => u.userId === userId);

  if (!user) {
    user = {
      userId: userId, 
      email: sectionData.email, 
      personalDetails: {},
      artists: {},
      genres: [],
      profile: {},
      portfolio: {},
      personality: {},
      pickout: [],
      workstyle:{},
      publish: {},
      
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

function isEmailRegistered(emailVal) {
  const users = getRegisteredUsers();
  return users.some(
    user => user.email === emailVal
  );
}


//Step2 Email verification
const editEmailBtn=step2.querySelector(".edit-email-btn");
editEmailBtn.addEventListener('click',()=>{
  userMail.removeAttribute("readonly");
  userMail.focus();
})

const EMAILJS_CONFIG = {
  publicKey: 'caIP3a7BkCxjJ_Iqq',      
  serviceId: 'service_n7n2mwb',      
  templateId: 'template_n49deic'     
};

(function() {
  emailjs.init(EMAILJS_CONFIG.publicKey);
})();
const resendBtn = step2.querySelector('.resend-btn');
const codeInput= step2.querySelector('.verify-code');

// Generate & Store Verification Code
function generateVerificationCode() {
  return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Send Email via EmailJS
async function sendVerificationEmail(email, code) {
  const toast=step1.querySelector(".toast-container")

  const templateParams = {
    to_email: email,
    code: code
  };
  continue1Btn.setAttribute("disabled","true");
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );
    
    return { success: true };
  } catch (error) {
    showToast(toast, "error", "Failed to send verification code")
    return { success: false, error: error.text || error.message };
  }
}


// Verification Code Input 
let prevValue = '';

codeInput.addEventListener('input', () => {
  let codeVal = codeInput.value.replace(/\D/g, '');

  if (codeVal.length > 4) {
    codeInput.value = prevValue;
    return;
  }

  prevValue = codeVal;
  codeInput.value = codeVal;
  validateVerificationCode(codeVal)

});


// Resend Code 
resendBtn.addEventListener('click', async () => {
  userMail.setAttribute("readonly",true);
  userData.email=userMail.value;

  verificationCode= generateVerificationCode();

  const result = await sendVerificationEmail(userMail.value, verificationCode);
  const toast=step2.querySelector(".toast-container");
  if (result.success) {
    codeInput.value = '';
    errorElement.textContent="";
    showToast(toast,"success","New code sent!");
  } else {
    codeInput.value = '';
    errorElement.textContent="";
    showToast(toast,"error","Failed to send new code!");
  }
  
});

function validateVerificationCode(codeVal) {
  const verifyWrapper = step2.querySelector(".email-verify-wrapper");
  const error = verifyWrapper.querySelector(".error");
  error.textContent = ''; 
  if (codeVal==="") {
    error.textContent="please enter the code"
  }
  else if (codeVal.length <4) {
    error.textContent="please enter the valid code"
  }
  else if (codeVal.length === 4) {
   if (codeVal.toString() === verificationCode.toString()) {
      error.textContent = "";
      return true;
    }
    else {
      error.textContent = 'please enter the valid code';
      return false;
    }
  }


  return false;
}

continue2Btn.addEventListener('click', () => {
  const verifyWrapper=step2.querySelector(".email-verify-wrapper");
  const error=verifyWrapper.querySelector(".error");
  const codeVal=codeInput.value
  // if(codeVal==""){
  //   error.textContent="please enter the code";
  // }
  if (validateVerificationCode(codeVal)) {
    codeInput.value="";
    error.textContent="";
    
    let userId = sessionStorage.getItem("currentUserId");
    if (!userId) {
        userId = generateUserId();
        sessionStorage.setItem("currentUserId", userId);
    } else {
      userId = Number(userId);
    }
    saveCompleteUserData(userId, "personalDetails", userData);
    step2.classList.remove("active");
    step3.classList.add("active");
  } 
});

back2Btn.addEventListener('click',()=>{
  step2.classList.remove("active");
  step1.classList.add("active");
})

//Step 3 login

const loginBtn=step3.querySelector(".login-btn");

loginBtn.addEventListener("click",()=>{
  const userId=sessionStorage.getItem("currentUserId")

  const users = getRegisteredUsers();

  const user=users.find(user=>user.userId== userId);

  const loggedUser={
    "email":user.email,
    "password":user.personalDetails.password,
  }
  sessionStorage.setItem("loggedUser",JSON.stringify(loggedUser));
  step3.classList.remove("active");
  step4.classList.add("active");
});

//step 4
const artistInputs=step4.querySelectorAll("input[name='artist']");
const artistChipContainer=step4.querySelector(".artist-chip-container");
// const 
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
          renderGenreChips();
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



let selectedArtists={
  "artist":"",
  "selected":[]
};
function getSelectedArtists(){
  artistInputs.forEach(inp=>{
    if(inp.checked){
      selectedArtists.artist=inp.dataset.artist;
    }
  })

  artistChipContainer.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    artistChipContainer.querySelectorAll(".chip").forEach(chip => chip.classList.remove("active"));
    chip.classList.add("active");

    selectedArtists.selected = [...artistChipContainer.querySelectorAll(".chip")]
      .find(c => c.classList.contains("active"))?.textContent

  })
  });
}

getSelectedArtists();

continue3Btn.addEventListener("click",()=>{
  const error=step4.querySelector(".error");
  if(selectedArtists.selected.length==0){
    error.textContent="please select atleast one artist"
  }
  else if(selectedArtists.selected.length>0){

  error.textContent=""
  artistChipContainer.querySelectorAll(".chip").forEach(chip=>chip.classList.remove("active"))
  const userId = Number(sessionStorage.getItem("currentUserId"));
    saveCompleteUserData(userId, "artists", selectedArtists);
    step4.classList.remove("active");
    step5.classList.add("active");
  }
})

back3Btn.addEventListener('click',()=>{
  step4.classList.remove("active");
  step2.classList.add("active");
  
})
//Step 5 
const genreChipContainer=document.querySelector(".genre-chip-container")


const genreChips = {
  music: [
  "Pop","Hiphop","EDM","World","Jazz","Folk",
  "R & B","Blues","Country","Audio Engineer","Studio Musician","Musician","Classical","Rock" 
],

    dance: [
    "Ballet Dancer","Contemporary","Hip Hop","Kathak",
    "Bharatanatyam","Salsa","Jazz Dance","Folk Dance",
    "Choreographer","Freestyle","Breakdance","Kuchipudi"
  ],

  film: [
    "Actor","Director","Producer","Cinematographer",
    "Screenwriter","Editor","Playback Singer",
    "Stunt Artist","Art Director","Costume Designer",
    "Film Composer","Assistant Director"
  ]
};

let selectedGenres=[];

function renderGenreChips(){
  if(selectedArtists.artist){
    let selected=selectedArtists.artist;

    for(let key in genreChips){
      if(key == selected){
        genreChipContainer.innerHTML="";
        const genres=genreChips[key];
        genres.forEach(genre=>{
          genreChipContainer.innerHTML+=`<div class="chip">${genre}</div>`
        })
      }
    }
  }

}
renderGenreChips();

genreChipContainer.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  chip.classList.toggle("active");

  selectedGenres = [...genreChipContainer.querySelectorAll(".chip.active")]
    .map(c => c.textContent);

  console.log(selectedGenres);
});


continue4Btn.addEventListener("click",()=>{
  const error=step5.querySelector(".error");
  if(selectedGenres.length==0){
    error.textContent="please select atleast one genre"
  }
  else if(selectedGenres.length>0){
  error.textContent=""
  genreChipContainer.querySelectorAll(".chip").forEach(chip=>chip.classList.remove("active"));

  const userId = Number(sessionStorage.getItem("currentUserId"));
    saveCompleteUserData(userId, "genres", selectedGenres) ;
    step5.classList.remove("active");
    step6.classList.add("active");
  }
})

back4Btn.addEventListener('click',()=>{
  step5.classList.remove("active");
  step4.classList.add("active");
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
        errorElement.textContent = `please enter the ${inp.name}`;
        isValid = false;
      } else {
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

    errorElement.textContent = "Please upload photo";
    return false;
  }

  const validTypes = ["image/jpeg","image/png","image/webp"];

  if(!validTypes.includes(file.type)){

    errorElement.textContent = "please upload the valid file";
    input.value="";
    return false;
  }

  if(file.size > 2*1024*1024){
    errorElement.textContent = "Image must be below 2MB";
    input.value="";
    return false;
  }

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
    errorElement.textContent="";
    return true; 
  }

  const validTypes = [
    "application/pdf",
    // "application/msword",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if(!validTypes.includes(file.type)){

    errorElement.textContent="please upload the pdf file";
    input.value="";
    return false;
  }

  if(file.size > 5*1024*1024){
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

// function fileToBase64(file){
//   return new Promise((resolve,reject)=>{
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = ()=> resolve(reader.result);
//     reader.onerror = err => reject(err);
//   });
// }

async function getProfileData(){
  const data = {
    resume:{fileName:"",fileSize:""},
  };

  profieInputs.forEach(inp=>{
    if(inp.type !== "file"){
      data[inp.id] = inp.value.trim();
    }
  });

 
  const resumeInput = step6.querySelector("#resume");
  const resumeFile = resumeInput.files[0];

  if(resumeFile){
    data.resume.fileName=resumeFile.name;
    const sizeKB = (resumeFile.size / 1024).toFixed(1);
    data.resume.fileSize = `${sizeKB} KB`;

  }
  return data;
}

continue5Btn.addEventListener('click',async()=>{
  if (validateProfileInputs()) {

    const profileData=await getProfileData();
    const userId = Number(sessionStorage.getItem("currentUserId"));

    saveCompleteUserData(userId, "profile", profileData);
    delProfileInputData();

    step6.classList.remove("active");
    step7.classList.add("active")
  }
})

back5Btn.addEventListener('click',()=>{
  step6.classList.remove("active");
  step5.classList.add("active");
})


//Step 7

const linksWrapper = step7.querySelector(".portfolio-links");
const videoInput = step7.querySelector("#video");
const portfolioContainer = document.querySelector(".portfolio-links");
portfolioContainer.addEventListener("click", (e) => {

  if (e.target.closest(".add-link-btn")) {

    const inputs = portfolioContainer.querySelectorAll(".portfolio-input");
    const lastInput = inputs[inputs.length - 1];

    if (lastInput && lastInput.value.trim() === "") {
      lastInput.focus();
      return;
    }
    else  if (!urlRegex.test(lastInput.value)) {
      lastInput.focus();
      return;
    }

    const div = document.createElement("div");
    div.classList.add("portfolio-link");

    div.innerHTML = `
      <div class="input-container">
        <input type="url" name="portfolio-link[]" class="portfolio-input">
        <span class="remove-link">✖</span>
      </div>
      <p class="error"></p>
    `;

    portfolioContainer.appendChild(div);

    const newInput = div.querySelector(".portfolio-input");
    newInput.focus();
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

const MAX_SIZE = 20 * 1024 * 1024; 

videoInput.addEventListener("change", () => {
  const files = videoInput.files;

  videoError.textContent = "";

  if (!files.length) return;

  [...files].forEach(file => {

    if (!file.type.startsWith("video/")) {
      videoError.textContent = "please upload only video";
      return;
    }

    if (file.size > MAX_SIZE) {
      videoError.textContent = "Video size must be under 20MB";
      return;
    }

    const url = URL.createObjectURL(file);

    const wrapper = document.createElement("div");
    wrapper.classList.add("video-item");

    wrapper.innerHTML = `
      <video src="${url}" controls></video>
      <div class="video-info">
        <span class="name">${file.name}</span>
        <span class="size">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
        <span class="tooltip">${file.name}</span>
      </div>
      <button class="remove-video-btn">Remove</button>
    `;

    previewContainer.appendChild(wrapper);
    removeVideo();
   
  });
   function removeVideo(){
      const removeVideoBtns=step7.querySelectorAll(".remove-video-btn");
      removeVideoBtns.forEach(btn=>{
        btn.addEventListener("click",()=>{
          const videoItem=btn.parentElement;
          videoItem.remove();
        })
      })
    }

  videoInput.value = "";
});

function removePortfolioData(){
  previewContainer.innerHTML="";
  const portfolioLinks = portfolioContainer.querySelectorAll(".portfolio-link");

  portfolioLinks.forEach((link, index) => {
    if (index !== 0) {
      link.remove();
    }
    portfolioLinks[0].value="";
  });

  const errors=step7.querySelectorAll(".error");
  errors.forEach(err=>err.innerHTML="");
}



function validatePortfolioData(data) {
  const linksEmpty = !data || data.links.length==0;
  const videosEmpty = !data || data.videos.length==0;

  let hasError = false;

  const inputs = portfolioContainer.querySelectorAll(".portfolio-input");
    inputs.forEach(inp=>{
      if(inp.value===""){
        hasError=true;
        showError(inp,"please enter the link");
      }
      else  if (!urlRegex.test(inp.value)) {
        showError(inp, "please enter the valid link");
        hasError=true;
      }
      else{
        clearError(inp)
      }
  })


  if (videosEmpty) {
    hasError = true;
    if (videoError) {
      videoError.textContent = "Please upload the video";
    }
  }

  return hasError;
}



function getPortfolioData(){
  const data={};
  const links = [];
  document.querySelectorAll(".portfolio-input").forEach(input => {
    const value = input.value.trim();

    if (value !== "") {
      links.push(value);
    }
  });

  const videos = [];

  document.querySelectorAll(".video-item").forEach(item => {
    const name = item.querySelector(".name").textContent;
    const sizeText = item.querySelector(".size").textContent;

    videos.push({
      name: name,
      size: sizeText
    });
  });
  
    data.links=links;
    data.videos=videos;
    return data;
  
}

continue6Btn.addEventListener("click", () => {
  const portfolioData=getPortfolioData();

  if(validatePortfolioData(portfolioData)){
    return;
  }
  else{
    const userId = Number(sessionStorage.getItem("currentUserId"));
 
    saveCompleteUserData(userId, "portfolio", portfolioData);
    removePortfolioData();
  }
  step7.classList.remove("active");
  step8.classList.add("active");
})

back6Btn.addEventListener('click',()=>{
  step7.classList.remove("active");
  step6.classList.add("active");
})

//step 8
const checkboxes = step8.querySelectorAll('.form-group input[type="checkbox"]');
const error = step8.querySelector(".error");
const descInputs=step8.querySelectorAll(".desc-input");

checkboxes.forEach(cb => {
  cb.addEventListener("change", handleCheck);
});

function handleCheck() {
  const checked = step8.querySelectorAll('.form-group input[type="checkbox"]:checked');

  checked.forEach(cb => {
    const textInput = cb.closest(".input-wrapper").querySelector(".desc-input");
    textInput.classList.add("active");
  });

  if (checked.length >= 3) {
    checkboxes.forEach(cb => {
      if (!cb.checked) cb.disabled = true;
      error.textContent="";
    });
    continue7Btn.removeAttribute("disabled");
    continue7Btn.classList.remove("not-active");
  } else {
    checkboxes.forEach(cb => cb.disabled = false);
    descInputs.forEach(inp=>inp.classList.remove("active"));
    continue7Btn.classList.add("not-active");
    continue7Btn.setAttribute("disabled", true);
    error.textContent="Please select atleast 3 inputs"
  }
}

function validatePersonality(){
  const activeInputs = step8.querySelectorAll(".desc-input.active");
  let data = [];
  let isValid = false;

  activeInputs.forEach(input => {
    if (input.value.trim() === "") {
      isValid = true;
    } else {
      const labelText = input.closest(".input-wrapper")
        .querySelector("label").textContent;

      data.push({
        question: labelText,
        answer: input.value.trim()
      });
    }
  });

  if (isValid) {
    error.textContent = "Please fill the appropriate input fields";
  } else {
    checkboxes.forEach(cb =>{
      cb.disabled = false;
      cb.checked = false;  
    })
    descInputs.forEach(inp=>{
      inp.classList.remove("active");
      inp.value="";
    });
    continue7Btn.classList.add("not-active");
    continue7Btn.setAttribute("disabled", true);
    error.textContent = "";
  }

  return { isValid, data };
}


continue7Btn.addEventListener('click', () => {
  const result = validatePersonality();

  if (!result.isValid) {
    const userId = Number(sessionStorage.getItem("currentUserId"));
    saveCompleteUserData(userId, "personality", result.data);
    step8.classList.remove("active");
    step9.classList.add("active");
  }
});

back7Btn.addEventListener('click',()=>{
  step8.classList.remove("active");
  step7.classList.add("active");
})

//step 9 

const pickOutInputs=step9.querySelectorAll("input[type='range']");


continue8Btn.addEventListener('click', () => {
  const data=[];
  const userId = Number(sessionStorage.getItem("currentUserId"));

  pickOutInputs.forEach(inp=>data.push(Number(inp.value)))
  saveCompleteUserData(userId, "pickout", data);
  step9.classList.remove("active");
  step10.classList.add("active");

})

back8Btn.addEventListener('click',()=>{
  step9.classList.remove("active");
  step8.classList.add("active");
})

//step 10

const contactListItems=step10.querySelectorAll(".contact-list li");
const scheduleListitems=step10.querySelectorAll(".schedule-list li");
const goalChips=step10.querySelectorAll(".goals-container .chip");
const placeChips=step10.querySelectorAll(".place-container .chip");


contactListItems.forEach(li=>li.addEventListener('click',()=>{
  contactListItems.forEach(item=>item.classList.remove("active"));
  li.classList.add("active");
}));

scheduleListitems.forEach(li=>li.addEventListener('click',()=>{
  scheduleListitems.forEach(item=>item.classList.remove("active"));
  li.classList.add("active");
}));

goalChips.forEach(chip=>chip.addEventListener('click',()=>{
  chip.classList.toggle("active");
}));

placeChips.forEach(chip=>chip.addEventListener('click',()=>{
  placeChips.forEach(item=>item.classList.remove("active"));
  chip.classList.add("active");
}))

function isSelected(items) {
  return [...items].some(item => item.classList.contains("active"));
}


function validateWorkStyleData() {
  const error = step10.querySelector(".error");

  const isContactSelected = isSelected(contactListItems);
  const isScheduleSelected = isSelected(scheduleListitems);
  const isGoalSelected = isSelected(goalChips);
  const isPlaceSelected = isSelected(placeChips);

  if (!isContactSelected || !isScheduleSelected || !isGoalSelected || !isPlaceSelected) {
    error.textContent = "Please select one option from each category.";
    return false;
  }

  error.textContent = "";
  return true;
}

function getWorkStyleData() {
  return {
    contact: [...contactListItems]
    .find(li => li.classList.contains("active"))?.dataset.item || null,

    time: [...scheduleListitems]
    .find(li => li.classList.contains("active"))?.dataset.item || null,

    goal: [...goalChips]
    .filter(li => li.classList.contains("active"))
    .map(li=>li.textContent),

    place: [...placeChips]
    .find(li => li.classList.contains("active"))?.textContent || null
  };
}

function DelWorkStyleData(){
  const error=step10.querySelector(".error")
  contactListItems.forEach(item=>item.classList.remove("active"));
  scheduleListitems.forEach(item=>item.classList.remove("active"));
  goalChips.forEach(item=>item.classList.remove("active"));
  placeChips.forEach(item=>item.classList.remove("active"));
  error.textContent="";
}

continue9Btn.addEventListener('click', () => {
  if(validateWorkStyleData()){
    const data=getWorkStyleData();
    DelWorkStyleData();
    const userId = Number(sessionStorage.getItem("currentUserId"));
 
    saveCompleteUserData(userId, "workstyle", data);
    step10.classList.remove("active");
    step11.classList.add("active");
    }
})

back9Btn.addEventListener('click', () => {
  step10.classList.remove("active");
  step9.classList.add("active");
})

//step 11

const publishCards=step11.querySelectorAll(".publish-card");

publishCards.forEach(card=>card.addEventListener('click',()=>{
  // publishCards.forEach(card=>card.classList.remove("active"));
  card.classList.toggle("active");
  validatePublishData();
}));

function validatePublishData(){
  const error = step11.querySelector(".error");

  const isValid = isSelected(publishCards);

  if (!isValid) {
    error.textContent = "Please select one option from each category.";
  }
  else{
    error.textContent = "";
  }
  return isValid;
}

function getPublishData() {
  const data = [];

  const selected = [...publishCards]
    .find(card => card.classList.contains("active"))?.dataset.item;

  if (selected) {
    data.push(selected);
  }

  return data;
}


continue10Btn.addEventListener('click',()=>{
  if(validatePublishData()){
    const data=getPublishData();

    const userId = Number(sessionStorage.getItem("selectedId"));
    
    saveCompleteUserData(userId, "publish", data);
    sessionStorage.removeItem("selectedId");
    const users=getRegisteredUsers();
    const loggedUser=JSON.parse(sessionStorage.getItem("loggedUser"));
    const user=users.filter(user=>user.email==loggedUser.email);
    addData(user)
  
    window.location.href="./artist.html"
    loginBtn1.classList.add("not-active");
    logoutBtn.classList.remove("not-active");

  }
})

back10Btn.addEventListener('click',()=>{
  step11.classList.remove("active");
  step10.classList.add("active");
})

if(sessionStorage.getItem("selectedId")){
  sessionStorage.removeItem("selectedId")
}

function addData(user){
let artists=JSON.parse(sessionStorage.getItem("artists"));
const data={};

const birthYear=user.personalDetails["birth-date"].split("-")[0];
const userAge=new Date().getFullYear() - birthYear;
data.id=artists.length+1;
data.name=user.personalDetails.username;
data.category=user.artists.artist;
data.role=user.artists.selected;
data.videoCount=user.portfolio.videos.length;
data.city=user.personalDetails.place;
data.genres=user.genres;
data.age=Number(userAge.toString().padStart(2,"0"));
data.gender=Math.floor(Math.random()*2)==0?"Male":"Female",
data.pickOut=user.pickout;
data.contact=user.workstyle.contact;
data.time=user.workstyle.time;
data.goal=user.workstyle.goal;
data.work=user.workstyle.place;
data.description=user.profile.description;
data.personality=user.personality
data.resume=user.resume;

artists.push(data)
sessionStorage.setItem("artists",JSON.stringify(artists))

}

