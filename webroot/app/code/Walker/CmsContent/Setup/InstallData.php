<?php
namespace Walker\CmsContent\Setup;

use Magento\Cms\Model\BlockFactory;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;

class InstallData implements InstallDataInterface
{
    private $blockFactory;

    public function __construct(BlockFactory $blockFactory) {
        $this->blockFactory = $blockFactory;
    }

    public function install(
        ModuleDataSetupInterface $setup,
        ModuleContextInterface $context
    ) {
        $cmsBlockData = [
            'title' => "COVID-19 Message",
            'identifier' => "covid_message",
            'content' => "<p>Due to Covid-19 and the high volume of orders, we are experiencing a slight delay in outbound shipments. Orders that would normally be processed the same day MAY NOT ship out until 1 to 2 business days later. If you have concerns for expedited shipments, please reach out to our Sales Team at 610-831-5020. Thank you
</p>",
            'is_active' => 1,
            'stores' => [0],
            'sort_order' => 0
        ];
        $this->blockFactory->create()->setData($cmsBlockData)->save();
    }
}
