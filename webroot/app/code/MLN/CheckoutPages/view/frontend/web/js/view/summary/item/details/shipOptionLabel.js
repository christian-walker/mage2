/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'uiComponent',
    'Magento_Checkout/js/model/quote'
], function ($,Component, quote) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'MLN_CheckoutPages/summary/item/details/shipOptionLabel.html'
        },

        /**
         * @param {Object} currentItem
         * @return {String}
         */
        getShipOption: function (currentItem) {
            let checkoutItems = quote.getItems(),
                shipOption,
                shipLabel;

            $.each(checkoutItems, function (item){
                if(currentItem.item_id == parseInt(checkoutItems[item].item_id)){
                    shipOption = checkoutItems[item].product.ships_option;
                    if(shipOption == "9"){
                        shipLabel = "Fresh";
                    }
                    if(shipOption == "10"){
                        shipLabel = "Frozen";
                    }
                    if(shipOption == "11"){
                        shipLabel = "Live";
                    }
                }

            });

            return shipLabel;
        }
    });
});
