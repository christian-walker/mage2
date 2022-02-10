<?php
namespace MLN\CheckoutPages\Plugin\Checkout\Block\Checkout\AttributeMerger;

class Plugin
{
    public function afterMerge(\Magento\Checkout\Block\Checkout\AttributeMerger $subject, $result)
    {
        if (array_key_exists('street', $result)) {
            $result['street']['children'][0]['label'] = __('House Number and Street Name');
            $result['street']['children'][1]['label'] = __('Apartment, Suite, Unit, etc. (optional)');
            $result['street']['children'][2]['label'] = __('Gate Code, Delivery Notes');
        }

        return $result;
    }
}
