define([
    'ko',
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Magento_Catalog/js/price-utils',
    'Mirasvit_Credit/js/action/apply-credit'
], function (ko, Component, quote, priceUtils, applyCreditAction) {
    'use strict';

    var mixin = {

        totals: quote.getTotals(),

        getValue: function () {
            for (var i in this.totals().total_segments) {
                var total = this.totals().total_segments[i];

                if (total.code === 'credit') {
                    return total.value;
                }
            }

            return 0;
        },

        formatBalanceAmount: function () {
            let amountUsed = this.getValue(),
            balance = this.amount;
            balance += amountUsed;
            return priceUtils.formatPrice(balance, quote.getPriceFormat());
        },


    };

    return function (target) {
        return target.extend(mixin);
    };
});
