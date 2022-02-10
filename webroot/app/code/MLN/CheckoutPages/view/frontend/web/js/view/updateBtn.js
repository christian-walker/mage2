define(['jquery', 'mage/loader'], function ($, loader) {
    "use strict";

    return function(config, element)
    {
        $(element).click(function (){
            var loaderImage = $('[data-block=\'minicart-slide\'] .minicart-loader').loader();
            loaderImage.loader('show');
        });
    };
});
