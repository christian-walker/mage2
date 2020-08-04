<?php

namespace Walker\PriceRange\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\Registry;

class Index extends Action
{
    /**
     * @var JsonFactory
     */
    protected $resultJsonFactory;

    /**
     * @var PageFactory
     */
    protected $resultPageFactory;

    /**
     * @param Context $context
     */

    /**
     * @var CategoryRepositoryInterface
     */
    protected $categoryRepository;

    /**
     * @var Registry
     */
    protected $coreRegistry;

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $_storeManager;


    /**
     * Index constructor.
     * @param Context $context
     * @param JsonFactory $resultJsonFactory
     * @param PageFactory $resultPageFactory
     */

    public function __construct(
        Context $context,
        Registry $coreRegistry,
        JsonFactory $resultJsonFactory,
        PageFactory $resultPageFactory,
        StoreManagerInterface $storeManager,
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->_coreRegistry = $coreRegistry;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->resultPageFactory = $resultPageFactory;
        $this->_storeManager = $storeManager;
        $this->categoryRepository = $categoryRepository;
        parent::__construct($context);
    }


    public function execute()
    {
            $store = $this->_storeManager->getStore();
            $category = $this->categoryRepository->get(
                $store->getRootCategoryId()
            );

            $this->_coreRegistry->register('current_category', $category);

            $resultPage = $this->resultPageFactory->create();
            $resultPage->getLayout()->getBlock('page.main.title')->setPageTitle(__('Results & Products'));
            return $resultPage;
    }
}
?>
