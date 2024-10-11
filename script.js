const inputBox = document.querySelector("#input-box");
const descriptionBox = document.querySelector("#description-box");
const dueDateBox = document.querySelector("#due-date");
const priorityBox = document.querySelector("#priority");
const notesBox = document.querySelector("#notes-box");
const listContainer = document.querySelector("#list-container");
const projectSelect = document.querySelector("#project-select");

let projects = {};  // Store projects and their tasks
let currentProject = "Default Project";

// Load projects from localStorage or initialize with default project
function loadProjects() {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    } else {
        projects[currentProject] = [];
        saveProjects();
    }
    populateProjectDropdown();
}

// Save projects to localStorage
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

// Populate project dropdown
function populateProjectDropdown() {
    projectSelect.innerHTML = '';
    for (let project in projects) {
        const option = document.createElement("option");
        option.text = project;
        option.value = project;
        projectSelect.appendChild(option);
    }
    projectSelect.value = currentProject;
}

// Add new project
function addProject() {
    const projectName = document.querySelector("#project-name").value;
    if (projectName === '') return alert("Please enter a project name.");
    if (!projects[projectName]) {
        projects[projectName] = [];
        const option = document.createElement("option");
        option.text = projectName;
        option.value = projectName;
        projectSelect.appendChild(option);
        saveProjects();
    }
    document.querySelector("#project-name").value = '';
}

// Switch project
function switchProject() {
    currentProject = projectSelect.value;
    renderTasks();
}

// Add new task
function addTask() {
    if (inputBox.value === '') return alert("You must write something");
    
    const task = {
        title: inputBox.value,
        description: descriptionBox.value,
        dueDate: dueDateBox.value,
        priority: priorityBox.value,
        notes: notesBox.value,
        checked: false
    };

    projects[currentProject].push(task);
    saveProjects();
    clearForm();
    renderTasks();
}

// Clear form inputs
function clearForm() {
    inputBox.value = '';
    descriptionBox.value = '';
    dueDateBox.value = '';
    priorityBox.value = 'low';
    notesBox.value = '';
}

// Render tasks in the current project
function renderTasks() {
    listContainer.innerHTML = ''; // Clear the list
    projects[currentProject].forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong> 
            <br>Description: ${task.description} 
            <br>Due: ${task.dueDate} 
            <br>Priority: ${task.priority} 
            <br>Notes: ${task.notes}`;
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        // Toggle task complete/incomplete
        li.onclick = function () {
            li.classList.toggle("checked");
            task.checked = !task.checked;
            saveProjects();
        };
        
        // Remove task on close button click
        span.onclick = function (e) {
            e.stopPropagation();
            projects[currentProject].splice(index, 1);
            saveProjects();
            renderTasks();
        };

        if (task.checked) {
            li.classList.add("checked");
        }

        listContainer.appendChild(li);
    });
}

// Load projects and tasks on page load
window.onload = function() {
    loadProjects();
    renderTasks();
};
