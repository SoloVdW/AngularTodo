define([], function () {
    /**
     * @constructor
     * @param {Object} parms - Constructor parameters.
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
    var Todo = function (parms) {
        /**
         * Name of the todo Task.
         * @type {string}
         * @required
         */
        this.name = parms.name;

        /**
         * Description of the todo task.
         * @type {string}
         * @optional
         */
        this.description = parms.description || null;

        /**
         * Completion status of todo task.
         * @type {boolean}
         * @optional
         * @default false
         */
        this.done = parms.done || false;

        /**
         * Date when todo task was created.
         * @type {Date}
         * @optional
         * @default current date 
         */
        this.date_added = parms.date_added || new Date();

        /**
         * Date when the todo task was completed.
         * @type {Date}
         * @optional
         */
        this.date_completed = parms.date_completed || null;

        /**
         * Selection status of todo task.
         * @type {boolean}
         * @optional
         * @default false
         */
        this.is_selected = parms.is_selected || false;

        /**
         * Editable status of todo task.
         * @type {boolean}
         * @optional
         * @default false
         */
        this.is_editable = parms.is_editable || false;

        /**
         * Archived status of todo task.
         * @type {boolean}
         * @optional
         * @default false
         */
        this.is_archived = parms.is_archived || false;

        /**
         * Date when the todo task was archived.
         * @type {Date}
         * @optional
         */
        this.date_archived = parms.date_archived || null;
    }
    return Todo;
});