import './component';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'sidebar-filter',
    label: 'Filter',
    component: 'sw-cms-el-sidebar-filter',
    configComponent: 'sw-cms-el-config-sidebar-filter',
    previewComponent: 'sw-cms-el-preview-sidebar-filter',
    disabledConfigInfoTextKey: 'sw-cms.elements.infoTextFilterElement'
});
