define(
    [
        'jquery',
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'mage/translate',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/checkout-data',
        'uiRegistry'
    ],
    function (
        $,
        ko,
        Component,
        _,
        stepNavigator,
        $t,
        customer,
        quote,
        checkoutData,
        registry
    ) {
        'use strict';

        let selectedMethod = quote.paymentMethod;

        return Component.extend({
            defaults: {
                template: 'MLN_CheckoutPages/review.html',
                listens: {
                    // Runs policyValidation when the checkbox from policy-check component is checked or unchecked
                    // Also passes value to method
                    "checkout.steps.review-step.policy-check-main:isPolicyAgreedMain":"policyValidation"
                },
                links: {
                    // policyAgreement changes whenever isPolicyCheckboxMethod value changes,
                    // however it doesn't change before policyValidation runs
                    // Only here for reference
                    deliveryDateInput: "checkout.steps.shipping-step.shippingAddress.before-shipping-method-form.deliveryDate.delivery-date-fieldset.mln_delivery_date:shiftedValue",
                    ccLast4: "checkout.steps.billing-step.payment.payments-list.authnetcim:creditCardLast4",
                    ccType: "checkout.steps.billing-step.payment.payments-list.authnetcim:creditCardType",
                    savedCard: "checkout.steps.billing-step.payment:savedSelectedCard"
                }
            },
            //add here your logic to display step,
            isVisible: ko.observable(false),
            paymentVisible: ko.observable(false),
            customerEmail: ko.observable(customer.customerData.email),
            isLoggedIn: customer.isLoggedIn(),
            selectedPaymentMethod: selectedMethod,
            quoteIsVirtual: quote.isVirtual(),
            policyAgreement: ko.observable(),

            /**
             *
             * @returns {*}
             */
            // isVisibleElement: function () {
            //     return stepNavigator.isProcessed('payment');
            // },

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

            getDeliveryDate: function (){
                if(this.isVisible()) {
                    if (this.deliveryDateInput) {
                        return this.deliveryDateInput;
                    } else {
                        return $t('Delivery date not provided');
                    }
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

            billingAddress: ko.computed(function(){
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

            }),


            initialize: function () {
                this._super();
                // register your step
                stepNavigator.registerStep(
                    'review_info', //step_code will be used as component template html file <li> id
                    null,
                    $t('Review'),
                    //observable property with logic when display step or hide step
                    this.isVisible,
                    //navigate function call from below
                    _.bind(this.navigate, this),
                    /**
                     * sort order value
                     * 'sort order value' < 10: step displays before shipping step (first step);
                     * 10 < 'sort order value' < 20 : step displays between shipping and payment step
                     * 'sort order value' > 20 : step displays after payment step at the end.(last step)
                     */
                    30
                );

                return this;
            },

            isFreeMethod: function (){
                let paymentMethodQuote = this.selectedPaymentMethod(),
                    paymentMethod = {};

                if(paymentMethodQuote === null){
                    return false;
                }

                paymentMethod['title'] = paymentMethodQuote.title;
                paymentMethod['method'] = paymentMethodQuote.method;

                for (var payment in paymentMethod){
                        if(paymentMethod[payment] === 'free'){
                            return true;
                        }
                }

            },

            getCCType: function (){
                let authnetcim = $.localStorage.get('authnetcim_info');

                if(this.ccType){
                    return this.ccType;
                }

                if(authnetcim.cc_type){
                    return authnetcim.cc_type;
                }

                return false;
            },

            getCCLast4: function (){
                let authnetcim = $.localStorage.get('authnetcim_info');

                if(this.ccLast4){
                    return this.ccLast4;
                }
                if(this.savedCard){

                    let card = this.savedCard;
                    card = card.split("-").pop();

                    return card;
                }
                if(authnetcim.cc_last4){
                    return authnetcim.cc_last4;
                }

                return false;
            },

            /**
             * The navigate() method is responsible for navigation between checkout step
             * during checkout. You can add custom logic, for example some conditions
             * for switching to your custom step
             *
             * when directly refresh page with #review_info code below function call
             */
            navigate: function () {
                this.isVisible(true);
            },

            /**
             * @returns void
             */
            navigateToNextStep: function () {
                stepNavigator.next();
            },

            policyValidation: function(value){
                let policyAgreementElement = $('.policy-agreement-main');

                this.policyAgreement(value);

                if(this.policyAgreement()){
                    policyAgreementElement.removeClass('error');
                }
                return this.policyAgreement();

            },

            placeorder: function(){
                let policyAgreementElement = $('.policy-agreement-main'),
                    self = this;

                if(policyAgreementElement.length){
                    if(self.policyAgreement()){
                        policyAgreementElement.removeClass('error');
                        $('.payment-method._active .primary button.checkout').trigger('click');
                    } else{
                        policyAgreementElement.addClass('error');
                    }
                } else{
                    $('.payment-method._active .primary button.checkout').trigger('click');
                }
            },

            backToShipping: function() {
                stepNavigator.navigateTo('shipping');
            },

            editBillingAddress: function(){
                let authnetcimFormRegistry = registry.get('checkout.steps.billing-step.payment.payments-list.authnetcim-form'),
                    lastSelectedBillingAddress = quote.billingAddress();

                quote.billingAddress(null);
                authnetcimFormRegistry.isAddressDetailsVisible(false);
            },

            backToBilling: function() {
                this.editBillingAddress();

                $('.payment-method._active .primary button.checkout').removeClass("disabled");
                stepNavigator.navigateTo('payment');
            },

            backToContact: function() {
                stepNavigator.navigateTo('contact');
            },

            isVisibleElement: function () {
                return !quote.isVirtual() && stepNavigator.isProcessed('payment');
            },

            isVisibleLoadElement: function (){
                if(stepNavigator.isProcessed('payment')){
                    return true;
                }
                return false;
            },
        });
    }
);
