<template>
    <div class="uploadTest">
        <vue-file-upload 
            url='upload.do'
            ref="vueFileUploader"
            id="vueFileUploader"
            :filters= 'filters'
            :events= 'cbEvents'
            :request-options= "reqopts"
            @onAdd= "onAddItem"
            >
        </vue-file-upload>

        <p @click="openFileInput">点击我</p>
        
        <table>
            <thead>
                <tr>
                    <th>文件名</th>
                    <th>文件大小</th>
                    <th>上传进度</th>
                    <th>上传状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="file in files">
                    <td>{{file.name}}</td>
                    <td>{{file.size}}</td>
                    <td>{{file.progress}}</td>
                    <td>{{onStatus(file)}}</td>
                    <td>
                        <button
                            type='button'
                            @click="uploadItem(file)"
                            >
                            上传
                        </button>
                        <button
                            type="button"
                            @click="uploadAll"
                            >
                            上传所有文件
                        </button>
                        <button
                            type="button"
                            @click="clearAll"
                            >
                            清空文件列表
                        </button>  
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import $ from "jquery";
    import VueFileUpload from 'vue-file-upload';

    export default{
        name: 'uploadTest',
        data(){
            return{
                files:[],
                //文件过滤器，只能上传图片
                filters:[
                {
                    name:"imageFilter",
                    fn(file){
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                }],
                //回调函数绑定
                cbEvents:{
                    onCompleteUpload:(file,response,status,header)=>{
                        console.log(file);
                        console.log("finish upload;")
                    }
                },
                //xhr请求附带参数
                reqopts:{
                    formData:{
                      tokens:'tttttttttttttt'
                    },
                    responseType:'json',
                    withCredentials:false
                }
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        methods:{
            onStatus(file){
                if(file.isSuccess){
                    return "上传成功";
                }else if(file.isError){
                    return "上传失败";
                }else if(file.isUploading){
                    return "正在上传";
                }else{
                    return "待上传";
                }
            },
            onAddItem(files){
                console.log("是不是蛋疼",files);
                this.files = files;
            },
            uploadItem(file){
                //单个文件上传
                file.upload();
            },
            uploadAll(){
                //上传所有文件
                this.$refs.vueFileUploader.uploadAll();
            },
            clearAll(){
                //清空所有文件
                this.$refs.vueFileUploader.clearAll();
            },
            openFileInput(){
                console.log("被点击了，爽不爽")
                $("#vueFileUploader").find("input[type='file']").click();
            }
        },
        components:{
            VueFileUpload
        }
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'



</style>
