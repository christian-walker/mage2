var config = {
    map: {
        "*":{
            "Magento_Checkout/template/minicart/item/default.html":
                "Walker_Minicart/template/minicart/item/default.html",
            "Magento_Checkout/js/view/minicart": "Walker_Minicart/js/view/minicart"
        }
    },
    config: {
        mixins: {
            // "Magento_Checkout/js/view/minicart": {
            //     "Walker_Minicart/js/view/minicart-mixin": true
            // },
            // "Magento_Checkout/js/view/minicart":{
            //     "Walker_Minicart/js/view/minicart-mixin": true
            // },
            "Magento_Checkout/js/sidebar": {
                "Walker_Minicart/js/sidebar": true
            }
        }
    }
};
