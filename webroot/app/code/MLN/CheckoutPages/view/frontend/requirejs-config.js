var config = {
    'map': {
      '*': {

          'Magento_Checkout/template/shipping.html':
            'MLN_CheckoutPages/template/shipping.html',

          'Magento_Checkout/template/shipping-address/shipping-method-item.html':
              'MLN_CheckoutPages/template/shipping-address/shipping-method-item.html',

          'Magento_Checkout/template/payment.html':
              'MLN_CheckoutPages/template/payment.html',

          'Magento_Checkout/template/estimation.html':
              'MLN_CheckoutPages/template/estimation.html',

          'Magento_Checkout/template/form/element/email.html':
              'MLN_CheckoutPages/template/form/element/email.html',

          'Magento_Checkout/template/billing-address.html':
              'MLN_CheckoutPages/template/billing-address.html',

          'Magento_Checkout/template/billing-address/actions.html':
              'MLN_CheckoutPages/template/billing-address/actions.html',

          'Magento_Checkout/template/onepage.html':
              'MLN_CheckoutPages/template/onepage.html',

          'Magento_Checkout/template/sidebar.html':
              'MLN_CheckoutPages/template/sidebar.html',

          'Magento_Tax/template/checkout/summary/grand-total.html':
              'MLN_CheckoutPages/template/checkout/summary/grand-total.html',

          'Magento_Checkout/template/summary/totals.html':
              'MLN_CheckoutPages/template/summary/totals.html',

          'MLN_ShippingProtection/template/summary/shipping-protection.html':
              'MLN_CheckoutPages/template/summary/shipping-protection.html',

          'Magento_Checkout/js/action/place-order': 'MLN_CheckoutPages/js/action/place-order',
          'Magento_Checkout/js/view/payment/default': 'MLN_CheckoutPages/js/view/payment/default',

          'ParadoxLabs_Authnetcim/template/payment/cc.html':
              'MLN_CheckoutPages/template/payment/cc.html',

          'formLabels': 'MLN_CheckoutPages/js/view/form_labels',

          'updateBtn': 'MLN_CheckoutPages/js/view/updateBtn',

          'ui/template/form/element/input.html':
              'MLN_CheckoutPages/template/form/element/input.html',

          'ui/template/form/element/select.html':
              'MLN_CheckoutPages/template/form/element/select.html',

          'Magento_GiftMessage/template/gift-message.html':
              'MLN_CheckoutPages/template/gift-message.html',

          'Magento_GiftMessage/template/gift-message-form.html':
              'MLN_CheckoutPages/template/gift-message-form.html',

          'Mirasvit_Credit/template/checkout/aheadworks/credit.html':
              'MLN_CheckoutPages/template/checkout/aheadworks/credit.html',

          'Magento_GiftMessage/js/view/gift-message':
              'MLN_CheckoutPages/js/view/gift-message',

          'Magento_GiftMessage/js/action/gift-options':
              'MLN_CheckoutPages/js/action/gift-options'
      }
    },
    'config': {
        'mixins': {
            'Magento_Checkout/js/view/shipping': {
                'MLN_CheckoutPages/js/view/shipping-mixin': true
            },
            'Magento_Checkout/js/view/payment': {
                'MLN_CheckoutPages/js/view/payment-mixin': true
            },

            'ParadoxLabs_Authnetcim/js/view/payment/method-renderer/authnetcim': {
                'MLN_CheckoutPages/js/view/payment/method-renderer/authnetcim-mixin': true
            },
            'ParadoxLabs_TokenBase/js/view/payment/method-renderer/cc': {
                'MLN_CheckoutPages/js/view/payment/method-renderer/cc-mixin': true
            },
            'Mirasvit_Credit/js/view/payment/credit': {
                'MLN_CheckoutPages/js/view/payment/credit-mixin': true
            }

        }
    },

};
