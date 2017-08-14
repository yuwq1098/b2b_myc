<!--  
 **  @description 引入外部js的组件
 --> 

<template>
	<div class="refScript" ref="refScript"></div>
</template>

<script>
    
	export default {
        name: "refScript",
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            src:{ 
                type: String, 
                required: true, 
            },
        },
        created(){
            
        },
        mounted(){
            const st = document.createElement('script');
            st.type = 'text/javascript';
            st.src = this.src;
            st.charset = "utf-8";
            this.$refs.refScript.appendChild(st);
        },
        activated(){
            
        },
        deactivated(){

        },
	}
</script>