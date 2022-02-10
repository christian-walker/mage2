define([
    'jquery',
    'ko',
    'uiRegistry',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/model/customer',
    'mage/translate',
], function ($,ko, registry, stepNavigator, quote, customer, $t) {
    'use strict';


    var mixin = {

        defaults: {
            tracks: {
                creditCardNumberFormatted: true,
            },
            links: {
                // policyAgreement changes whenever isPolicyCheckboxMethod value changes,
                // however it doesn't change before policyValidation runs
                // Only here for reference
                deliveryDateInput: "checkout.steps.shipping-step.shippingAddress.before-shipping-method-form.deliveryDate.delivery-date-fieldset.mln_delivery_date:shiftedValue",
                ccNumber: "checkout.steps.billing-step.payment.payments-list.authnetcim:creditCardNumber",
                cvvNum: "checkout.steps.billing-step.payment.payments-list.authnetcim:creditCardVerificationNumber",
                storedCards: "checkout.steps.billing-step.payment.payments-list.authnetcim:storedCards",
                billingFormVisible: "checkout.steps.billing-step.payment.payments-list.authnetcim-form.billingAddressList:isNewAddressSelected",
                selectedAddress: "checkout.steps.billing-step.payment.payments-list.authnetcim-form.billingAddressList:selectedAddress"
            }
        },

        isLoggedIn: customer.isLoggedIn(),
        customerEmail: ko.observable(customer.customerData.email),
        errorValidationMessage: ko.observable(false),
        selectedPaymentMethod: quote.paymentMethod,
        billingInfoVisible: ko.observable(false),
        savedSelectedCard: ko.observable(),

        initialize: function () {
            var self = this;
            // set visible to be initially false to have your step show first

            this._super();

            return this;
        },

        isVisibleElement: function () {
            return !quote.isVirtual() && stepNavigator.isProcessed('shipping');
        },

        isVisibleLoadElement: function (){
            if(stepNavigator.isProcessed('shipping')){
                return true;
            }
            return false;
        },

        getEmail: function (){
            if(this.isVisible()){
                if(this.isLoggedIn){
                    return this.customerEmail();
                }
                return quote.guestEmail;
            }else{
                return $t('Email not provided.');
            }
        },

        billingAddress: function(){
            if(quote.billingAddress() !== null){
                var addressQuote = quote.billingAddress();
                var address = {};

                if(addressQuote.firstname){
                    address['firstname'] = addressQuote.firstname;
                    address['lastname'] = addressQuote.lastname;
                    address['postcode'] = addressQuote.postcode;
                    address['city'] = addressQuote.city;
                    address['country_id'] = addressQuote.countryId;
                    address['region'] = addressQuote.region;
                    address['region_id'] = addressQuote.regionId;

                    var street = '';
                    $.each(addressQuote.street, function(i, e){
                        street += ' ' + e;
                    });
                    address['street'] = street.trim();

                    return address;
                }
                return false;

            } else{
                return false;
            }


        },

        shippingAddress: function(){
            if(quote.shippingAddress() !== null) {
                var addressQuote = quote.shippingAddress();
                var address = {};

                if(addressQuote.firstname){
                    address['firstname'] = addressQuote.firstname;
                    address['lastname'] = addressQuote.lastname;
                    address['postcode'] = addressQuote.postcode;
                    address['city'] = addressQuote.city;
                    address['country_id'] = addressQuote.countryId;
                    address['region'] = addressQuote.region;
                    address['region_id'] = addressQuote.regionId;

                    var street = '';
                    $.each(addressQuote.street, function (i, e) {
                        street += ' ' + e;
                    });
                    address['street'] = street.trim();

                    return address;
                }

                return false;

            }
            return false;

        },

        backToShipping: function() {
            stepNavigator.navigateTo('shipping');
        },

        backToContact: function() {
            stepNavigator.navigateTo('contact');
        },

        navigateToNextStep: function (){
                if(this.updateBillingAddress()){

                    if(this.checkPaymentSelected()){
                        stepNavigator.next();
                    }
                }
        },

        editBillingAddress: function(){
            let authnetcimFormRegistry = registry.get('checkout.steps.billing-step.payment.payments-list.authnetcim-form'),
                lastSelectedBillingAddress = quote.billingAddress();

            quote.billingAddress(null);
            authnetcimFormRegistry.isAddressDetailsVisible(false);
        },

        updateBillingAddress: function (){
            if(this.billingFormVisible || this.selectedAddress){
                $('.payment-method._active .action-update.billing-address-form').trigger('click');

                if(quote.billingAddress()){
                    return true;
                } else{
                    this.errorValidationMessage(
                        $t('Please make sure your billing information is entered correctly.')
                    );
                    return false;
                }

            }
            if(!this.billingFormVisible && quote.billingAddress()){
                return true;
            }
        },

        getSelectedCard: function (value){
            if(value){
                this.cardSelected(true);
                return true;
            }
            return false;
        },

        checkPaymentSelected: function (paymentData){

            let paymentMethodQuote = this.selectedPaymentMethod(),
                paymentMethod = {};


            if(paymentMethodQuote === null){
                this.errorValidationMessage(
                    $t('Please make sure your payment information is entered correctly.')
                );
                return false;
            }

            paymentMethod['title'] = paymentMethodQuote.title;
            paymentMethod['method'] = paymentMethodQuote.method;

            for (var payment in paymentMethod){
                if(paymentMethod[payment] === 'free'){
                    return true;
                }
                if(paymentMethod[payment] === 'authnetcim'){
                    let authnetcimRegistry = registry.get('checkout.steps.billing-step.payment.payments-list.authnetcim'),
                    selectedCard = authnetcimRegistry.selectedCard();

                    // Checks if there's a card selected first
                    if(this.storedCards.length){
                        for (var card of this.storedCards){

                            if(card.id === selectedCard){
                                this.savedSelectedCard(card.label);
                                this.errorValidationMessage(false);
                                return true;
                            }
                        }
                    }
                    if (this.cvvNum == '' || this.ccNumber == '' || this.cvvNum.length < 3 || this.ccNumber.length < 15) {
                        this.errorValidationMessage(
                            $t('Please make sure your payment information is entered correctly.')
                        );
                        return false;
                    }
                    else{
                        this.errorValidationMessage(false);
                        return true;
                    }
                }
                if(paymentMethod[payment] === 'paypal_express'){
                    return true;
                }
                if(paymentMethod[payment] === 'checkmo'){
                    return true;
                }
            }

        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
