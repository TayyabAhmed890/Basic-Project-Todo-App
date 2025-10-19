// select dom element

const input = document.getElementById("todo-input")
const addbtn = document.getElementById("add-btn")
const list = document.getElementById("todo-list")

// try to load todos in local storage

const saved = localStorage.getItem("todos");
const todos = saved? JSON.parse(saved) : [];

// write functions

function saveTodos(){
    // save todos in localstorage
    localStorage.setItem("todos",JSON.stringify(todos))
}
// Create a DOM node for a todo object and append it to the list
function CreateTodoNote(todo,index){

    // checkbox to toggle completion

    const li = document.createElement("li");
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change",()=>{
        todo.completed = checkbox.checked

        // TODO: Visual feedback: strike-through when completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    })

    // Text of the todo

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";
    if(todo.completed){
        textSpan.style.textDecoration = "line-through"
    }
    // Add double-click event listener to edit todo
    textSpan.addEventListener("dblclick",()=>{
        const newText = prompt("Edit Todo",todo.text);
        if(newText !== null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    // Delete Todo Button
    const delBtn = document.createElement("button")
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click",()=>{
        todos.splice(index,1);
        Render();
        saveTodos();
    }) 

    li.appendChild(checkbox)
    li.appendChild(textSpan)
    li.appendChild(delBtn)
    return li;
}

// Render the whole todo list from todos array
function Render(){
    list.innerHTML = '';

    if (todos.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No Todos yet!";
    emptyMsg.classList.add("empty-message");

    // hide the todo list container and show only the message
    list.style.display = "none";
    list.parentNode.appendChild(emptyMsg);
    return;
  }

  // if todos exist, ensure list is visible and remove any old message
  list.style.display = "block";
  const oldMsg = document.querySelector(".empty-message");
  if (oldMsg) oldMsg.remove();

    todos.forEach((todo,index) => {
        const node = CreateTodoNote(todo,index);
        list.appendChild(node)
    });
}


function addTodo(){
    const text = input.value.trim();
    if(!text){
        return
    }
    
    // Push a new todo object
    todos.push({text,completed:false});
    input.value = "";
    Render();
    saveTodos();
}

addbtn.addEventListener("click",addTodo)
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})
Render();

