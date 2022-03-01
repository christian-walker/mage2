define([
    'jquery', 'uiComponent', 'ko','jquery/ui'],


    function ($, Component, ko){
    'use strict';

        return Component.extend({
            defaults: {
                links: {
                    miniCart: "minicart_content.subtotal.container.subtotal.subtotal.totals:cart"
                },
                listens: {
                    "minicart_content.subtotal.container.subtotal.subtotal.totals:cart": "getPromotionProgress"
                }

            },

            amountLeft: ko.observable(),

            /**
             * Returns progress bar value
             */
            getPromotionProgress: function (cartValue) {
                let subtotal = parseFloat(this.miniCart.subtotalAmount).toPrecision(4),
                    newCartValue = parseFloat(cartValue.subtotalAmount).toPrecision(4),
                    maxValue = parseInt(this.miniCart.promotion_amount_max),
                    amountLeft;

                // Parsing again because rounding to 2 decimal places turns it back into a string

                subtotal = parseFloat(subtotal);
                newCartValue = parseFloat(newCartValue);

                if(!isNaN(newCartValue)){
                    if(subtotal !== newCartValue){
                        subtotal = newCartValue;

                        if(subtotal >= maxValue){
                            amountLeft = 0;
                            this.amountLeft(amountLeft);
                        } else{

                            // Round Parse and Round to 2 decimal places

                            amountLeft = maxValue - subtotal;

                            amountLeft = parseFloat(amountLeft.toFixed(2));

                            this.amountLeft(amountLeft);

                            if(amountLeft < 0){
                                this.amountLeft(maxValue) ;
                            }
                        }

                    }
                } else{

                    if(subtotal >= maxValue){
                        amountLeft = 0;
                        this.amountLeft(amountLeft);
                    } else{
                        amountLeft = maxValue - subtotal;

                        amountLeft = parseFloat(amountLeft.toFixed(2));

                        this.amountLeft(amountLeft);

                        if(amountLeft < 0){
                            this.amountLeft(maxValue) ;
                        }
                    }

                }


                $("#progressbar").progressbar({
                    max: maxValue,
                    value: subtotal
                });

            }
        });
});
