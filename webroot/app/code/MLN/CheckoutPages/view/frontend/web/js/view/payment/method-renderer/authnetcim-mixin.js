define([
    'jquery',
    'ko',
    'uiRegistry',
    'Magento_Checkout/js/model/quote'
], function ($,ko, registry, quote) {
    'use strict';

    var mixin = {

        getData: function () {
            let paymentData = this._super(),
                cc_no = this.creditCardNumber().replace(/\D/g,''),
                continueButton = document.getElementById('continue-review');

            this.creditCardLast4(cc_no.substring(cc_no.length - 4));

            return paymentData;
        },

        ccNumberFormatted : function (){
            let authConfig = window.checkoutConfig.payment.authnetcim;

            this.getData();

            if(authConfig){
                let paymentInfo = {};

                paymentInfo['cc_last4'] = this.creditCardLast4();
                paymentInfo['cc_type'] = this.creditCardType();

                $.localStorage.set('authnetcim_info', JSON.stringify(paymentInfo));

            }
        },

        initObservable: function (){
            let self = this._super();

            if(self.selectedCard() !== null){
                var authConfig = window.checkoutConfig.payment.authnetcim;

                if(authConfig){
                    let paymentInfo = {};

                    if(self.storedCards()){
                        let cardId = self.selectedCard();
                        if (cardId === null || cardId === undefined) {
                            return;
                        }
                        for (var card of self.storedCards()){
                            if (card.id === cardId){
                                paymentInfo['cc_last4'] = card.label.split("-").pop();
                                paymentInfo['cc_type'] = card.type;
                            }
                        }

                    }

                    $.localStorage.set('authnetcim_info', JSON.stringify(paymentInfo));

                }
            }

            return this;

        },

        placeOrder: function (){
            this._super();
            $.localStorage.remove('authnetcim_info', 'billing_info');
        }

    };

    return function (target) {
        return target.extend(mixin);
    };

});
