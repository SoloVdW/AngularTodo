define(['angular', 'services/todoService'], function (angular, todoService) {

    /**
     * @constructor
     * @param {$Scope} $scope - Angular scope object.
     * @param {TodoService} - TodoService for handling todo operations.
     */
    function todoController($scope, todoService) {

        /**
         * Login user if user exist, else register new user.
         * @public
         */
        $scope.loginOrRegisterUser = function (username) {
            $scope.todos = todoService.loadTodos(username);
            _getViewingOptions();
            $scope.registered = true;
            $scope.showAddTodo = false;
        };

        /**
         * Get the available viewing options.
         * @private
         */
        _getViewingOptions = function () {
            $scope.viewingOptions = todoService.getViewingOptions();
            $scope.viewFilter = $scope.viewingOptions[Object.keys($scope.viewingOptions)[0]];
        };

        /**
         * Enable viewing of Add Todo task field.
         * @public
         */
        $scope.addTask = function () {
            $scope.showAddTodo = true;
        };

        /**
         * Add Todo task.
         * @public
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
        $scope.addTodo = function (parms) {
            todoService.addTodo($scope.username, $scope.todos, parms);
            $scope.formTodoName = '';
            $scope.formTodoDescription = '';
            $scope.showAddTodo = false;
        };

        /**
         * Remove todo.
         * @public
         * @param {Todo} todo - Todo task to remove.
         */
        $scope.removeTodo = function (todo) {
            todoService.removeTodo($scope.username, $scope.todos, todo);
        };

        /**
         * Clear completed todo tasks.
         * @public
         */
        $scope.clearCompleted = function () {
            $scope.todos = todoService.clearCompletedTodos($scope.username, $scope.todos);
        };

        /**
         * Select todo task/
         * @public
         * @param {Todo} todo - Todo task to select.
         */
        $scope.selectTodo = function (event, todo) {
            todoService.selectTodo($scope.todos, todo);
        };

        /**
         * Update todo task.
         * @public
         * @param {Todo} todo - Todo task to update.
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
        $scope.updateTodo = function (todo, parms) {
            todoService.updateTodo($scope.username, $scope.todos, todo, parms);
        };

        /**
         * Make todo task editable.
         * @public
         * @param {Event} event - Event that triggered.
         * @param {Todo} todo - Todo task to make editable.
         */
        $scope.editTodo = function (event, todo) {
            event.stopPropagation();
            todoService.selectTodo($scope.todos, todo);
            $scope.todoEdit = todoService.editTodo(todo);
        };

        /**
         * Flag todo as done or incompleted.
         * @public
         * @param {Todo} todo- Todo task to flag as done/incompleted.
         */
        $scope.todoStatusChange = function (todo, done) {
            todoService.todoDoneStatusChange($scope.username, $scope.todos, todo, done);
        };

        /**
         * Archive todo task.
         * @public
         * @param {Todo} todo - Todo task to flag as archived.
         */
        $scope.archiveTodo = function (todo) {
            todoService.archiveTodo($scope.username, $scope.todos, todo);
        };

        /**
         * Selected viewing / filter option.
         * @public
         * @param {string} viewingOption - ViewingOption.value selected.
         */
        $scope.showTypeSelected = function (viewingOption) {
            $scope.viewFilter = viewingOption;
        };

        /**
         * Get Todos with viewing / filter option applied.
         * @public
         * @param {string} viewFilter - ViewingOption.value selected.
         */
        $scope.getTodos = function (viewFilter) {
            return todoService.filterTodos($scope.todos, viewFilter);
        };
    }

    angular.module('todoControllers', ['todoServices']).controller('todoController', ['$scope', 'todoService', todoController]);

    return todoController;
});