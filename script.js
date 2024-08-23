
var todos = JSON.parse(localStorage.getItem("todos"));
var checkedArr = JSON.parse(localStorage.getItem("checkedArr"))
// console.log(checkedArr);


if (localStorage.getItem("todos") === null && localStorage.getItem("checkedArr") === null) {
    localStorage.setItem("todos", JSON.stringify(["Sample Note"]));
    var todos = JSON.parse(localStorage.getItem("todos"));
    // console.log(todos);

    localStorage.setItem("checkedArr", JSON.stringify([]));
    var checkedArr = JSON.parse(localStorage.getItem("checkedArr"));
    // console.log(checkedArr);

    render([todos, checkedArr]); //checkedArr

} else {
    render([todos, checkedArr])
}

function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("checkedArr", JSON.stringify(checkedArr));

    let retArr = JSON.parse(localStorage.getItem("todos"))
    let retArr2 = JSON.parse(localStorage.getItem("checkedArr"))
    return [retArr, retArr2];     /////// fuck you javascript
}

function newPopUp() {
    // get header
    let header = document.getElementsByClassName('header')[0];
    // get container
    let container = document.getElementsByClassName("container")[0];
    // get popUp
    let popUp = document.getElementsByClassName("pop-up")[0];

    // blur background
    header.setAttribute("class", "header blur");
    container.setAttribute("class", " container blur")

    // pop-up the card
    popUp.setAttribute("class", "pop-up display")
}

function closePopUp() {
    // get header
    let header = document.getElementsByClassName('header')[0];
    // get container
    let container = document.getElementsByClassName("container")[0];
    // get popUp
    let popUp = document.getElementsByClassName("pop-up")[0];

    popUp.setAttribute("class", "pop-up")
    header.setAttribute("class", "header");
    container.setAttribute("class", "container")

}

function apply() {

    let newTodo = document.getElementById("pop-up-input").value;
    if (newTodo === "") {
        alert("Input field empty!")
    } else {
        todos.push(newTodo);
        // console.log(todos);
        closePopUp()
        document.getElementById("pop-up-input").value = "" // resets the input value

        render(updateLocalStorage())
    }
}

function render(arrParam) {
    let arr = arrParam[0];
    let arr2 = arrParam[1];

    let val = document.getElementById("choose").value;
    // console.log(val);


    document.getElementsByClassName("container")[0].innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        let container = document.getElementsByClassName("container")[0];

        let todo = document.createElement("div");
        todo.setAttribute("class", "todo")


        let input = document.createElement("input");
        input.setAttribute("type", "checkbox")
        input.setAttribute("id", "todo" + i)

        if (val === "all") {
        input.setAttribute("onclick", `checkboxCheck(${i})`)
        }

        let label = document.createElement("label");
        label.setAttribute("for", "todo" + i)
        label.setAttribute("class", "todo-label")
        label.innerHTML = arr[i];

        todo.appendChild(input)
        todo.appendChild(input);
        todo.appendChild(label)


        let buttonsDiv = document.createElement("div");
        buttonsDiv.setAttribute("class", "buttons")


        let span = document.createElement("span");


        if (val === "all") {     ///// FML
            span.innerHTML = "&#9998";
            span.setAttribute("class", "edit-icon");
            span.setAttribute("onclick", `editTodo(${i})`);
        }


        let span2 = document.createElement("span")


        if (val === "all") {      ///// FML
            span2.innerHTML = "&#128465";
            span2.setAttribute("class", "delete-icon");
            span2.setAttribute("onclick", `deleteTodo(${i})`);
        }

        buttonsDiv.appendChild(span);
        buttonsDiv.appendChild(span2);

        todo.appendChild(buttonsDiv);

        container.appendChild(todo)

    }

    for (let i = 0; i < arr2.length; i++) {
        // console.log(arr2);

        let checkbox = document.getElementById("todo" + arr2[i]);
        let text = checkbox.parentElement;
        text.setAttribute("class", "todo completed")
        checkbox.checked = true;
    }
    // console.log(checkedArr);




}

function deleteTodo(id) {
    todos.splice(id, 1);
    for (let i = 0; i < checkedArr.length; i++) {
        if (checkedArr[i] === id) {
            checkedArr.sort()
            checkedArr = checkedArr.filter(i => i !== id);
        }
        if (checkedArr[i] > id) {
            checkedArr[i]--
        }
    }
    render(updateLocalStorage())
}


// FUNCTIONS FOR FOR EDITING TODO

function editTodo(id) {
    // get header
    let header = document.getElementsByClassName('header')[0];
    // get container
    let container = document.getElementsByClassName("container")[0];
    // get popUp
    let editUp = document.getElementsByClassName("pop-up")[1];

    // blur background
    header.setAttribute("class", "header blur");
    container.setAttribute("class", " container blur")

    // pop-up the card
    editUp.setAttribute("class", "pop-up display")
    // console.log("Before:" + todos);  ///////

    let editInput = document.getElementById("edit-todo-input");
    editInput.value = todos[id];

    todos[id] = "";
}

function closeEditUp() {
    // get header
    let header = document.getElementsByClassName('header')[0];
    // get container
    let container = document.getElementsByClassName("container")[0];
    // get popUp
    let editUp = document.getElementsByClassName("pop-up")[1];

    editUp.setAttribute("class", "pop-up")
    header.setAttribute("class", "header");
    container.setAttribute("class", "container")
}

function updateEdit() {
    // console.log("hi there!");

    let editInput = document.getElementById("edit-todo-input");
    // console.log(editInput.value);


    if (editInput.value === "") {
        alert("Don't leave the todo empty, big Dawg")
    } else {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i] === "") { todos[i] = editInput.value; }
        }
        // console.log(todos);

        render(updateLocalStorage())

        closeEditUp()
    }




}

// FUNCTION TO STRIKETHROUGH TODO
function checkboxCheck(id) {
    let checkbox = document.getElementById("todo" + id);
    // console.log("here");

    let text = checkbox.parentElement;
    // console.log(text);

    if (checkbox.checked) {
        text.setAttribute("class", "todo completed")

        checkedArr.push(id);
        // console.log(checkedArr);

        updateLocalStorage();

    } else {
        text.setAttribute("class", "todo")

        checkedArr = checkedArr.filter(i => i !== id);
        console.log(checkedArr);
        updateLocalStorage();

    }



}

// FUNCTION TO FILTER TODOS

let filterInput = document.getElementById("filterInput");

filterInput.addEventListener('keyup', getTodos);

function getTodos() {
    let filterValue = document.getElementById("filterInput").value.toUpperCase();

    newArr = [];
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].toUpperCase().includes(filterValue)) {
            newArr.push(todos[i]);
            // console.log(newArr);            
            // render([newArr, []]);
            if (newArr.length !== todos.length) {
                render([newArr, []])
            }
            else {
                // console.log("herhehrher");
                render([newArr, checkedArr]);
            }
        }
    }
}


// FUNCTION TO SWITCH THEMES
function switchThemes(num) {
    let a = document.querySelector("*");
    let elem = document.querySelector(".mainbar>input");
    let itsTooLate = document.querySelector(".todo-label");
    let switchThemeBtn = document.querySelector(".switch-theme-btn");
    let currentTheme = document.body.className;

    if (currentTheme === "light-theme") {
        // console.log(a.style[1]);

        a.setAttribute("style", "background-color: rgb(20, 20, 20);color: white");

        elem.setAttribute("style", "background-image: url('dark-search.png'); background-color: rgb(12, 12, 12); color: white")


        itsTooLate.setAttribute("style", "text-decoration-color: #6C63FF; text-decoration-thickness: 2px;")


        switchThemeBtn.setAttribute("src", "sun.svg");
        switchThemeBtn.setAttribute("style", "padding: 1%, 1%, 1%, 0%")
        document.body.className = "dark-theme"
        // num++;
    }
    else {
        // console.log("herherehrehrehr");

        a.removeAttribute("style", "background-color: rgb(12, 12, 12);color: white");

        elem.removeAttribute("style", "background-image: url('dark-search.png'); background-color: rgb(12, 12, 12); color: white")


        itsTooLate.removeAttribute("style", "text-decoration-color: #6C63FF; text-decoration-thickness: 2px;")


        switchThemeBtn.removeAttribute("src", "sun.svg");
        switchThemeBtn.setAttribute("src", "moon.svg")
        switchThemeBtn.removeAttribute("style", "padding: 27% 26% 27% 30%;")
        document.body.className = "light-theme"
    }

}

// FUNCTION TO RENDER ALL/COMPLETED/INCOMPLETED TODOS
function showCompletedTodos() {
    let val = document.getElementById("choose").value;

    if (val === "all") {
        // console.log("show all todos");
        render([todos, checkedArr])
    }
    if (val === "complete") {
        // console.log("show complete todos");
        let newArr = [];
        let newCheckedArr = []
        for (let i = 0; i < checkedArr.length; i++) {
            newArr.push(todos[checkedArr[i]]);
            newCheckedArr.push(i)
        }
        // console.log(todos, newArr, checkedArr);

        render([newArr, newCheckedArr])
    }
    if (val === "incomplete") {
        // console.log("show incomplete todos");
        let tempArr = [];

        for (let i = 0; i < checkedArr.length; i++) {
            tempArr.push(todos[checkedArr[i]]);
        }
        let incompleteArr = todos.filter(elem => !tempArr.includes(elem));

        render([incompleteArr, []])
    }
}



