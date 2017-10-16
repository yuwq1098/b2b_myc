<template>
    <!-- select选择框 -->
    <div class="srhSelect">
    	<div class="m-select">
    	    <ul class="u-select-lst" :class="{'isOverflow':selectList.length>10}">
                <template v-for="(item,index) in selectList">
                    <li class="u-item" :class="[index==rsIndex?'act_hover':'']">
                        <template v-if="item.stype=='2'">
                            <a class="u-lk" 
                                :data-bid="item.bid" :data-sid="item.sid"
                                :data-bname="item.bname" :data-sname="item.sname"  
                                @click="enterHallByCarSeries($event.target)"
                            >{{item.sname}}</a>
                        </template>
                        <template v-elseif="item.stype=='1'">
                            <router-link :to="{path:'/b2bCar',query: { CarId: item.id }}" class="u-lk" tag="a">{{item.name}}</router-link> 
                        </template>
                    </li>
                </template>
    	    </ul>
    	</div>
    </div>
</template>

<script>

    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // b2b条件过滤相关构造类
    import {filterShowData,filterDataClass,searchFilterClass} from "base/class/b2bFilter.js"
	
    export default {
        name: "srhSelect",
        data(){
            return{
                currResIndex: -1,
            }
        },
        // 数据
        props:{
            selectList: Array,
            // 搜索结果当前索引值
            rsIndex:{
                type: [String,Number],
                default: -1,
            }
        },
        // 侦听
        watch:{
            // 搜索结果当前的索引值
            rsIndex(va){
                currResIndex = val;
            }
        },
        mounted(){
            console.log(this.rsIndex);
        },
        // 方法
        methods:{
            
            //vuex的actions
            ...mapActions(["setUserFilterData",'setSearchFilterList']),

            // 进入车大厅通过车系查询
            enterHallByCarSeries(target){
                var _dataset = target.dataset;
                var    bid = _dataset.bid,
                    sid = _dataset.sid,
                    bname = _dataset.bname,
                    sname = _dataset.sname;

                // 清空本地存储中的搜索记录
                this.clearFilterData();
                setTimeout(() => {

                    // 设置展示给界面  用户所选条件集合中 汽车品牌的lable
                    this.userFilterData.brand = bname; 
                    // 设置展示给界面  用户所选条件集合中 汽车车系的lable 为空
                    this.userFilterData.series = sname; 
                    // 设置真实向api请求的字段 汽车品牌的id
                    this.searchFilterList.CarBrandId = bid; 
                    // 设置真实向api请求的字段 汽车品牌的id
                    this.searchFilterList.CarSeriesId = sid; 

                    this.setUserFilterData(this.userFilterData);
                    this.setSearchFilterList(this.searchFilterList);
                })
                setTimeout(() => {
                    this.$router.push({path:'/b2bHall'});
                },20)
                
            },

            // 清空本地存储中的搜索记录
            clearFilterData(){
                //清空用户展示记录
                let data  = {}
                this.userFilterData = new filterDataClass(data);
                this.searchFilterList = new searchFilterClass(data);
                //将用户选中的数据都存在本地中
                this.setUserFilterData(this.userFilterData);
                //将用户选中的 向后台发起api请求数据 存在本地中
                this.setSearchFilterList(this.searchFilterList);
            },
        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-select
        width 100%
        .u-select-lst
            &.isOverflow
	            max-height 400px
	            overflow-y scroll
            .u-item
                line-height 40px
                height 40px
                cursor pointer
                color #545454
                &:hover,.act_hover
                    background #f7f7f7
                    color $c_blue
                .u-lk
                    display block
                    padding 0 20px !important

</style>