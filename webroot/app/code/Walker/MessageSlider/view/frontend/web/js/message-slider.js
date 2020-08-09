define(['jquery', 'uiComponent', 'Magento_Customer/js/customer-data', 'slick'], function ($, Component, customerData ) {
    "use strict";

    return function (config, element){
        $(element).slick({
                autoplay: true,
                slidesToShow: 1,
                arrows: false
        });
    }
});
