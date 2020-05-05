define(['uiComponent'], function (Component) {
    "use strict";

    return Component.extend({
        defaults: {
            label: 'Component A',
            amount: 11,
            imports: {
                amount: 'component-b:value'
            }
        }
    });
});
