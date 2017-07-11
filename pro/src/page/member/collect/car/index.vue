<template>
	<div class="carCollect">
    
	    <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的收藏"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-collect-wrap" v-if="carCollectList.length>=0">
                        <ul class="m-car-lst f__clearfix">
                            <template v-for="(item,index) in carCollectList">
                                <li class="u-item" :key="item">
                                    <a class="u-lk-box" @click="enterCar(item.id)">
                                        <div class="u-pic-box">
                                            <span class="u-mark">{{item.authType}}</span>
                                            <div class="u-pic">
                                                <img :src="item.imgUrl" :alt="item.title"/>
                                            </div><!-- 图片容器 -->
                                        </div><!-- 图片容器 -->
                                        <div class="u-con-box">
                                            <div class="u-mask">
                                            </div><!-- 遮罩内容-->
                                            <div class="u-con">
                                                <div class="u-tit">{{item.title}}</div><!-- 标题 -->
                                                <div class="u-price">批发价：
                                                    <em class="vital">{{item.price | priceToFixed(2)}}</em>
                                                </div><!-- 价格 -->
                                                <div class="u-merchant">车商：{{item.cdgName}}</div><!-- 车商 -->
                                                <div class="u-other">{{item.city}} · {{item.plateDate | dateYearFormat}} · {{item.mileage | mileFn(1)}}</div><!-- 其他 -->
                                                <div class="btn-wrap">
                                                    <a class="u-btn cancel" 
                                                        @click.stop="delCar(item.id,index)" 
                                                        title="取消收藏">取消收藏
                                                    </a>
                                                </div>
                                            </div><!-- 内容 -->
                                        </div><!-- 内容容器 -->
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>

                    <not-content
                        v-if="carCollectList.length==0"
                        speak="您暂时还没有收藏任何车辆，赶紧去B2B大厅找找吧!"
                        >
                        <router-link :to="{path:'/'}" class="u-lk" tag="a">网站首页&gt;</router-link>
                        <router-link :to="{path:'/b2bHall'}" class="u-lk" tag="a">B2B大厅&gt;</router-link>
                    </not-content><!-- 缺省组件 -->

                </member-inner>

            </div><!-- 车辆收藏内容 -->
        </member-layout>
	</div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 收藏车辆信息的构造类
    import {carClass} from "base/class/collect.js"

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 
    // 会员中心缺省组件
    import notContent from 'components/member/notCon.vue' 

	export default {
        
        name: "carCollect",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            notContent,
        },
        // 数据
        data() {
            return{
                // 收藏的车辆列表集合
                carCollectList: [],
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            // 获取我收藏的车辆列表
            this.getMerchantCollect();
        },
        //退出的生命周期钩子
        deactivated(){
            this.carCollectList = []
        },
        // 自定义函数(方法)
        methods: {
            // 获取我收藏的车辆列表
            getMerchantCollect(){
                let data = {
                    ActType: 'MyList',
                }
                api.myFavoriteCar(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        if(res.data.length==0){
                            this.carCollectList = [];
                            return;
                        }
                        this.carCollectList = this._normalizeCar(res.data);
                    }
                })
            },
            // 格式化车辆信息列表
            _normalizeCar(list) {
                let arr = []
                list.forEach(item => {
                    arr.push(new carClass(item));
                });
                return arr;
            },
            // 进入车辆详情
            enterCar(id){
                this.$router.push({ path: '/b2bCar', query: { CarId: id }})
            },
            // 取消车辆收藏
            delCar(id,index){
                let data = {
                    ActType: 'Delete',
                    CarId: id,
                }
                api.myFavoriteCar(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功取消收藏',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        // 删除对应车行，同步数据
                        this.carCollectList.splice(index, 1)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '删除失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            }
        },
        
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
