import {
    elTodosTemplate,
    elTodosParent,
    eltodoForm,
} from "./html-selection";

const darkBtn = document.getElementById("todoDark");
darkBtn.addEventListener("click", () => {
    const element = document.documentElement.classList.toggle("dark");
    if (element) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

document.documentElement.classList.toggle(localStorage.getItem("theme"));

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let editId = undefined;

const printTodos = () => {
    elTodosParent.innerHTML = "";
    todoList.forEach((todo) => {
        const element = elTodosTemplate.content.cloneNode(true);
        element.getElementById("todoTitle").textContent = todo.name;
        element.getElementById("todoBody").textContent = todo.body;

        element.querySelector(".card").dataset.id = todo.id;
        element.querySelector("#todoTahrir").dataset.id = todo.id;
        element.querySelector("#todoCheckbox").checked = todo.completed;

        const todoBodyEL = element.getElementById("todoBody");
        if (todo.completed) {
            todoBodyEL.classList.add("line-through", "opacity-70");
        }

        element.getElementById("todoCheckbox").onchange = (e) => {
            todo.completed = e.target.checked;
            if (todo.completed) {
                todoBodyEL.classList.add("line-through", "opacity-70");
            } else {
                todoBodyEL.classList.remove("line-through", "opacity-70");
            }
            localStorage.setItem("todoList", JSON.stringify(todoList));
        };

        element.getElementById("todoDelete").onclick = () => {
            todoList = todoList.filter((t) => t.id !== todo.id);
            printTodos();
            localStorage.setItem("todoList", JSON.stringify(todoList));
        };

        element.getElementById("todoTahrir").onclick = (e) => {
            editId = e.target.dataset.id;
            const todoToEdit = todoList.find((t) => String(t.id) === editId);
            document.querySelector('input[name="todoName"]').value =
                todoToEdit.name;
            document.querySelector('textarea[name="todoBody"]').value =
                todoToEdit.body;
            document.querySelector('button[name="todoSubmit"]').textContent =
                "Yangilash";
            localStorage.setItem("todoList", JSON.stringify(todoList));
        };

        elTodosParent.appendChild(element);
    });
};

document.addEventListener("DOMContentLoaded", printTodos);

eltodoForm.onsubmit = function (e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const todoName = data.get("todoName");
    const todoBody = data.get("todoBody");

    if (editId == false) {
        const newTodo = {
            id: Date.now(),
            name: todoName,
            body: todoBody,
            completed: false,
        };

        todoList.push(newTodo);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        printTodos();
    } else {
        const todo = todoList.find((t) => t.id === Number(editId));
        if (todo) {
            todo.name = todoName;
            todo.body = todoBody;
            localStorage.setItem("todoList", JSON.stringify(todoList));

            document.querySelectorAll(".card").forEach((c) => {
                if (parseInt(c.dataset.id) === todo.id) {
                    c.querySelector("#todoTitle").textContent = todo.name;
                    c.querySelector("#todoBody").textContent = todo.body;
                }
            });

            editId = false;
            document.querySelector('button[name="todoSubmit"]').textContent =
                "Jonatish";
        }
    }

    e.target.reset();
};