"use strict";

// 1. HTML elementlarni tanlab oldik
let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");
let elBtnWrapper = document.querySelector(".button-wrapper");

//12. COUNT SPANLARNI TANLAB OLISH:
let elAllCount = document.querySelector(".all-count");
let elCompletedCount = document.querySelector(".completed-count");
let elUnCompletedCount = document.querySelector(".uncompleted-count");

//GEREATE BUTTONLARNI TANLAB OLISH:
let elAllBtn = document.querySelector(".btn-all");
let elCompleteBtn = document.querySelector(".btn-completed");
let elUncompleteBtn = document.querySelector(".btn-uncompleted");

// 8. Todos arrayini aylanib chiqib har bir objectdagi malumotlarni htmlda uiga chiqarish uchun funksiya
const renderTodos = function (arr, element) {
  elAllCount.textContent = todos.length;
  elCompletedCount.textContent = todos.filter(
    (todo) => todo.isCompleted
  ).length;
  elUnCompletedCount.textContent = todos.filter(function (todo) {
    return !todo.isCompleted;
  }).length;

  arr.forEach(function (todo) {
    let newLi = document.createElement("li");
    let newCheckbox = document.createElement("i");
    let newDeleteBtn = document.createElement("button");
    let newIconTrash = document.createElement("i");
    // let newIconCheck = document.createElement("i");

    newCheckbox.type = "checkbox";

    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");
    newLi.classList.add("new-li");
    newIconTrash.classList.add("bi");
    newIconTrash.classList.add("bi-trash");
    newCheckbox.classList.add("bi");
    newCheckbox.classList.add("bi-check-circle-fill");

    newLi.textContent = todo.title;

    //11. DATASET QO'SHDIK
    newDeleteBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.checkId = todo.id;
    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newLi.style.textDecoration = "line-through";
      newLi.style.opacity = ".5";
    }

    // console.log(todo.isCompleted);

    element.appendChild(newLi);
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newDeleteBtn);
    newDeleteBtn.appendChild(newIconTrash);
    // newCheckbox.appendChild(newIconCheck);
  });
};

// 2. New array for todos
const lTodos = JSON.parse(window.localStorage.getItem("localTodos"));
const todos = lTodos || [];
if(lTodos == false){
  window.localStorage.clear()

  console.log("dfced");
}

renderTodos(todos, elList);

// 10. Ul quloq solyabmiz chunki bu EVENT DELEGATION:
elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn, .bi-trash")) {
    let btnTodoId = evt.target.dataset.todoId * 1;
    let foundIndex = todos.findIndex((todo) => todo.id === btnTodoId);

    todos.splice(foundIndex, 1);
    elList.innerHTML = null;

    window.localStorage.setItem("localTodos", JSON.stringify(todos));

    renderTodos(todos, elList);
  } else if (evt.target.matches(".checkbox-btn")) {
    let checkTodoId = evt.target.dataset.checkId * 1;

    let foundCheckTodo = todos.find((todo) => todo.id === checkTodoId);

    foundCheckTodo.isCompleted = !foundCheckTodo.isCompleted;

    elList.innerHTML = null;

    window.localStorage.setItem("localTodos", JSON.stringify(todos));

    renderTodos(todos, elList);
  }
});

// 3. Formaga clickiga quloq soldik
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // 4. input value
  let inputValue = elInput.value;

  if (inputValue === "") {
    return;
  }

  // 5. Har bir todo uchun yangi object yaratib oldik
  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  // 6. Har bit todo objecttini todos arrayiga push qilyabdi
  todos.push(newTodo);

  window.localStorage.setItem("localTodos", JSON.stringify(todos));

  elList.innerHTML = null;
  elInput.value = null;

  // 9. todolarni render qilyabmiz
  renderTodos(todos, elList);
});

//ALL BUTTON
elAllBtn.addEventListener("click", function () {
  elList.innerHTML = null;

  renderTodos(todos, elList);
});

// COMPLETE BUTTON
elCompleteBtn.addEventListener("click", function () {
  const filteredComplete = todos.filter((todo) => todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(filteredComplete, elList);
});

elUncompleteBtn.addEventListener("click", function () {
  const filteredComplete = todos.filter((todo) => !todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(filteredComplete, elList);
});
