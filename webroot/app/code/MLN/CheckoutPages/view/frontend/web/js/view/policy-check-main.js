define(
    [
        'jquery',
        'ko',
        'uiComponent',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/checkout-data',
        'mage/storage'
    ],
    function ($, ko, Component, quote, checkoutData, storage)
    {
        "use strict";

        return Component.extend({
            defaults: {
                isPolicyAgreedMain: ko.observable(false),
                includesFrozenFood: ko.observable(),
            },

            showFrozenCheckbox: function (){
                let checkoutItems = quote.getItems(),
                    shipFresh = "9",
                    shipFrozen = "10",
                    shipLive = "11",
                    shipOptions = [],
                    self = this;

                $.each(checkoutItems, function (item){
                    shipOptions.push(checkoutItems[item].product.ships_option);
                });

                // Option ids
                // Fresh: 9
                // Frozen: 10
                // Live: 11

                if(shipOptions.includes(shipFrozen) && shipOptions.includes(shipLive)){
                    // Frozen and Live Included
                    self.includesFrozenFood(true);
                } else if(shipOptions.includes(shipFrozen) && shipOptions.includes(shipFresh)){
                    // Frozen and Fresh Included
                    self.includesFrozenFood(true);
                } else if(shipOptions.includes([shipFresh,shipFrozen,shipLive])){
                    // Frozen, Live and Fresh Included
                    self.includesFrozenFood(true);
                }

            },

            initialize: function () {
                this._super();

                this.showFrozenCheckbox();

                return this;
            }


        });
    }
);
