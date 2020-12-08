<template>
    <section :style="getBorderStyle">

    </section>
</template>
<script>
    import {boxStyle} from "../../../utils/boxSkin";
    export default {
        name: 'xTitle',
        props: {
            width: {type: [Number, String], default: 400}, // 宽度
            height: {type: [Number, String], default: 200}, // 高度
            type: {type: String, default: "box1"} // 边框类型
        },
        computed: {
            // 根据选中的边框类型设置边框样式
            getBorderStyle(){
                let style = boxStyle[this.type];
                return Object.assign(style,{
                    width:`${this.width}px`,
                    height:`${this.height}px`
                });
            }
        }
    }
</script>