"use strict";

class List {
  constructor(element, todo = null, checked = null, setDate = null, id = null) {
    this.element = element;
    this.todo = todo;
    this.checked = checked;
    this.setDate = setDate;
    this.id = id ? id : Date.now();
  }

  apply() {
    let item = `  <li>
    <div class="" id="list">
    <p class="showDate">Date created - ${this.setDate}</p>
    <input type="checkbox" name="checkbox" class="check-box${this.id}" id="check-box">
    <input class="show show${this.id}" type="text" value="${this.todo}"  maxlength = "100"></input>
    <!-- <img src="./pencil.png" class="icon edit${this.id}" id="edit"> -->
    <img src="./delete.png" class="icon delete${this.id}" id="delete">
    </div>
    </li>`;
    this.element.insertAdjacentHTML("beforeend", item);

    return this;
  }

  active() {
    // const editIcon = document.querySelector(`.edit${this.id}`);
    const delIcon = document.querySelector(`.delete${this.id}`);
    const checkPoint = document.querySelector(`.check-box${this.id}`);
    const disp = document.querySelector(`.show${this.id}`);
    const id = this.id;

    delIcon.addEventListener("click", function (e) {
      let input = window.confirm("Do want to delete this to-do ? ");
      if (input) {
        let newData = JSON.parse(localStorage.getItem("Data"));
        newData.forEach((el, i) => {
          if (el.id === id) {
            newData.splice(i, 1);
            localStorage.setItem("Data", JSON.stringify(newData));
          }
        });
        this.parentElement.parentElement.remove();
      }
      if (!input) {
        return;
      }
    });

    checkPoint.addEventListener("click", function (e) {
      if (e.target.checked) {
        disp.style.textDecoration = "line-through";
      } else {
        disp.style.textDecoration = "none";
      }
    });

    disp.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        todo.blur();

        let newData = JSON.parse(localStorage.getItem("Data"));
        newData.forEach((el, i) => {
          if (el.id === id) {
            el.todo = disp.value;
            // console.log(newData);
            localStorage.setItem("Data", JSON.stringify(newData));
          }
        });
      }
    });

    return this;
  }
}

// Document Objects
const todo = document.querySelector("#to-do");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("btn-icon");
const todoForm = document.getElementById("basic-input");
const unorderedList = document.querySelector(".list");

const createTodo = function () {
  let record = { task: todo.value, setDate: dateInput.value, kill: false };
  let listItem = new List(
    unorderedList,
    record.task,
    record.kill,
    record.setDate
  );
  let Data = JSON.parse(localStorage.getItem("Data"));
  Data.push(listItem);
  localStorage.setItem("Data", JSON.stringify(Data));
  listItem.apply();
  listItem.active();
};

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  createTodo();
  this.reset();
});

todo.addEventListener("input", (e) => {
  let max = todo.getAttribute("maxlength");
  if (todo.value.length >= max) {
    alert(`value must be less than  ${max} characters`);
  }
});

todo.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    todo.blur();
  }
});

window.onload = () => {
  localStorage.getItem("Data")
    ? console.log("true")
    : localStorage.setItem("Data", JSON.stringify([]));
  let initials = JSON.parse(localStorage.getItem("Data"));
  // console.log(initials);
  // ? JSON.parse(localStorage.getItem("Data")) : localStorage.setItem('Data', JSON.stringify([])) && [];
  if (initials.length != 0) {
    initials.forEach((el) => {
      new List(unorderedList, el.todo, el.checked, el.setDate, el.id)
        .apply()
        .active();
    });
  }
};
