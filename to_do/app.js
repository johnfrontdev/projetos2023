/**
 * Adiciona uma nova tarefa à lista de tarefas.
 * Obtém o nome da tarefa a partir do valor do campo de entrada de texto.
 * Cria um objeto de tarefa com o nome e a propriedade "completed" definida como false.
 * Adiciona o objeto de tarefa à lista de tarefas armazenada no localStorage.
 * Chama a função renderTaskList() para atualizar a lista de tarefas na página.
 * Limpa o campo de entrada de texto.
 */
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

  /**
 * Remove uma tarefa da lista de tarefas.
 * Recebe o índice da tarefa a ser removida como parâmetro.
 * Obtém a lista de tarefas armazenada no localStorage.
 * Remove a tarefa correspondente da lista de tarefas.
 * Atualiza a lista de tarefas armazenada no localStorage.
 * Chama a função renderTaskList() para atualizar a lista de tarefas na página.
 */
  
  function deleteTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTaskList();
  }
  
  /**
 * Edita o nome de uma tarefa na lista de tarefas.
 * Recebe o índice da tarefa a ser editada como parâmetro.
 * Obtém a lista de tarefas armazenada no localStorage.
 * Obtém o elemento HTML da tarefa correspondente na página.
 * Obtém o elemento HTML que exibe o nome da tarefa.
 * Obtém o valor atual do nome da tarefa.
 * Cria uma caixa de texto com o valor atual do nome da tarefa.
 * Substitui o elemento HTML que exibe o nome da tarefa pela caixa de texto.
 * Adiciona botões "Salvar" e "Cancelar" à lista de botões da tarefa.
 * Define o foco na caixa de texto.
 */

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

  /**
 * Salva as alterações feitas no nome de uma tarefa na lista de tarefas.
 * Recebe o índice da tarefa a ser salva como parâmetro.
 * Obtém a lista de tarefas armazenada no localStorage.
 * Obtém o elemento HTML da tarefa correspondente na página.
 * Obtém a caixa de texto que contém o novo nome da tarefa.
 * Obtém o novo nome da tarefa a partir do valor da caixa de texto.
 * Verifica se o novo nome da tarefa não está vazio.
 * Atualiza o nome da tarefa correspondente na lista de tarefas.
 * Atualiza a lista de tarefas armazenada no localStorage.
 * Chama a função renderTaskList() para atualizar a lista de tarefas na página.
 */
  
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
  

  /**
 * Cancela a edição do nome de uma tarefa na lista de tarefas.
 * Recebe o índice da tarefa a ser cancelada como parâmetro.
 * Obtém a lista de tarefas armazenada no localStorage.
 * Chama a função renderTaskList() para atualizar a lista de tarefas na página sem salvar as alterações.
*/

  function cancelEditTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    renderTaskList();
  }
  

  /**

Marca uma tarefa como concluída na lista de tarefas.
Recebe o índice da tarefa a ser concluída como parâmetro.
Obtém a lista de tarefas armazenada no localStorage.
Define a propriedade "completed" da tarefa correspondente como true.
Atualiza a lista de tarefas armazenada no localStorage.
Chama a função renderTaskList() para atualizar a lista de tarefas na página.
.*/

  function completeTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList[index].completed = true;
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTaskList();
  }
  

  /**

Renderiza a lista de tarefas na página.
Obtém a lista de tarefas armazenada no localStorage.

Obtém os elementos HTML para a lista de tarefas pendentes e concluídas.

Limpa o conteúdo dos elementos HTML para a lista de tarefas pendentes e concluídas.

Para cada tarefa na lista de tarefas, cria um elemento HTML correspondente.

Adiciona o elemento HTML à lista de tarefas pendentes ou concluídas, dependendo do valor da propriedade "completed".
*/
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
          ${task.completed ? "" : `<button class="taskComplete" onclick="completeTask(${i})">Concluir</button>`}
        </div>
      `;
      if (task.completed) {
        completedTaskListElement.appendChild(taskElement);
      } else {
        taskListElement.appendChild(taskElement);
      }
    }
  }
  
  // Chama a função renderTaskList() para renderizar a lista de tarefas na página quando a página é carregada.
  renderTaskList();

