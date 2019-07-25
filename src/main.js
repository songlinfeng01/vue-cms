//js的基本入口



import Vue from 'vue';

//1.1导入路由模块
import VueRouter from 'vue-router';
//1.2安装路由
Vue.use(VueRouter);
//1.3导入自己的路由模块
import router from './router';

import app from './App.vue';

//导入mint-ui组件  按需导入
import {Header} from 'mint-ui';
//注册组件
Vue.component(Header.name,Header);

//导入mui的样式
import './lib/mui/css/mui.min.css';

//导入扩展图标样式
import './lib/mui/css/icons-extra.css';

// 导入扩展图标样式
import './lib/mui/css/icons-extra.css';

//导入mint-ui的轮播组件
// import {Swipe, SwipeItem, Button ,Lazyload} from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui';
Vue.use(MintUI);

//导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//导入moment插件  时间格式化
import moment from 'moment';

//安装图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


//定义全局的过滤器
Vue.filter('dateFormat',(dataStr,pattern='YYYY-mm-DD HH:mm:ss') => {
    return moment(dataStr).format(pattern);
});

//全局设置post提交表单数据格式
Vue.http.options.emulateJSON = true;


const vm = new Vue({
    el : '#app',
    data : {},
    methods : {},
    render : c => c(app),
    //1.4挂载路由对象
    router
});