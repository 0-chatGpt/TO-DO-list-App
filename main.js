"use strict";

/**
 * Build a simple To-do list application.
 * The user of this application should be able to add, delete, and update items in the To-do app.
 * This application should have a simple UI but a nice UX.
 */

// Document Objects
const todo = document.getElementById('to-do');
const dateIcon = document.getElementById('date-icon');
const dateInput = document.getElementById('date');
const addBtn = document.getElementById('btn-icon');
const todoForm = document.getElementById('basic-input');
const editIcon = document.getElementById('edit');
const delIcon = document.getElementById('delete');
const checkPoint = document.querySelector('#check-box');


const createTodo = function (){
    let record = {task: todo.value, setDate:dateInput.value, kill: false};
    localStorage.setItem('Data', JSON.stringify(record));
    return true;
}

todoForm.addEventListener('submit', function (event){
    event.preventDefault();
    createTodo();

    this.reset();
    console.log(JSON.parse(localStorage.getItem('Data')));
});

// checkPoint.addEventListener('click', function (e){
//     console.log(e.target.checked);
// })

editIcon.addEventListener('click', function(){
    // Display input as editable
    // Save and render input back to new edit
})

delIcon.addEventListener('click', function(){
    // Delete particular list item.
    // delete from record ? localStorage.
})