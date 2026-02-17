const projectForm=document.querySelector(".project-form");
const formInputs=projectForm.querySelectorAll("input,textarea");
const chipContainer=projectForm.querySelector(".chip-container");
const skillGroup=projectForm.querySelector(".skill-group");
const postProjectBtn=document.querySelector(".post-project-btn");

const flyerInput = projectForm.querySelector("#flyer");
const flyerPreview = projectForm.querySelector(".img-wrapper .add-img");
const flyerText = projectForm.querySelector(".flyer-text");
const imgWrapper = projectForm.querySelector(".img-wrapper");


let activeSkills=[];
chipContainer.querySelectorAll(".chip").forEach(chip=>{
    chip.addEventListener("click",()=>{
        chip.classList.toggle("active");
        addActiveChips()
        validateProjectForm();
    })
})

function addActiveChips(){
    chipContainer.querySelectorAll(".chip").forEach(chip=>{
        if(chip.classList.contains("active")){
            activeSkills.push(chip.textContent)
        }
    })
}



postProjectBtn.addEventListener('click',(e)=>{
    e.preventDefault();
  
    if(validateProjectForm()){
       const data=getFormData()
       console.log(data)
       addProject(data)
        
    }
    else{
        console.log("failed")
    }
})

formInputs.forEach(inp => {
  inp.addEventListener('input', () => {
    validateProjectForm();
  });

  if (inp.name === "budget") {

    inp.addEventListener("input", () => {
        inp.value = inp.value.replace(/[^\d]/g, "");
    });

  }

})

flyerInput.addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;

  const formGroup = flyerInput.closest(".form-group");
  const errorElement = formGroup.querySelector(".error");

  if(!validateFlyer(flyerInput, errorElement)) return;

  const url = URL.createObjectURL(file);
  flyerPreview.src = url;

  formGroup.classList.add("uploaded")
  imgWrapper.classList.add("active");
  flyerPreview.classList.add("active");
  flyerText.classList.add("not-active"); 
});

function validateFlyer(input, errorElement){
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

  if(file.size > 5*1024*1024){
    errorElement.textContent = "Image must be below 5MB";
    input.value="";
    return false;
  }

  errorElement.textContent="";
  return true;
}

function resetFlyerInput(){
    const flyerGroup=document.querySelector(".flyer-group")
    flyerGroup.classList.remove("uploaded")
    imgWrapper.classList.remove("active");
    flyerPreview.classList.remove("active");
    flyerPreview.src="./assets/images/add.webp";
    flyerText.classList.remove("not-active"); 
}

function validateProjectForm(){
  let isValid = true;
  formInputs.forEach((input) => {
    const value = input.value.trim().toLowerCase();
    const formGroup = input.closest(".form-group");
    const errorElement = formGroup.querySelector(".error");
    if(input.type === "file"){
        if(value==""){
            formGroup.classList.add("error");
            errorElement.textContent = `please add the flyer`;
        }
        
        
    }
    else if (value === "") {
        isValid = false;
        formGroup.classList.add("error");
        errorElement.textContent = `please enter the ${input.name}`;
    }
    

    else {
        formGroup.classList.remove("error");
        errorElement.textContent = "";
      }
  })
  if(activeSkills.length==0){
    isValid = false;
    skillGroup.classList.add("error");
    const errorElement=skillGroup.querySelector(".error")
    errorElement.textContent = `please select the appropriate skills`;
  }
  else if(activeSkills.length>0){
    isValid = true;
    skillGroup.classList.remove("error");
    const errorElement=skillGroup.querySelector(".error")
    errorElement.textContent ="";
  }

    return isValid;
};

function getFormData(){
    const data={};
    formInputs.forEach(inp=>{
        data[inp.name === "location" ? "city" : inp.name] = inp.value;
    })
    data["skills"]=activeSkills;
    const dateTime=data["date-time"].split(" ")
    const date=dateTime[0]
 
    const time=`${dateTime[1]} ${dateTime[2]}`
    
    data["date"]=date;
    data["time"]=time;
    delete(data["date-time"])
    return data;

}


function addProject(data){
    const projects=sessionStorage.getItem("projects")
}