<template>
    <div>
        <ul class="mui-table-view">


            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/newsList/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>{{item.add_time | dataFormat}}</span>
                            <span>{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        data () {
            return {
                newsList : []
            }
        },
        created(){
            this.getNewsList();
        },
        methods : {

            getNewsList(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist')
                    .then(result => {
                        if (result.body.status === 0) {
                            console.log(result);
                            this.newsList = result.body.message;
                        } else {
                            Toast('消息获取失败');
                        }
                    })
            }
        }
    }


</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>