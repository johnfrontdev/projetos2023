function addTask() {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let taskName = document.getElementById("task").value;
    if (taskName !== "") {
      taskList.push({ name: taskName, completed: false });
      localStorage.setItem("taskList", JSON.stringify(taskList));
      renderTaskList();
      document.getElementById("task").value = "";
    }
  }
  
  function deleteTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTaskList();
  }
  
  function editTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    let taskElement = document.getElementById(`task-${index}`);
    let taskNameElement = taskElement.querySelector(".taskName");
    let taskButtonsElement = taskElement.querySelector(".taskButtons");
    let taskName = taskNameElement.textContent;
    let editBox = document.createElement("input");
    editBox.type = "text";
    editBox.value = taskName;
    editBox.classList.add("editBox");
    taskNameElement.replaceWith(editBox);
    taskButtonsElement.innerHTML = `
      <button class="taskSave" onclick="saveTask(${index})">Salvar</button>
      <button class="taskCancel" onclick="cancelEditTask(${index})">Cancelar</button>
    `;
    editBox.focus();
  }
  
  function saveTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    let taskElement = document.getElementById(`task-${index}`);
    let editBox = taskElement.querySelector(".editBox");
    let taskName = editBox.value.trim();
    if (taskName !== "") {
      taskList[index].name = taskName;
      localStorage.setItem("taskList", JSON.stringify(taskList));
      renderTaskList();
    }
  }
  
  function cancelEditTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    renderTaskList();
  }
  
  function completeTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList[index].completed = true;
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTaskList();
  }
  
  function renderTaskList() {
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let taskListElement = document.getElementById("taskList");
    let completedTaskListElement = document.getElementById("completedTaskList");
    taskListElement.innerHTML = "";
    completedTaskListElement.innerHTML = "";
    for (let i = 0; i < taskList.length; i++) {
      let task = taskList[i];
      let taskElement = document.createElement("li");
      taskElement.id = `task-${i}`;
      taskElement.innerHTML = `
        <span class="taskName ${task.completed ? "completed" : ""}">${task.name}</span>
        <div class="taskButtons">
          <button class="taskEdit" onclick="editTask(${i})">Editar</button>
          <button class="taskDelete" onclick="deleteTask(${i})">Excluir</button>
          <button class="taskComplete" onclick="completeTask(${i})">Concluir</button>
        </div>
      `;
      if (task.completed) {
        completedTaskListElement.appendChild(taskElement);
      } else {
        taskListElement.appendChild(taskElement);
      }
    }
  }
  
  renderTaskList();