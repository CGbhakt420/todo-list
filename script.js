const inputBox = document.querySelector("#input-box");
const listcContainer = document.querySelector("#list-container");

function addTask(){
    if(inputBox.value === '') alert("You must write something");
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listcContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
}


listcContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
},false);