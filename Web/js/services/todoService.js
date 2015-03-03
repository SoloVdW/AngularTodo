define(['angular', 'models/todo', 'models/viewing-options'], function (angular, Todo, ViewingOptions) {
    /**
     * @constructor
     * @param {LocalStorageService} localStorageService - Local storeage service.
     */
    var TodoService = function (localStorageService) {
        /**
         * Local storeage service
         * @type {LocalStorageService}
         * @required
         */
        this.localStorageService = localStorageService;
    };

    /**
     * Creates a initial array of todo tasks or load array from local storage.
     * @public
     * @param {string} username - Username of logged in user.
     * @returns {Array<Todo>} - An array with 1 todo task.
     */
    TodoService.prototype.loadTodos = function (username) {
        var userStore = this.localStorageService.get(username);
        if (userStore) {
            return userStore.todos;
        }
        else {

            var todos = [
                    new Todo({ name: 'Welcome', description: 'This is a description' })
            ];
            this.localStorageService.set(username, { 'todos': todos });

            return todos;
        }


    };

    /**
     * Gets the available viewing options
     * @public
     * @returns {ViewingOptions} - Viewing options available.
     */
    TodoService.prototype.getViewingOptions = function () {
        return ViewingOptions;
    };

    /**
     * Add todo task to array and local storeage.
     * @public
     * @param {string} username - Username of logged in user.
     * @param {Array<Todo>} todos - Current array of todo tasks.
     * @param {Object} parms - Todo parameters.
     * @param {string} parms.name - Name of the todo task.
     * @param {string} parms.description - Description of the todo task.
     * @param {boolean} parms.done - Completion status of todo task.
     * @param {Date} parms.date_added - Date when todo task was created.
     * @param {Date} parms.date_completed - Date when the todo task was completed.
     * @param {boolean} parms.is_selected - Selection status of todo task.
     * @param {boolean} parms.is_editable - Editable status of todo task.
     * @param {boolean} parms.is_archived - Archived status of todo task.
     * @param {Date} parms.date_archived - Date when the todo task was archived.
     */
    TodoService.prototype.addTodo = function (username, todos, parms) {
        todos.unshift(new Todo(parms));
        this.localStorageService.set(username, { 'todos': todos });
    };

    /**
     * Remove todo from array of todo tasks and local storage.
     * @public
     * @param {string} username - Username of logged in user.
     * @param {Array<Todo>} todos - Array of todo tasks.
     * @param {Todo} todo - Todo task to remove.
     */
    TodoService.prototype.removeTodo = function (username, todos, todo) {
        todos.splice(todos.indexOf(todo), 1);
        this.localStorageService.set(username, { 'todos': todos });
    };

    /**
     * Remove completed todo tasks from array and local storage.
     * @public
     * @param {string} username - Username of logged in user.
     * @param {Array<Todo>} todos - Array of todo tasks.
     * 
     * @returns {Array<Todo>} - Array of todo tasks.
     */
    TodoService.prototype.clearCompletedTodos = function (username, todos) {
        todos = todos.filter(function (todo) {
            return !todo.done;
        });
        this.localStorageService.set(username, { 'todos': todos });
        return todos;
    };

    /**
     * Select todo task and unselect and unedit all other todo tasks.
     * @public
     * @param {Array<Todo>} todos - Array of todo tasks.
     * @param {Todo} currentTodo - Todo task to select.
     */
    TodoService.prototype.selectTodo = function (todos, currentTodo) {
        if (!currentTodo.is_selected) {
            todos.forEach(function (todo) {

                if (todo !== currentTodo) {
                    todo.is_selected = false;
                    todo.is_editable = false;
                }
            });

            currentTodo.is_selected = true;
        }
    };

    /**
     * Makes todo editable.
     * @public
     * @param {Todo} todo -  Todo to make editable.
     * @returns {Todo} - New editable todo.
     */
    TodoService.prototype.editTodo = function (todo) {
        todo.is_editable = true;
        return new Todo(todo);
    };

    /**
     * Update todo task in array and local storeage.
     * @public
     * @param {string} username - Username of logged in user.
     * @param {Array<Todo>} Todos - Array of todo tasks.
     * @param {Todo} todo - Todo to update.
     * @param {Object} parms - Todo parameters to update.
     * @param {string} parms.name - Name of the todo task.
     * @param {string} parms.description - Description of the todo task.
     * @param {boolean} parms.done - Completion status of todo task.
     * @param {Date} parms.date_added - Date when todo task was created.
     * @param {Date} parms.date_completed - Date when the todo task was completed.
     * @param {boolean} parms.is_selected - Selection status of todo task.
     * @param {boolean} parms.is_editable - Editable status of todo task.
     * @param {boolean} parms.is_archived - Archived status of todo task.
     * @param {Date} parms.date_archived - Date when the todo task was archived.
     */
    TodoService.prototype.updateTodo = function (username, todos, todo, parms) {
        if (typeof parms.name !== 'undefined') {
            todo.name = parms.name;
        }

        if (typeof parms.description !== 'undefined') {
            todo.description = parms.description;
        }

        if (typeof parms.done !== 'undefined') {
            todo.done = parms.done;
        }

        if (typeof parms.date_added !== 'undefined') {
            todo.date_added = parms.date_added;
        }

        if (typeof parms.date_completed !== 'undefined') {
            todo.date_completed = parms.date_completed;
        }

        if (typeof parms.is_selected !== 'undefined') {
            todo.is_selected = parms.is_selected;
        }

        if (typeof parms.is_editable !== 'undefined') {
            todo.is_editable = parms.is_editable;
        }
        else {
            todo.is_editable = false;
        }

        if (typeof parms.is_archived !== 'undefined') {
            todo.is_archived = parms.is_archived;
        }

        if (typeof parms.is_archived !== 'undefined') {
            todo.date_archived = parms.date_archived;
        }

        this.localStorageService.set(username, { 'todos': todos });
    };

    /**
     * Update done status of todo task.
     * @public
     * @param {string} username - Username of logged in user.
     * @param {Array<Todo>} Todos - Array of todo tasks.
     * @param {Todo} todo - Todo to update.
     * @param {boolean} done - Task completed status.
     */
    TodoService.prototype.todoDoneStatusChange = function (username, todos, todo, done) {
        if (done) {
            var parms = { 'done': done, 'date_completed': new Date() };
        }
        else {
            var parms = { 'done': done };
        }

        this.updateTodo(username, todos, todo, parms);
        this.localStorageService.set(username, { 'todos': todos });
    };

    /**
     * Archive Todo.
     * @public
     * @param {string} username - Username of logged in user.
     * @param {Array<Todo>} Todos - Array of todo tasks.
     * @param {Todo} todo - Todo to update.
     */
    TodoService.prototype.archiveTodo = function (username, todos, todo) {
        this.updateTodo(username, todos, todo, { 'is_archived': true, 'date_archived': new Date() });
        this.localStorageService.set(username, { 'todos': todos });
    };

    /**
     * Apply filter to todo tasks.
     * @public
     * @param {Array<Todo>} Todos - Array of todo tasks.
     * @param {string} viewFilter - A ViewOptions value.
     * @returns {Array<Todo>} - Filtered todo tasks
     */
    TodoService.prototype.filterTodos = function (todos, viewFilter) {
        return todos.filter(function (todo) {
            switch (viewFilter) {
                case ViewingOptions.all:
                    return true;
                case ViewingOptions.active:
                    return !todo.is_archived;
                case ViewingOptions.archived:
                    return todo.is_archived;
                default:
                    return !todo.is_archived;
            }
        });
    };

    angular.module('todoServices', []).service('todoService', ['localStorageService', TodoService]);

    return TodoService;
});