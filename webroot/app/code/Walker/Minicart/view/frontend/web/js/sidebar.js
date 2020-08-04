/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery'
], function ($) {
    'use strict';

    var mixin = {
        _initContent: function () {
            var events = {};
            /**
             * @param {jQuery.Event} event
             */
            events['click ' + this.options.item.qtyReduce] = function (event) {
                event.stopPropagation();
                //var itemId = $(event.currentTarget).data('cart-item');
                var qtyElement = $(event.currentTarget).id;
                var qtyValue = $(parseInt(qtyElement.val()));
                qtyValue = qtyValue - 1;
                qtyElement.val(qtyValue).trigger('keyup');
            };

            events['click ' + this.options.item.qtyIncreasing] = function (event) {
                event.stopPropagation();
                //var itemId = $(event.currentTarget).data('cart-item');
                var qtyElement = $(event.currentTarget).id;
                var qtyValue = $(parseInt(qtyElement.val()));
                qtyValue = qtyValue + 1;
                qtyElement.val(qtyValue).trigger('keyup');
            };

            return this._super();

        }

    };

    return function(targetWidget){
        $.widget('mage.sidebar', targetWidget, mixin);
        return $.mage.sidebar;
    }


});
