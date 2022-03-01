<?php


namespace MLN\Minicart\Model;


use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Encryption\EncryptorInterface;
use Magento\Store\Model\ScopeInterface;

class Config
{
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;


    /**
     * Config constructor.
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    public function isEnabled(): bool
    {
        return $this->scopeConfig->isSetFlag('minicart/general/enable', ScopeInterface::SCOPE_STORE);
    }

    public function getPromotionAmount(){
        return $this->scopeConfig->getValue('minicart/general/promotion_amount', ScopeInterface::SCOPE_STORE);
    }

}
