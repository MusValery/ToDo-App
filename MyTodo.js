import uniqid from 'uniqid';

export default class MyTodo {

    #todos = [];

    get todos() {
        return this.#todos;
    }

    set todos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
        this.#todos = todos;
    }

    constructor() {
        const storageTodos = JSON.parse(localStorage.getItem('todos'));

        this.todos = storageTodos || [];
    }
    addTodo(text) {
        const todoText = {
            id: uniqid(),
            text,
            isDone: false,
        };
        this.todos = [...this.todos, todo];
        return todo;
    }

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }
  
    checkTodo(id, isDone) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone,
                };
            }
    
            return todo;
        });
    }
    editTodo(id, text) {
        this.todos = this.todos.forEach((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text,
                };
            }
    
            return todo;
        });
    }

    filterTodos(filter) {
        if (filter === 'completed') {
            return this.todos.filter((todo) => todo.isDone);
        }
    
        if (filter === 'uncompleted') {
            return this.todos.filter((todo) => !todo.isDone);
        }
    
        return this.todos;
    }
}
