/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'jquery',
    'ko',
    'underscore',
    'mage/loader',
    'sidebar',
    'mage/translate',
    'mage/dropdown',
    'Magento_Ui/js/modal/modal',
    'redirectUrl',
    'jquery/ui'

], function (Component, customerData, $, ko, _, loader) {
    'use strict';

    var sidebarInitialized = false,
        addToCartCalls = 0,
        miniCart,
        miniCartSlide;

    miniCart = $('[data-block=\'minicart\']');
    miniCartSlide = $('[data-block=\'minicart-slide\']');

    /**
     * @return {Boolean}
     */
    function initSidebar() {
        var loaderImage = $('[data-block=\'minicart-slide\'] .minicart-loader').loader();

        if (miniCartSlide.data('mageSidebar')) {
            miniCartSlide.sidebar('update');
        }

        if (!$('[data-role=product-item]').length) {
            return false;
        }
        miniCartSlide.trigger('contentUpdated');

        if (sidebarInitialized) {
            loaderImage.loader('hide');
            return false;
        }
        sidebarInitialized = true;

        loaderImage.loader('hide');

        miniCartSlide.sidebar({
            'targetElement': 'div.block.block-minicart',
            'url': {
                'checkout': window.checkout.checkoutUrl,
                'update': window.checkout.updateItemQtyUrl,
                'remove': window.checkout.removeItemUrl,
                'loginUrl': window.checkout.customerLoginUrl,
                'isRedirectRequired': window.checkout.isRedirectRequired
            },
            'button': {
                'checkout': '#top-cart-btn-checkout',
                'remove': '#mini-cart a.action.delete',
                'close': '#btn-minicart-close'
            },
            'showcart': {
                'parent': 'span.counter',
                'qty': 'span.counter-number',
                'label': 'span.counter-label'
            },
            'minicart': {
                'list': '#mini-cart',
                'content': '#minicart-content-wrapper',
                'qty': 'div.items-total',
                'subtotal': 'div.subtotal span.price',
                'maxItemsVisible': window.checkout.minicartMaxItemsVisible
            },
            'item': {
                'qty': ':input.cart-item-qty',
                'button': ':button.update-cart-item'
            },
            'confirmMessage': $.mage.__('Are you sure you would like to remove this item from the shopping cart?')
        });
    }

    miniCartSlide.on('modalopen', function () {
        initSidebar();
    });

    return Component.extend({
        shoppingCartUrl: window.checkout.shoppingCartUrl,
        maxItemsToDisplay: window.checkout.maxItemsToDisplay,
        cart: {},

        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        /**
         * @override
         */
        initialize: function () {
            var self = this,
                cartData = customerData.get('cart');

            this.update(cartData());
            cartData.subscribe(function (updatedCart) {
                // Display the loading image immediately to give the user feedback that they've clicked the button

                addToCartCalls--;
                this.isLoading(addToCartCalls > 0);

                sidebarInitialized = false;
                this.update(updatedCart);

                initSidebar();
            }, this);
            $('[data-block="minicart-slide"]').on('contentLoading', function () {
                addToCartCalls++;
                self.isLoading(true);
            });

            if (
                cartData().website_id !== window.checkout.websiteId && cartData().website_id !== undefined ||
                cartData().storeId !== window.checkout.storeId && cartData().storeId !== undefined
            ) {
                customerData.reload(['cart'], false);
            }

            return this._super();
        },
        //jscs:enable requireCamelCaseOrUpperCaseIdentifiers

        isLoading: ko.observable(false),
        initSidebar: initSidebar,

        /**
         * Close mini shopping cart.
         */
        closeMinicart: function () {
            $('.modals-wrapper').find('[data-role="dropdownDialog"]').modal('closeModal');
        },

        /**
         * Close mini shopping cart.
         */
        proceedToCheckout: function () {
            $('#top-cart-btn-checkout').redirectUrl({url: window.checkout.checkoutUrl});
        },

        /**
         * @return {Boolean}
         */
        closeSidebar: function () {
            var minicart = $('[data-block="minicart-slide"]');

            minicart.on('click', '[data-action="close"]', function (event) {
                event.stopPropagation();
                minicart.find('[data-role="dropdownDialog"]').modal('closeModal');
            });

            return true;
        },

        /**
         * @param {String} productType
         * @return {*|String}
         */
        getItemRenderer: function (productType) {
            return this.itemRenderer[productType] || 'defaultRenderer';
        },

        /**
         * Update mini shopping cart content.
         *
         * @param {Object} updatedCart
         * @returns void
         */
        update: function (updatedCart) {
            _.each(updatedCart, function (value, key) {
                if (!this.cart.hasOwnProperty(key)) {
                    this.cart[key] = ko.observable();
                }
                this.cart[key](value);
            }, this);
        },

        /**
         * Get cart param by name.
         * @param {String} name
         * @returns {*}
         */
        getCartParam: function (name) {
            if (!_.isUndefined(name)) {
                if (!this.cart.hasOwnProperty(name)) {
                    this.cart[name] = ko.observable();
                }
            }

            return this.cart[name]();
        },

        /**
         * Returns array of cart items, limited by 'maxItemsToDisplay' setting
         * @returns []
         */
        getCartItems: function () {
            var items = this.getCartParam('items') || [];

            items = items.slice(parseInt(-this.maxItemsToDisplay, 10));

            return items;
        },

        /**
         * Returns count of cart line items
         * @returns {Number}
         */
        getCartLineItemsCount: function () {
            var items = this.getCartParam('items') || [];

            return parseInt(items.length, 10);
        }
    });
});
