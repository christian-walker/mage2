define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/quote'
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator,
        customer,
        checkoutData,
        quote
    ){
        'use strict';

        return Component.extend({
           defaults: {
               template: 'MLN_CheckoutPages/login',
               email: checkoutData.getInputFieldEmailValue()
           },

            //add here your logic to display step,
            isVisible: ko.observable(true),
            isLoggedIn: customer.isLoggedIn(),
            //step code will be used as step content id in the component template
            stepCode: 'contact',
            //step title value
            stepTitle: 'Contact',
            quoteIsVirtual: quote.isVirtual(),

            initialize: function (){
               var self = this;

               this._super();

               stepNavigator.registerStep(
                   this.stepCode,
                   null,
                   this.stepTitle,
                   this.isVisible, _.bind(this.navigate, this),
                   this.sortOrder
               );

               this.navigate();

               return this;

            },

            navigate: function (){
                if(window.location.hash === '#'+this.stepCode || window.location.hash === ""){
                    if (customer.isLoggedIn() && quote.isVirtual()) {
                        this.isVisible(false);
                        return stepNavigator.setHash('payment');
                    }
                    if (customer.isLoggedIn() && !quote.isVirtual()) {
                        this.isVisible(false);
                        return stepNavigator.setHash('shipping');
                    }
                    else {
                        this.isVisible(true);
                        return stepNavigator.setHash(this.stepCode);
                    }
                }

            },

            navigateToNextStep: function (){
               stepNavigator.next();
            }

        });
});
