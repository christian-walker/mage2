<?php
namespace MLN\Minicart\Plugin\Checkout\CustomerData;

use MLN\Minicart\Model\Config;

class Cart {

    /**
     * @var Config
     */
    private $minicartConfig;


    /**
     * Config constructor.
     * @param Config $minicartConfig
     */
    public function __construct(Config $minicartConfig)
    {
        $this->minicartConfig = $minicartConfig;
    }


    public function afterGetSectionData(\Magento\Checkout\CustomerData\Cart $subject, array $result)
    {
        $result['promotion_amount_max'] = $this->minicartConfig->getPromotionAmount();
        $result['isEnabled'] = $this->minicartConfig->isEnabled();
        return $result;
    }
}
