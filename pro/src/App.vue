<template>
    <div id="app">
	    <router-view></router-view>
	    <div class="m-loading-wrap">
	        <loading></loading>	
	    </div>
        
    </div>
</template>

<script>
    import loading from 'base/loading/loading.vue'
	export default {
	    name: 'app',
        components:{
            loading,
        },
	}
</script>

