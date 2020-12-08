<template>
    <div class="navigator-line" :style="toolStyle">
        <div class="navigator-line-left" :style="leftWidth"></div>
        <div class="navigator-line-top" :style="topHeight"></div>
        <div class="navigator-line-account" v-html="position"></div>
    </div>
</template>
<script>
export default {
    props: ['component'],
    computed: {
        // 设置Tool样式
        toolStyle(){
            return {
                "height": this.component.attributes.height.value + 'px',
                "width": this.component.attributes.width.value + 'px',
                "left": this.component.position.offsetLeft + 'px',
                "top": this.component.position.offsetTop + 'px',
            }
        },
        leftWidth(){
            return {
                "width": this.component.position.offsetLeft + 'px'
            }
        },
        topHeight(){
            return {
                "height": this.component.position.offsetTop + 'px'
            }
        },
        position(){
            return parseFloat(this.component.position.offsetLeft).toFixed(0)+","+parseFloat(this.component.position.offsetTop).toFixed(0)
        }
    } 
}
</script>

<style lang="less">
    @import "../../../styles/dragLine.less";
</style>