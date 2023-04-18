import GAsideMenu from '@/components/GAsideMenu';
import GBreadcrumb from '@/components/GBreadcrumb';
import GDropdown from '@/components/GDropdown';
import GFormCreator from '@/components/GFormCreator';
import GTable from '@/components/GTable';
import GColumn from '@/components/GColumn';


// 自动引动 require.context('../components/xxx',true,/\.vue$/)
// Vue.use({ install(Vue) })
function install(Vue) {
    console.log(GTable)
    Vue.component(GAsideMenu.name, GAsideMenu);
    Vue.component(GBreadcrumb.name, GBreadcrumb);
    Vue.component(GDropdown.name, GDropdown);
    Vue.component(GFormCreator.name, GFormCreator);
    Vue.component(GTable.name, GTable);
    Vue.component(GColumn.name, GColumn);
}

export default {
    install
}

