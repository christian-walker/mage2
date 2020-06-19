define(['mage/utils/wrapper'], function (wrapper) {
    "use strict";

    return function (initSidebarFunction) {
        return wrapper.wrap(initSidebarFunction, function (initSidebar, config, element) {
            initSidebar(config, element);
            console.log(this.element);

        });


        // return Minicart.extend({
        //     update: function (updatedCart) {
        //         console.log('Update minicart successfully intercepted');
        //         console.log(updatedCart);
        //         return this._super(updatedCart);
        //     }
        // });
    }
});
