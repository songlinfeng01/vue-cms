<template>
    <div>
        <!--轮播图组件-->
        <swiper :lunBoList="lunBoList" :isfull="true"></swiper>


        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../lib/images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../lib/images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goods">
                    <img src="../../lib/images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../lib/images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../lib/images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../lib/images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import swiper from  '../subcomponents/swiper.vue';

    export default {
        data () {
            return {
                lunBoList : []
            }
        },
        created () {
            this.getLunbo();
        },
        methods : {
            getLunbo () {
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo')
                    .then(result => {
                        if (result.body.status === 0) {
                            //console.log(result.body.message);
                            this.lunBoList = result.body.message;
                        } else {
                            Toast('消息获取失败');
                        }

                    })
            }
        },
        components : {
            swiper
        }
    }
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9{
    background-color: #fff;
    li{

        width: 33.333333%;
        border: none;
        img{
            width: 60px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
}
</style>