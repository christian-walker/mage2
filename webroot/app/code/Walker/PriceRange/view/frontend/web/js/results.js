define([
    'Magento_Customer/js/customer-data', 'jquery', 'mage/storage', 'jquery/jquery-storageapi',],
    function (customerData, $) {
    "use strict";

    return function (config, element) {

        let customer = customerData.get('customer');
        console.log(customer().firstname);
        console.log(config.highRange)




    }

});
