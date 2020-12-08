/**
 * @Author: 高春超
 * @description: 图片上传组件
 * @param {type} 
 * @return: 
 * @Date: 2019-03-14 16:39:17
 */
<template>
    <div>
        <form>
            <div class="bgBox" @ondragover="bgBoxDrag" @drop="bgBoxDrop" style="width:185px">
                <img class="bgImg" :src="backgroundImg" v-if="backgroundImg">
                <Icon type="ios-cloud-upload" v-else style="font-size: 52px; color: rgb(51, 153, 255);"></Icon>                                    
                <input type="file" name="myFile" class="fileBtn" :id="bgImageId" @change="getFileContent">
                <p style="line-height:18px;">点击或将文件拖拽到这里更新</p>                                    
            </div>
            <div class="bgImgInfo" ref="bgImgInfo"></div>
        </form>
    </div>
</template>
           
<script>
    import guid from '../../utils/guid';
export default{
    props: {
        backgroundImage: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            backgroundImg: this.backgroundImage,
            bgImageId:"file_"+guid()
        }
    },
    watch: {
        backgroundImage(newValue, oldValue) {
            return this.backgroundImg = newValue
        }
    },
    methods: {
        // 截取指定字符串内容
        getCaption(str, params){
            const index = str.lastIndexOf(params);
            str = str.substring(index+1);
            return str;
        },
        // 背景图拖拽事件
        bgBoxDrag(e) {
            e.stopPropagation();
            e.preventDefault();
        },
        bgBoxDrop(e) {            
            e.stopPropagation();
            e.preventDefault();    
            const myFile = document.querySelector("#"+this.bgImageId);
            const fileList  = e.dataTransfer.files;　　//获取拖拽文件
            // 获取文件大小，如果文件大小超过3M弹出提醒
            const fileSize = fileList[0].size;
            if (fileSize > 3145728) {
                this.$Message.warning("图片过大，请选择小于3M的图片");
                return
            };
    　　　　 let reader = new FileReader();
            reader.readAsDataURL(fileList[0]);
            reader.onload = e=> {
                const imgInfo = reader.result;
                this.backgroundImg = imgInfo;                
                this.getBgImage(imgInfo);                   
                this.$refs.bgImgInfo.innerText = this.getCaption(myFile.value, '/')
            }
        },
        // 背景图上传
        getFileContent() {            
            const _this = this;            
            const myFile = document.querySelector("#"+this.bgImageId);
            // 读取文件，获取DataURL
            if (!myFile.value) {
                return
            }
            const fileList=myFile.files;
            // 获取文件大小，如果文件大小超过3M弹出提醒            
            const fileSize = fileList[0].size;
            if (fileSize > 3145728) {
                this.$Message.warning("图片过大，请选择小于3M的图片");
                // 对同一文件操作多次，无法触发input的change事件，所以将input的value值置空
                myFile.value = null;
                return
            }
            let reader = new FileReader();
            reader.readAsDataURL(fileList[0]);
            reader.onload=function(){
                _this.backgroundImg = reader.result;
                _this.getBgImage(reader.result);
                _this.$refs.bgImgInfo.innerText = _this.getCaption(myFile.value, '\\');
                myFile.value = null;
            }
        },
        getBgImage(data) {
            this.$emit('getImage',data)
        }
    },
}      
</script>