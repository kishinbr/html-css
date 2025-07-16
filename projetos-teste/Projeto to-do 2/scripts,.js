// funcao que adiciona a tarefa
function addTask(){

    //titulo da tarefa
    const taskTitle = document.querySelector("#task-title").value;

    if(taskTitle){
        // clona o template
        const template = document.querySelector(".template");

        const newTask = template.cloneNode(true);

        // adciona titulo

        newTask.querySelector(".task-title").textContent = taskTitle;

        // remover as classes

        newTask.classList.remove("template");
        newTask.classList.remove("hide");

        //adicionar a tarefa na lista

        const list = document.querySelector("#task-list");

        list.appendChild(newTask);

        //adiconar evento de remover

        const removeBtn = newTask.querySelector(".remove-btn");
        removeBtn.addEventListener("click", function () {
            removeTask(this);
        });

        const doneBtn = newTask.querySelector(".done-btn");
        doneBtn.addEventListener("click", function () {
            completeTask(this);
        });

        // limpar
        document.querySelector("#task-title").value = "";
    }

}
//funcao de remover tarefa
function removeTask(task){
    task.parentNode.remove(true);
}
// funcao para completar tarefa
function completeTask(task){

    const taskToComplete = task.parentNode;

    taskToComplete.classList.toggle("done");

};


//evento de adicionar a tarefa
const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click",function(e){

    e.preventDefault();

    addTask();
})