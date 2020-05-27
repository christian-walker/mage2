define([
    "jquery",
    "jquery/ui"
], function ($) {

    var mixin = {
        options: {
            priceTemplate: '<span class="price"><%- data.formatted %> USD</span>'
        }

    };

    return function (targetWidget) {
        $.widget('mage.priceBox', targetWidget, mixin);
        console.log("this is my mixin priceBox widget");
        return $.mage.priceBox;
    }

});
