// import 'style.scss';
// import MyTodo from './todo';

class TodoApp extends MyTodo {

    #list = {};

    constructor(form, list, todoInput, allBtn, completedBtn, uncompletedBtn) {
        super();

        this.#list = list;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.addTodo(input.value);
        });
        this.renderTodos();

        allBtn.addEventListener('click', () => {
            this.renderTodos();
        });

        completedBtn.addEventListener('click', () => {
            const todos = super.filterTodos('completed');
            this.renderTodos(todos);
        });

        uncompletedBtn.addEventListener('click', () => {
            const todos = super.filterTodos('uncompleted');
            this.renderTodos(todos);
        });
    }

    renderTodos(todos = this.todos) {
        this.#list.innerHTML = '';

        todos.forEach((todo) => {
            const todoLi = this.createTodo(todo);

            this.#list.appendChild(todoLi);
        });
    }
    addToDo(text) {
        super.addToDo(text);
        this.renderTodos()
    }

    removeTodo(id) {
        super.removeTodo(id);
        this.renderTodos();
    }
    checkTodo(id, isDone) {
        super.checkTodo(id, isDone);

        const todoLi = document.getElementById(id);

        if (isDone) {
            todoLi.classList.add('active');
        } else {
            todoLi.classList.remove('active');
        }
    }

    editTodo(id, text) {
        super.editTodo(id, text);
        this.renderTodos();
    }

    createTodo(todo) {
        const elementLi = document.createElement('li');
        elementLi.id = todo.id;
        if (todo && todo.completed) {
            elementLi.classList.add('completed');
        }
        const todoItemInput = TodoApp.createTodoItemInput(todo.text);
        elementLi.insertAdjacentElement('afterbegin', todoItemInput);
        todoItemInput.addEventListener('blur', (e) => {
            this.editTodo(todo.id, e.target.value);
            todoItemInput.readOnly = true;
        });

        const checkbox = TodoApp.createCheckbox(todo.isDone, (e) => {
            this.checkTodo(todo.id, e.target.checked);
        });
        elementLi.insertAdjacentElement('afterbegin', checkbox);
        const editBtn = TodoApp.createEditButton(() => {
            todoItemInput.readOnly = false;
            todoItemInput.focus();
        });
        elementLi.insertAdjacentElement('beforeend', editBtn);

        const deleteBtn = TodoApp.createDeleteButton(() => this.removeTodo(todo.id));
        elementLi.insertAdjacentElement('beforeend', deleteBtn);

        return elementLi;
    }

    static createTodoItemInput(todoText) {
        const input = document.createElement('input');
        input.value = todoText;
        input.classList.add('input');
        input.readOnly = true;

        return input;
    }

    static createDeleteButton(listener) {
        const button = document.createElement('button');

        button.classList.add('btn', 'btn-delete_outline', 'btn-sm');
        button.innerHTML = '<span class="material-icons">delete_outline</span>';

        button.addEventListener('click', listener);

        return button;
    }

    static createEditButton(listener) {
        const editBtn = document.createElement('button');

        editBtn.classList.add('btn', 'btn-edit', 'btn-sm');
        editBtn.innerHTML = '<span class="material-icons">edit</span>';
        editBtn.addEventListener('click', listener);

        return editBtn;
    }
}

const todoForm = document.querySelector('#form');
const todoFormInput = document.querySelector('.input');
const todoList = document.querySelector('.todos');

const allBtn = document.querySelector('#all');
const completedBtn = document.querySelector('#completed');
const uncompletedBtn = document.querySelector('#uncompleted');

const todoApp = new TodoApp(
    todoForm,
    todoList,
    todoFormInput,
    allBtn,
    completedBtn,
    uncompletedBtn,
  );
  console.log(todoApp);