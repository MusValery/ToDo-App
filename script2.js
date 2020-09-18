const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');
const todos = JSON.parse(localStorage.getItem('todos'));
const button = document.getElementById('btn');
const submit = document.getElementById('submitBtn');

submit.addEventListener('click', addTodo);

if (todos) {
   todos.forEach((todo) => {
      addTodo(todo)
   });
}

form.addEventListener('submit', (e) => {
   e.preventDefault();

   addTodo();
});

function addTodo(todo) {
   let todoText = input.value;

   if (todo) {
      todoText = todo.text;
   }

   if (todoText) {
      const elementLi = document.createElement('li');
      if (todo && todo.completed) {
         elementLi.classList.add('completed');
      }

      elementLi.innerText = todoText;

      elementLi.addEventListener('click', () => {
         elementLi.classList.toggle('completed');

         updateLS();
      });

      elementLi.addEventListener('contextmenu', (e) => {
         e.preventDefault();

         elementLi.remove();

         updateLS();
      });

      todosUl.appendChild(elementLi);

      input.value = "";

      updateLS();
   }
}

function updateLS() {
   const todosEl = document.querySelectorAll('li');

   const todos = [];

   todosEl.forEach((elementLi) => {
      todos.push({
         text: elementLi.innerText,
         completed: elementLi.classList.contains('completed')
      })
   });

   localStorage.setItem('todos', JSON.stringify(todos));
}


button.addEventListener("click", clearAll);

function clearAll() {
   todosUl.innerHTML = '';
   input.value = "";
   updateLS();
}