<?php

namespace MLN\CheckoutPages\Model;

class GiftMessageConfigProvider extends \Magento\GiftMessage\Model\GiftMessageConfigProvider
{
    public function getConfig()
    {
        $config = parent::getConfig();
        return ['giftMessageConfig' => $config];
    }
}
