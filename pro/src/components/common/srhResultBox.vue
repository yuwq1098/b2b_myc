<template>
    <!-- select选择框 -->
    <div class="srhSelect">
    	<div class="m-select">
    	    <ul class="u-select-lst" :class="{'isOverflow':selectList.length>8}">
                <li class="u-item" v-for="item in selectList">
                    <router-link :to="{path:'/b2bCar',query: { CarId: item.id }}" tag="div">{{item.name}}</router-link>
                </li>
    	    </ul>
    	</div>
    </div>
</template>

<script>
	export default {
        name: "srhSelect",
        data(){
            return{

            }
        },
        // 数据
        props:{
            selectList: Array,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-select
        width 100%
        .u-select-lst
            &.isOverflow
	            max-height 320px
	            overflow-y scroll
            .u-item
                line-height 40px
                height 40px
                padding 0 20px !important
                cursor pointer
                color #545454
                _ellipsis(1)
                &>div
                    cursor @cursor
                &:hover
                    background #f0f0f0
                    color $c_blue
                    cursor pointer

</style>