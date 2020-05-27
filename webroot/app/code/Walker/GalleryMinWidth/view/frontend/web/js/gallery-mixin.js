define([
    'jquery',
    'jquery-ui-modules/widget'
], function ($) {

    var galleryWidgetMixin = {
        options: {
            minWidth: 350
        }

    };

     return function (targetWidget) {
        $.widget('mage.gallery', targetWidget, galleryWidgetMixin);
         console.log($.mage);
        return $.mage.gallery;
     }
});
