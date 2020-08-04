<?php

namespace Walker\PriceRange\Controller\Result;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\Result\JsonFactory;

class Result extends Action {

    /**
     * Result constructor.
     * @param Context $context
     * @param PageFactory $resultPageFactory
     * @param JsonFactory $resultJsonFactory
     */


    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        JsonFactory $resultJsonFactory)
    {
        $this->resultPageFactory = $resultPageFactory;
        $this->resultJsonFactory = $resultJsonFactory;
        return parent::__construct($context);
    }

    public function execute()
    {
        // TODO: Implement execute() method.

        $lowRange = $this->getRequest()->getParam('low_range');
        $highRange = $this->getRequest()->getParam('high_range');
        $result = $this->resultJsonFactory->create();
        $resultPage = $this->resultPageFactory->create();

        $block = $resultPage->getLayout()
                ->createBlock('Walker\PriceRange\Block\Index')
                ->setTemplate('Walker_PriceRange::results.phtml')
                ->setData('low_range', $lowRange)
                ->setData('high_range', $highRange)
                ->toHtml();

        $result->setData(['output' => $block]);
        return $result;
    }
}
