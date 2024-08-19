// function hello() {
//     console.log("hello, please switch themes")
// }

// if(localStorage.getItem("todos") === null){}

var todos = JSON.parse(localStorage.getItem("todos"));
if(localStorage.getItem("todos") === null){
    localStorage.setItem("todos", JSON.stringify(["Sample Note"]));
    var todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    
    render(todos);
} else{
    render(todos)
}

function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos))
    let retArr = JSON.parse(localStorage.getItem("todos"))
    return retArr;
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
        alert("To do to daal bhyii")
    } else {
        todos.push(newTodo);
        // console.log(todos);
        closePopUp()
        document.getElementById("pop-up-input").value = "" // resets the input value

        render(updateLocalStorage())
    }
}

function render(arr) {
    document.getElementsByClassName("container")[0].innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        let container = document.getElementsByClassName("container")[0];

        let todo = document.createElement("div");
        todo.setAttribute("class", "todo")

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox")
        input.setAttribute("id", "todo" + i)
        input.setAttribute("onclick", `checkboxCheck(${i})`)

        let label = document.createElement("label");
        label.setAttribute("for", "todo" + i)
        label.setAttribute("class", "todo-label")
        label.innerHTML = arr[i];

        todo.appendChild(input);
        todo.appendChild(label)

        let buttonsDiv = document.createElement("div");
        buttonsDiv.setAttribute("class", "buttons")

        let span = document.createElement("span");
        span.setAttribute("class", "edit-icon");
        span.setAttribute("onclick", `editTodo(${i})`);

        span.innerHTML = "&#9998";

        let span2 = document.createElement("span")
        span2.setAttribute("class", "delete-icon");
        span2.setAttribute("onclick", `deleteTodo(${i})`);
        span2.innerHTML = "&#128465";

        buttonsDiv.appendChild(span);
        buttonsDiv.appendChild(span2);

        todo.appendChild(buttonsDiv);

        container.appendChild(todo)

    }
}

function deleteTodo(id) {
    todos.splice(id, 1);
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
    let text = checkbox.parentElement;
    if (checkbox.checked) {
        text.setAttribute("class", "todo completed")
    } else {
        text.setAttribute("class", "todo")

    }



}



