define([
    'jquery',
    'ko',
    'uiRegistry',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/model/customer'
], function ($,ko, registry, quote, customer) {
    'use strict';

    var mixin = {

        initObservable: function (){
            this._super();

            return this;
        },

        useVault: function (){
            let continueButton = document.getElementById('continue-review');

            if(continueButton){
                if(this.getStoredCards().length > 0){
                    //continueButton.disabled = false;
                    return this.getStoredCards().length > 0;
                }
            }
        },

        handleSelectedCardType: function () {
            var cardId = this.selectedCard(),
                continueButton = document.getElementById('continue-review');

            if(customer.isLoggedIn()){
                if (cardId === null || cardId === undefined) {
                    //continueButton.disabled = true;
                    return;
                }
            }

            for (var card of this.storedCards()) {
                if (card.id === cardId) {
                    this.creditCardType(card.type);
                }
            }
        },

    };

    return function (target) {
        return target.extend(mixin);
    };

});
