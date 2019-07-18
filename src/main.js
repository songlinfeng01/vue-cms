import Vue from 'vue';

import app from './App.vue';

//导入mint-ui组件  按需导入
import {Header} from 'mint-ui';
//注册组件
Vue.component(Header.name,Header);

//导入mui的样式
import './lib/mui/css/mui.min.css';



const vm = new Vue({
    el : '#app',
    data : {},
    methods : {},
    render : c => c(app),
});