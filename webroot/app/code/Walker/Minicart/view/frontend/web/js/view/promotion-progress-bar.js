define([
    'jquery', 'uiComponent', 'ko','uiRegistry','jquery/ui'],


    function ($, Component, ko, registry){
    'use strict';

        return Component.extend({
            defaults: {
                exports: {
                    cart: "minicart_content.subtotal.container.subtotal.subtotal.totals:cart"
                },
                links: {
                    miniCart: "minicart_content.subtotal.container.subtotal.subtotal.totals:cart"
                },
                listens: {
                    "minicart_content.subtotal.container.subtotal.subtotal.totals:cart": "getPromotionProgress"
                }

            },

            amountLeft: ko.observable(),
            subtotal: ko.observable(),
            promoValue1: ko.observable(),
            promoValue2: ko.observable(),
            promoValue3: ko.observable(),


            initialize: function () {
                this._super();
            },

            promotionsList: function(){

                return this.miniCart.promotions;

            },

            promotionAmount: function (){
                let promos = this.miniCart.promotions;

                if(promos) {

                    //let promoAmounts = [];

                    for (let i = 0; i < promos.length; i++) {

                        let promoValue = promos[i].value,
                            promoTitle = promos[i].title;

                        if(promoValue > this.subtotal()){
                            return promoValue - this.subtotal() + ' for ' + promoTitle;
                        }
                    }
                }
            },


            /**
             * Returns progress bar value
             */
            getPromotionProgress: function (cartValue) {

                let cartRegistry = registry.get("minicart_content.subtotal.container.subtotal.subtotal.totals"),
                    subtotal = parseFloat(cartRegistry.cart().subtotalAmount).toPrecision(4),
                    newCartValue = parseFloat(cartValue.subtotalAmount).toPrecision(4),
                    maxValue = parseInt(this.miniCart.promotion_amount_max),
                    amountLeft,
                    promos = this.miniCart.promotions,
                    element = document.querySelector('.promotion');

                // Parsing again because rounding to 2 decimal places turns it back into a string

                subtotal = parseFloat(subtotal);
                newCartValue = parseFloat(newCartValue);

                // Assigns local subtotal to observable
                this.subtotal(subtotal);


                // Checks subtotal and promotion value existence, then compares to total and toggles class
                if(this.subtotal()){

                    this.promotionAmount();

                    if(promos) {

                        for (let i = 0; i < promos.length; i++) {

                            let id = promos[i].id,
                                title = promos[i].title,
                                promoValue = promos[i].value,
                                leftPosition = promos[i].leftPosition,
                                selector = $('.' + id);

                                if(element){
                                    selector.css('left', leftPosition+'%');
                                }



                                if (this.subtotal() >= promoValue) {
                                    // if class already exist do nothing
                                    selector.removeClass('_mln-green').hasClass('_mln-green');
                                    selector.addClass('_mln-green');
                                } else {
                                    selector.removeClass('_mln-green');
                                }

                        }
                    }

                }

                if(!isNaN(newCartValue)){
                    if(subtotal === newCartValue){

                        if(subtotal >= maxValue){
                            amountLeft = 0;
                            this.amountLeft(amountLeft);
                        }

                        if(subtotal >= maxValue){
                            amountLeft = 0;
                            this.amountLeft(amountLeft);
                        }

                        else{

                            // Round Parse and Round to 2 decimal places

                            amountLeft = maxValue - subtotal;

                            amountLeft = parseFloat(amountLeft.toFixed(2));

                            this.amountLeft(amountLeft);

                            if(amountLeft < 0){
                                this.amountLeft(maxValue) ;
                            }
                        }

                    }

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

            },

            /**
             *  Check if promotion is fulfilled
             */

            isFulfilled: function (value){
                if(this.subtotal() >= value){
                    return true;
                } else{
                    return false;
                }
            }
        });
});
