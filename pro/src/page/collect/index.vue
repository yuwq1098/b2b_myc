<template>
	<div class="collect-home">
	    <div class="g-doc">
			<c-head></c-head>
			<c-foot></c-foot>
		</div>
	</div>
</template>

<script>
    import cHead from "../../components/head/header.vue"
    import cFoot from "../../components/foot/footer.vue"

	export default {
        name: "collect-home",
        // 数据
        data() {
            return{
                
            }
        },
        // 在当前模块注册组件
        components:{
            cHead,
            cFoot,
        },
	}
</script>