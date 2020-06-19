define([], function () {
    'use strict';

    return function (checkoutData) {
        // checkoutData is the data return from the original module
        const orig = checkoutData.getSelectedShippingAddress;
        checkoutData.getSelectedShippingAddress = function () { // overrides this property
            const address = orig.bind(checkoutData)();
            console.log('Selected Shipping Address', address);
            return address;
        };

        return checkoutData; // Returns the new values after being overwrittenget
    };

});
