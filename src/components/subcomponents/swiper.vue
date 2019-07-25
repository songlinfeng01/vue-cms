<template>
    <div>
        <mt-swipe :auto="4000">
            <!--
                谁使用轮播图组件，谁就传递一个lunBoList
                lunBoList是父组件向子组件传值
            -->
            <mt-swipe-item v-for="item in lunBoList" :key="item.id">
                <img :src="item.img" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props : ['lunBoList','isfull']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{

        text-align: center;
        height: 200px;
        .mint-swipe-items-wrap{
            img{
                /*width: 100%;*/
                height: 100%;
            }
        }
    }
    .full{
        width: 100%;
    }
</style>