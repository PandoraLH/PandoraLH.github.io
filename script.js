//To do lists
const InputBox = document.querySelector(".InputField input");
const addBtn = document.querySelector(".InputField button");
const todoList = document.querySelector(".todoList")
const deleteAll = document.querySelector(".footer button")


InputBox.onkeyup = ()=>{
    let userData = InputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active");
    }
}

addBtn.onclick =()=>{
    let userData = InputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask();
}

showTask();


function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length;
    if(listArr.length > 0 ){
        deleteAll.classList.add("active");
    }else{
        deleteAll.classList.remove("active");

    }
    let newLiTag = '';

    listArr.forEach((element, index) => { 
        newLiTag += `<li> ${element}<span onclick = "deleteTask(${index})"><i class ="fas fa-trash"></i></span> </li>`;
    });
    todoList.innerHTML  = newLiTag;
    InputBox.value = '';

}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);  
    listArr.splice(index,1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask()
}

deleteAll.onclick = ()=>{
    listArr = [];
    
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask();
}


// Clock

const InputTime = document.querySelector(".InputTimer input");
const reset = document.querySelector(".timer__btn--reset");
const ok = document.querySelector(".InputTimer button")
const play = document.querySelector(".timer__btn--control")
const countdownEl = document.getElementById('countdown');

InputTime.onkeyup = ()=>{
  let getMinutes = InputTime.value;
  if(getMinutes.trim() > 0){
      ok.classList.add("active");
  }
  else{
      ok.classList.remove("active");
  }
}

let time = 0;
interval = null;

ok.onclick =()=>{
    let getMinutes = InputTime.value;
    getMinutes = parseInt(getMinutes,10);
    stop();
    time = getMinutes * 60;
    updateInterfaceTime();
    
}
play.onclick =()=>{
    if(interval == null){
        start();
    }
    else{
        stop();
    }
}


reset.onclick =()=>{
    stop();
    time =0;
    countdownEl.innerHTML = `${0}:${0}${0}`;
}

function updateInterfaceTime(){
    const minutes = Math.floor(time/60);
    let seconds = time%60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
}

function updateInterfaceControls(){
    if(interval === null){
        play.innerHTML = `<i class="fa-solid fa-play"></i>`;
        play.classList.add("timer__btn--start");
        play.classList.remove("timer__btn--stop");
    }
    else{
        play.innerHTML = `<i class="fa-solid fa-stop"></i>`;
        play.classList.add("timer__btn--stop");
        play.classList.remove("timer__btn--start");
    }
}


function start(){

    if(time === 0) return;
    
    interval = setInterval(()=>{
        time--;
        updateInterfaceTime();

        if(time === 0){
            stop();
        }
    },1000);
    updateInterfaceControls();
}

function stop(){
    clearInterval(interval);
    interval = null;
    updateInterfaceControls();
}

