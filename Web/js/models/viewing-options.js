define([], function () {

    /**
     * Enum for viewing / filter options
     * @readonly
     * @enum {string}
     */
    var ViewingOptions = {
        /**
         * Option to view all items.
         * @type {string}
         */
        all: 'All',

        /**
         * Option to view active items.
         * @type {string}
         */
        active: 'Active',

        /**
         * Option to view archived items.
         * @type {string}
         */
        archived: 'Archive'
    };
    return ViewingOptions;
});