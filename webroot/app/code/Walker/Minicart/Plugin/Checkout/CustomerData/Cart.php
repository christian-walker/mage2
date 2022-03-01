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
        $result['promotions'][] = ['id' => 'promo-1', 'title' => 'Promo 1', 'value' => 100, 'leftPosition' => 30];
        $result['promotions'][] = ['id' => 'promo-2', 'title' => 'Promo 2', 'value' => 250, 'leftPosition' => 70];
        $result['promotions'][] = ['id' => 'promo-3', 'title' => 'Promo 3', 'value' => 300, 'leftPosition' => 87];
        $result['promotion_amount_max'] = 300;
//        $result['promotion_amount_max'] = $this->minicartConfig->getPromotionAmount();
        $result['isEnabled'] = $this->minicartConfig->isEnabled();

        return $result;
    }
}
