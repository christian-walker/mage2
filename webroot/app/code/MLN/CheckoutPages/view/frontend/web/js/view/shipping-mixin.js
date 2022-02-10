define([
    'jquery',
    'ko',
    'uiRegistry',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/model/customer',
    'mage/translate'
], function ($,ko, registry, stepNavigator, quote, customer, $t) {
    'use strict';



    var mixin = {
        isLoggedIn: customer.isLoggedIn(),
        visible: ko.observable(!quote.isVirtual()),
        quoteIsVirtual: quote.isVirtual(),
        customerEmail: ko.observable(customer.customerData.email),

        isVisibleElement: function () {
            return !quote.isVirtual() && stepNavigator.isProcessed('contact');
        },

        navigateToNextStep: function (){
            stepNavigator.next();
        },

        backToContact: function() {
            stepNavigator.navigateTo('contact');
        },

        getEmail: function (){
            if(this.visible()){
                if(this.isLoggedIn){
                    return this.customerEmail();
                }
                return quote.guestEmail;
            } else{
                return $t('Email not provided.');
            }
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
