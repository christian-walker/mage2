define(
    [
        'jquery',
        'ko',
        'uiComponent',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/step-navigator',
    ],
    function (
        $,
        ko,
        Component,
        quote,
        stepNavigator
    ) {
        'use strict';

        return Component.extend({

            policyAgreement: ko.observable(),
            isVisible: ko.observable(false),
            customerEmail: ko.observable(),
            continueShoppingUrl: ko.observable(window.location.origin),

            defaults: {
                template: 'MLN_CheckoutPages/placeorder.html',
                links: {
                    // policyAgreement changes whenever isPolicyAgreed value changes,
                    // however it doesn't change before policyValidation runs
                    // Only here for reference
                    policyAgreement: "checkout.sidebar.summary.summary-placeorder.policy-check-summary:isPolicyAgreed",
                },
                listens: {
                    // Runs policyValidation when the checkbox from policy-check component is checked or unchecked
                    // Also passes value to method
                    "checkout.sidebar.summary.summary-placeorder.policy-check-summary:isPolicyAgreed":"policyValidation",
                    "checkout.steps.review-step:isVisible":"getVisibleElement"
                }
            },

            isVisibleElement: ko.observable(false),

            /**
             *
             * @returns {*}
             */


            getPaymentCode: function(){
                return this.item.method;
            },

            getVisibleElement: function (value){
                if(value){
                    return this.isVisibleElement(true);
                }
                return this.isVisibleElement(false);
                // isVisibleElement: function (value){
                //     if(window.location.hash === '#'+'review_info'){
                //         return true;
                //     }
                //     return false;
                // },
            },


            policyValidation: function(value){
                let policyAgreementElement = $('.policy-agreement');

                this.policyAgreement(value);

                if(this.policyAgreement()){
                    policyAgreementElement.removeClass('error');
                }
                return this.policyAgreement();

            },

            placeOrder: function(){
                let policyAgreementElement = $('.policy-agreement');

                if(policyAgreementElement.length){
                    if(this.policyAgreement()){
                        policyAgreementElement.removeClass('error');
                        $('.payment-method._active .primary button.checkout').trigger('click');
                    } else{
                        policyAgreementElement.addClass('error');
                    }
                } else{
                    $('.payment-method._active .primary button.checkout').trigger('click');
                }

            },

        });
    }
);
