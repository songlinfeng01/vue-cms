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

//导入vuex组件 注册
import Vuex from 'vuex';
Vue.use(Vuex);

//获取本地存储的car
let car = JSON.parse(localStorage.getItem('car') || '[]');

//创建store
let store = new Vuex.Store({
    state : {
        //购物车中商品的数据，用一个数组存起来，在car数组中，存储一些商品的对象
        //商品对象模型{id:商品id,count:购买数量，price:单价，selected:是否被选中}
        car

    },
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            });

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            //localStorage.setItem('car', JSON.stringify(state.car));
            localStorage.setItem('car',JSON.stringify(state.car));
        },

        updateGoodsInfo (state,goods) {
            state.car.forEach( item => {
                if (item.id == goods.id) {
                    item.count = parseInt(goods.count);
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeFromCar (state,id) {
            state.car.some( (item,i) => {
                if ( item.id === id ) {
                    state.car.splice(i,1);
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateSelected (state,info) {
            state.car.some (item => {
                if ( item.id === info.id) {
                    item.selected = info.val;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
        }

    },
    getters : {
        getAllCount (state) {
            let c = 0 ;
            state.car.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount (state) {
            let o = {};
            state.car.forEach(item => {
                o[item.id] =item.count;
            });
            return o;
        },
        getGoodsSelected (state) {
            let o = [];
            state.car.forEach( item => {
                o[item.id] = item.selected;
            });
            return o;
        },
        getAllGoods (state) {
            let total = 0;
            let totalPrice = 0;
            state.car.forEach(item => {
                if (item.selected) {
                    total += item.count;
                    totalPrice += item.count * item.price;
                }
            });
            return {total,totalPrice};
        }

    }
});


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
    router,
    //挂载store管理对象
    store
});