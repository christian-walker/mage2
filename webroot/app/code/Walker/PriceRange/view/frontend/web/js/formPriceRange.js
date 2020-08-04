define(['jquery','Magento_Customer/js/customer-data'],

    function ($, customerData) {
    "use strict";

    return function (config, element) {
        //console.log("This is your form-module");
        let customer = customerData.get('customer');
        console.log(customer().firstname);



        $(element).submit(e => {
            e.preventDefault();
            let form = $(element),
            lowRangeVal = $(element).find("input[name='low_range']").val(),
            highRangeVal = $(element).find("input[name='high_range']").val(),
            url = config.base_url + "pricerange/result/result/";

            let userPriceFields  = customerData.set('user-price-amounts', {
                lowPrice: lowRangeVal,
                highPrice: highRangeVal
            });


            $.ajax({
                url: url,
                type: "POST",
                showLoader: true,
                data: {low_range:lowRangeVal, high_range:highRangeVal},
                cache: false,
                success: function (response) {
                    console.log(response.output);
                    $('#results').html(response.output);
                },
                error: function (error) {
                    $('#results').html(error);
                }
            });
            return false;

        });
    };

});

