require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        angular_filter: '../bower_components/angular-filter/dist/angular-filter.min',
        angular_local_storage: '../bower_components/angular-local-storage/dist/angular-local-storage.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        angular_filter:{
            exports: 'angular_filter',
            deps: ['angular']
        },
        angular_local_storage: {
            exports: 'angular_local_storage',
            deps: ['angular']
        },
        bootstrap: {
            exports: 'bootstrap',
            deps: ['jquery']
        }
    },

    priority: ['jquery', 'angular', 'angular_filter', 'bootstrap', 'angular_local_storage']

});

require(['jquery', 'angular', 'angular_filter', 'bootstrap', 'angular_local_storage', 'modules/app'], function ($, angular, angular_filter, bootstrap, angular_local_storage, app) {
    angular.bootstrap(document, ['TodoApp']);
})