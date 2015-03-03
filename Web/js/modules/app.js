define(['angular', 'controllers/todoCtrl'], function (angular, todoCtrl) {
    var TodoApp = angular.module('TodoApp', ['angular.filter', 'LocalStorageModule', 'todoControllers']);

    TodoApp.config(function (localStorageServiceProvider) {
        localStorageServiceProvider
          .setPrefix('TodoApp');
    });

    }
);