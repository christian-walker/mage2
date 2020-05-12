var config = {
    map: {
        '*': {
            coffee: 'Mage2tv_Js/js/requirejs-example',
            templateExample: 'Mage2tv_Js/js/template-example'
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/checkout-data': {
                'Mage2tv_Js/js/checkout-data-mixin': true
            }
        }
    }
};
