define(['jquery'], function ($) {
    "use strict";

    $('.increase-qty').on("click", function (e) {
        let qty = parseInt($('#qty').val());
        qty = qty + 1;
        $('#qty').val(qty).trigger('change');
    });

    $('.decrease-qty').on("click", function (e) {
        let qty = parseInt($('#qty').val());

        if(qty > 1){
            qty = qty - 1;
            $('#qty').val(qty).trigger('change');
        } else{
            qty = 1;
        }

    });


});
