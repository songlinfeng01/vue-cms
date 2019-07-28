<template>

    <div class="shopcar-container">
        <!--选择商品区域-->
        <div class="goods-list">
            <div class="mui-card"  v-for="(item,i) in goodslist">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])" v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 1. 创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>

        <!--结算区域-->

            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class='red'>{{this.$store.getters.getAllGoods.total}}</span> 件,总价: <span class="red">￥{{this.$store.getters.getAllGoods.totalPrice}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>



    </div>

</template>

<script>
    import numbox from '../subcomponents/shopCar_numbox.vue'
    export default {
        data () {
            return {
                goodslist : []
            }
        },
        created() {
            this.getGoodsList();
        },
        methods : {
            getGoodsList () {
                //1.获取到store中所有商品的id,然后用一个逗号隔开
                let idArr = [];
                this.$store.state.car.forEach( item => {
                    idArr.push(item.id);
                });

                if ( idArr.length<=0 ) {
                    return ;
                }

                this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+idArr.join(','))
                    .then(result => {
                        if (result.body.status === 0) {
                            this.goodslist = result.body.message;
                            //console.log(this.goodslist)
                        }
                    })

            },
            remove (id,index) {
                //点击删除，把商品从store中根据传递的id值删除，同时把当前组件goodslist中对应的商品使用index删除
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCar',id);
            },
            selectedChanged (id,val) {
                //商品是否勾选
                this.$store.commit('updateSelected',{id,val});
            }

        },
        components : {
            numbox
        }
    }
</script>


<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;
        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
            }
            h1 {
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }

</style>