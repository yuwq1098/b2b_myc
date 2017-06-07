<template>
    <div id="app">
        <div class="g-doc">
	        <!-- 引入网站头部 -->
	        <keep-alive>
	            <c-head></c-head>
	        </keep-alive>

		    <keep-alive>
		        <router-view></router-view>
		    </keep-alive>
		    
	        <!-- 引入loading -->
		    <loading></loading>
	        
	        <!-- 引入网站底部 -->
	        <keep-alive>
	        	<c-foot></c-foot>
	        </keep-alive>
        </div>
    </div>
</template>

<script>
    import loading from 'base/loading/loading.vue'
    import cHead from "components/head/header.vue"
    import cFoot from "components/foot/footer.vue"

	export default {
	    name: 'app',
        components:{
            loading,
            cHead,
            cFoot,
        },
	}
</script>

