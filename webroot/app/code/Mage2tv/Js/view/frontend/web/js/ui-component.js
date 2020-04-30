define(['uiCollection'], function (Collection) {
    "use strict";

    return Collection.extend({
        defaults: {
            template: 'Mage2tv_Js/ui-template',
            label: 'Some random numbers',
            values: [22, 1, 5, 1024, 777]
        }
    });
});
