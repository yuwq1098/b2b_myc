<template>
    <div class="uploadImgTest">
        <p>图片上传插件</p>
        <form>
            <!--文件选择input-->
            <h3>文件选择：</h3>
            <input class="btn btn-default" v-show="false" @change="_uploadInputChange" type="file" id="upFile" accept="image/*" multiple>

            <a @click="openFile">选择文件</a>

            <div class="img-list-wrap">
                <ul class="img-list" id="img-list">
                    
                </ul>
            </div>

            <!--文件选择input中已选择文件重置(采用form表单的reset重置按钮重置)-->
            <h3>重置文件选择：</h3>
            <input class="btn btn-default" type="reset" id="reBtn" value="清空" />

            <!--提交压缩后的base64文件数据给后台-->
            <h3>传给后台</h3>
            <input class="btn btn-default" type="button" id="upTo" value="提交"/>

            <!--后台所要获取的文件base64-->
            <h3>后台获取base64文件数据：(一个隐藏域)</h3>
            <input id="imgOne" name="imgOne" type="hidden"/>

            <!--所选文件压缩前预览-->
            <h3>压缩前预览：</h3>
            <img src="" id="preview"/>

            <!--所选文件压缩后预览-->
            <h3>压缩后预览：</h3>
            <img src="" id="nextview"/>

        </form>
    </div>
</template>

<script>

    import $ from "jquery";
    export default{
        name: 'uploadImgTest',
        data(){
            return{
                files:[],
                maxsize: 100 * 1024,
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        methods:{
            // 上传值变化
            _uploadInputChange(){
                var upFileDom = $("#upFile")[0];
                if (!upFileDom.files.length) return;
                this.files =  upFileDom.files;
                console.log("先看看files",files)
                var files = Array.prototype.slice.call(this.files);

                console.log("不知道什么作用",files.length)
                if (files.length > 9) {
                    alert("最多同时只可上传9张图片");
                    return;
                }
                files.forEach(function(file, i) {
                    if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                    var reader = new FileReader();
                    var li = document.createElement("li");
                    // 获取图片大小
                    const size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
                    li.innerHTML = '<div class="progress"><span></span></div><div class="size">' + size + '</div>';
                    $(".img-list").append($(li));
                    reader.onload = function() {
                        console.log("在走这里，")
                        var result = this.result;
                        var img = new Image();
                        console.log("这是不是结果",result);
                        img.src = result;
                        $(li).css("background-image", "url(" + result + ")");
                        //如果图片大小小于100kb，则直接上传
                        if (result.length <= this.maxsize) {
                            img = null;
                            upload(result, file.type, $(li));
                            return;
                        }
                //      图片加载完毕之后进行压缩，然后上传
                        if (img.complete) {
                            callback();
                        } else {
                            img.onload = callback;
                        }
                        function callback() {
                            var data = compress(img);
                            upload(data, file.type, $(li));
                            img = null;
                        }
                    };
                    console.log("先走这里，")
                    reader.readAsDataURL(file);
                });
                
                console.log("天啦噜，我看的是什么",upFileDom.files)
            },
            // 打开文件
            openFile(){
                var upFileDom = $("#upFile");
                upFileDom.click();
                console.log("aaaaa");
            }
        },
        components:{

        }
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'

</style>
