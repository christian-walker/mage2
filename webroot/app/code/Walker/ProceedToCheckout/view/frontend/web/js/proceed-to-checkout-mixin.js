define([
    "jquery",
    "Magento_Customer/js/model/authentication-popup",
    "Magento_Customer/js/customer-data",
    "mage/utils/wrapper"
], function ($, authenticationPopup, customerData, wrapper) {
     return function (proceedToCheckoutFunction) {
        return wrapper.wrap(proceedToCheckoutFunction, function (originalProceedToCheckout, config, element) {
            originalProceedToCheckout(config, element);
            console.log(originalProceedToCheckout);

            let customer = customerData.get('customer');
            let firstName = customer().firstname;
            firstName = firstName + "?";

            return $(element).append(firstName);

        })
     }
});
