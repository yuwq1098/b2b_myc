<template>
	<div class="index">
		
		<section class="m-lk-lst">
		    <router-link to="/elm/test">(栅格系统)</router-link>
		    <router-link to="/elm/daterange">日期选择器（范围选择）</router-link>
		    <router-link to="/elm/upload">上传文件（头像上传）</router-link>
		</section>

		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'index',
	data () {
		return {
			
		}
	}
}
</script>

<style>
    .m-lk-lst{
        line-height: 28px;
        font-size: 16px;
        color: #49d;
        margin-bottom:  20px;
    }
    .m-lk-lst a{
        margin-right: 30px;
        margin-top: 10px;
    }
    .m-lk-lst a:hover,
    .m-lk-lst a:active{
        color: #38c;
    }
</style>