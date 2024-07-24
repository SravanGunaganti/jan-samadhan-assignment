document.addEventListener('DOMContentLoaded', () => {
    let todoItemsContainer = document.getElementById("todoItemsContainer");
    let addTodoButton = document.getElementById("addTodoButton");
    let saveTodoButton = document.getElementById("saveTodoButton");

    function getTodoListFromLocalStorage() {
        let stringifiedTodoList = localStorage.getItem("todoList");
        let parsedTodoList = JSON.parse(stringifiedTodoList);
        if (parsedTodoList === null) {
            return [];
        } else {
            return parsedTodoList;
        }
    }

    let todoList = getTodoListFromLocalStorage();
    let todosCount = todoList.length;

    saveTodoButton.onclick = function() {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };







    function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);

        let deleteElementIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        todoList.splice(deleteElementIndex, 1);
    }

    function createAndAppendTodo(todo) {
        let todoId = "todo" + todo.uniqueNo;

        let todoElement = document.createElement("li");
        todoElement.classList.add("todo-item");
        let todoTitle = document.createElement("h2");
        todoTitle.classList.add("todo-title")
        todoTitle.textContent= todo.text;
        todoElement.appendChild(todoTitle);
        todoElement.id = todoId;
        let deleteBtn = document.createElement("button")
        deleteBtn.textContent="Delete";
        deleteBtn.classList.add("del-button")
        deleteBtn.onclick = function() {
            onDeleteTodo(todoId);
        };
        todoElement.appendChild(deleteBtn)
        todoItemsContainer.appendChild(todoElement);
        
    }

    function onAddTodo() {
        let userInputElement = document.getElementById("todoUserInput");
        let userInputValue = userInputElement.value;

        if (userInputValue === "") {
            alert("Enter Valid Text");
            return;
        }

        todosCount = todosCount + 1;

        let newTodo = {
            text: userInputValue,
            uniqueNo: todosCount,
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
    }
    addTodoButton.onclick = function() {
        onAddTodo();
    };
    for (let todo of todoList) {
        createAndAppendTodo(todo);
    }
});
