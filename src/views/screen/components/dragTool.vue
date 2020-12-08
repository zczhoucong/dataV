<template>
     <div class="drag-tool" :style="toolStyle" :id="'tool_'+component.info.id" @click.stop="clearData" @contextmenu="rightClickEvent">
        <div class="navigator-line" :style="lineStyle" :id="'line_'+component.info.id">
            <div class="navigator-line-left" :id="'lineleft_'+component.info.id" :style="{width:lineStyle.left}"></div>
            <div class="navigator-line-top" :id="'linetop_'+component.info.id" :style="{height:lineStyle.top}"></div>
            <div class="navigator-line-account" :id="'linetext_'+component.info.id">
                {{parseFloat(lineStyle.left.replace('px','')).toFixed(0)+","+parseFloat(lineStyle.top.replace('px','')).toFixed(0)}}
            </div>
        </div>
        <div class="right-bottom" @mousedown="rxMouseDown"></div>
        <div class="bottom" @mousedown="downMouseDown"></div>
        <div class="right" @mousedown="rightMouseDown"></div>
        <div class="move" @mousedown="moveMouseDown"></div>
        <right-menu  @hide="tip.show=false" :x="tip.x" :y="tip.y" :show="tip.show"></right-menu>
    </div>
</template>
<script>
    import rightMenu from './rightMenu.vue'
    export default{   
        props: ['component'],
        components:{
            rightMenu
        },
        data(){
            return {
                minHeight: 60,
                minWidth: 60, // 拖拽最小高宽
                lineStyle:{
                    "left": '0px',
                    "top": '0px',
                },
                oDiv: null,
                oDiv2: null,
                right: null,
                bottom: null,
                center: null,
                toolStyle: {},
                mouseStart: {},
                divStart: [],
                rightStart: [],
                bottomStart: [],                
                tip:{
                    show:false,
                    x:0,
                    y:0
                }
            }
        },
        computed: {
            screen: {
                get() {
                    return this.$store.state.config
                }
            },
            current: { //当前选中组件
                get() {
                    return this.$store.state.currentComponent
                }
            },
            scale(){
                return this.$store.state.scale;
            }
        },
        watch: {
            component(val){
                if (val.attributes) {
                    this.setStyle(val);
                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                // 初始化组件样式
                this.setStyle(this.component);
                this.oDiv = $(".right-bottom");
                this.oDiv2 = $(".drag-tool");
                this.right = $(".right");
                this.bottom = $(".bottom");
                this.center = $(".move");
            })
        },
        methods: {
            rightClickEvent(parameter){
                parameter.preventDefault();                           
                this.tip.x = parameter.offsetX;
                this.tip.y = parameter.offsetY;
                this.tip.show=true;
            },
            clearData(){                
                this.mouseStart = {};
                this.divStart = [];
                this.rightStart = [];
                this.bottomStart = [];
                this.tip.show=false;
            },
            // 设置Tool样式
            setStyle(component){
                this.toolStyle = {
                    "height": component.attributes.height.value + 'px',
                    "width": component.attributes.width.value + 'px',
                    "left": component.position.offsetLeft + 'px',
                    "top": component.position.offsetTop + 'px',
                }
                this.lineStyle=this.toolStyle
            },
            // 同时向右及向下放大
            rxMouseDown(ev){
                let oEvent = ev || event;
                this.mouseStart.x = oEvent.clientX;
                this.mouseStart.y = oEvent.clientY;
                this.current.forEach(com => {
                    const dom = $(`#tool_${com.info.id}`).find('.right-bottom')[0];
                    this.divStart.push({
                        id: com.info.id,
                        x: dom.offsetLeft,
                        y: dom.offsetTop
                    })
                });
                if (this.oDiv.setCapture) {
                    this.oDiv.onmousemove = this.doDrag;
                    this.oDiv.onmouseup = this.stopDrag;
                    this.oDiv.setCapture();
                }
                else {
                    document.addEventListener("mousemove", this.doDrag, true);
                    document.addEventListener("mouseup", this.stopDrag, true);
                }
            },
            // 向右平行拖动
            rightMouseDown(ev){
                const oEvent = ev || event;
                this.mouseStart.x = oEvent.clientX;
                this.mouseStart.y = oEvent.clientY;
                this.current.forEach(com => {
                    const dom = $(`#tool_${com.info.id}`).find('.right')[0];
                    this.rightStart.push({
                        id: com.info.id,
                        x: dom.offsetLeft
                    })
                });
                if (this.right.setCapture) {
                    this.right.onmousemove = this.rightDoDrag;
                    this.right.onmouseup = this.rightStopDrag;
                    this.right.setCapture();
                }
                else {
                    document.addEventListener("mousemove", this.rightDoDrag, true);
                    document.addEventListener("mouseup", this.rightStopDrag, true);
                }
            },
            // 向下平行拖动
            downMouseDown(ev){
                const oEvent = ev || event;
                this.mouseStart.x = oEvent.clientX;
                this.mouseStart.y = oEvent.clientY;
                this.current.forEach(com => {
                    const dom = $(`#tool_${com.info.id}`).find('.bottom')[0];
                    this.bottomStart.push({
                        id: com.info.id,
                        y: dom.offsetTop
                    })
                });
                if (this.bottom.setCapture) {
                    this.bottom.onmousemove = this.downDoDrag;
                    this.bottom.onmouseup = this.downStopDrag;
                    this.bottom.setCapture();
                }
                else {
                    document.addEventListener("mousemove", this.downDoDrag, true);
                    document.addEventListener("mouseup", this.downStopDrag, true);
                }
            },
            // 随意移动
            moveMouseDown(ev){
                const oEvent = ev || event;
                this.mouseStart.x = oEvent.clientX;
                this.mouseStart.y = oEvent.clientY;
                this.current.forEach(com => {
                    const dom = $(`#tool_${com.info.id}`)[0];
                    this.divStart.push({
                        id: com.info.id,
                        x: dom.offsetLeft,
                        y: dom.offsetTop
                    })
                });
                if (this.center.setCapture) {
                    this.center.onmousemove = this.moveDoDrag;
                    this.center.onmouseup = this.moveStopDrag;
                    this.center.setCapture();
                }
                else {
                    document.addEventListener("mousemove", this.moveDoDrag, true);
                    document.addEventListener("mouseup", this.moveStopDrag, true);
                }                
            },
            moveDoDrag(ev){
                const oEvent = ev || event;
                const offsetX = oEvent.clientX - this.mouseStart.x; // X轴偏移量
                const offsetY = oEvent.clientY - this.mouseStart.y; // Y轴偏移量
                this.current.forEach(com => {
                    const dom = this.divStart.filter(i => {
                        return i.id === com.info.id;
                    })[0];
                    const divStart = $(`#tool_${com.info.id}`)[0];
                    const divLine = $(`#line_${com.info.id}`)[0];
                    const divLineLeft = $(`#lineleft_${com.info.id}`)[0];
                    const divLineTop = $(`#linetop_${com.info.id}`)[0];
                    const divLineText = $(`#linetext_${com.info.id}`)[0];
                    const divCom=$(`#${com.info.id}`)[0];
                    let l = offsetX/this.scale + dom.x;
                    let t = offsetY/this.scale + dom.y;
                    ////限制只能在画布能移动
                    // if (l < 0) {
                    //     l = 0;
                    // }
                    // else if (l > this.screen.width - divStart.offsetWidth) {
                    //     l = this.screen.width - divStart.offsetWidth;
                    // }
                    // if (t < 0) {
                    //     t = 0;
                    // }
                    // else if (t > this.screen.height - divStart.offsetHeight) {
                    //     t = this.screen.height - divStart.offsetHeight;
                    // }
                    divStart.style.left = l + "px";
                    divStart.style.top = t + "px";
                    divCom.style.left = l + "px";
                    divCom.style.top = t + "px";
                    divLine.style.left = l + "px";
                    divLine.style.top = t + "px";
                    divLineLeft.style.width=l + "px";
                    divLineTop.style.height=t + "px";                    
                    divLineText.innerText=parseFloat(l).toFixed(0)+","+parseFloat(t).toFixed(0)
                })
            },
            moveStopDrag(){                
                this.ajustPosition();
                if (this.center.releaseCapture) {
                    this.center.onmousemove = null;
                    this.center.onmouseup = null;
                    this.center.releaseCapture();
                }
                else {
                    document.removeEventListener("mousemove", this.moveDoDrag, true);
                    document.removeEventListener("mouseup", this.moveStopDrag, true);
                }
            },
            // 向下扩大事件
            downDoDrag(ev){
                const oEvent = ev || event;
                const offsetY = oEvent.clientY - this.mouseStart.y; // X轴偏移量
                this.current.forEach(com => {
                    const dom = this.bottomStart.filter(i => {
                        return i.id === com.info.id;
                    })[0];
                    const _dragTool = $(`#tool_${com.info.id}`);
                    const divCom=$(`#${com.info.id}`);
                    const divStart = _dragTool.find('.bottom')[0];
                    let t = offsetY/this.scale + dom.y;
                    let h = t + divStart.offsetHeight;
                    if (h < this.minWidth) {
                        h = this.minWidth;
                    }
                    else if (h > this.screen.height - _dragTool[0].offsetTop) {
                        h = this.screen.height - _dragTool[0].offsetTop - 2;
                    }
                    _dragTool.height(h)
                    divCom.height(h)
                })
            },
            downStopDrag(){
                this.ajustSize();
                if (this.bottom.releaseCapture) {
                    this.bottom.onmousemove = null;
                    this.bottom.onmouseup = null;
                    this.bottom.releaseCapture();
                }
                else {
                    document.removeEventListener("mousemove", this.downDoDrag, true);
                    document.removeEventListener("mouseup", this.downStopDrag, true);
                }
            },
            rightDoDrag(ev){
                const oEvent = ev || event;
                const offsetX = oEvent.clientX - this.mouseStart.x; // X轴偏移量
                this.current.forEach(com => {
                    const dom = this.rightStart.filter(i => {
                        return i.id === com.info.id;
                    })[0];
                    const _dragTool = $(`#tool_${com.info.id}`);
                    const divStart = _dragTool.find('.right-bottom')[0];
                    const divCom=$(`#${com.info.id}`);
                    let l = offsetX/this.scale + dom.x;
                    let w = l + divStart.offsetWidth;
                    if (w < this.minWidth) {
                        w = this.minWidth;
                    }
                    else if (w > this.screen.width - _dragTool[0].offsetLeft) {
                        w = this.screen.width - _dragTool[0].offsetLeft - 2;
                    }
                    _dragTool.width(w);
                    divCom.width(w);                    
                })                
            },
            rightStopDrag(){
                this.ajustSize();
                if (this.right.releaseCapture) {
                    this.right.onmousemove = null;
                    this.right.onmouseup = null;
                    this.right.releaseCapture();
                }
                else {
                    document.removeEventListener("mousemove", this.rightDoDrag, true);
                    document.removeEventListener("mouseup", this.rightStopDrag, true);
                }
            },
            doDrag(ev){
                const oEvent = ev || event;
                const offsetX = oEvent.clientX - this.mouseStart.x; // X轴偏移量
                const offsetY = oEvent.clientY - this.mouseStart.y; // Y轴偏移量
                this.current.forEach(com => {
                    const dom = this.divStart.filter(i => {
                        return i.id === com.info.id;
                    })[0];
                    const _dragTool = $(`#tool_${com.info.id}`);
                    const divCom=$(`#${com.info.id}`);
                    const divStart = _dragTool.find('.right-bottom')[0];
                    let l = offsetX/this.scale + dom.x;
                    let t = offsetY/this.scale + dom.y;

                    let w = l + divStart.offsetWidth;
                    let h = t + divStart.offsetHeight;

                    if (w < this.minWidth) {
                        w = this.minWidth;
                    }
                    else if (w > this.screen.width - _dragTool[0].offsetLeft) {
                        w = this.screen.width - _dragTool[0].offsetLeft - 2;
                    }
                    if (h < this.minHeight) {
                        h = this.minHeight;
                    }
                    else if (h > this.screen.height - _dragTool[0].offsetTop) {
                        h = this.screen.height - _dragTool[0].offsetTop - 2;
                    }
                    _dragTool.width(w).height(h)
                    divCom.width(w).height(h)                  
                })
            },
            stopDrag(){
                this.ajustSize();
                if (this.oDiv.releaseCapture) {
                    this.oDiv.onmousemove = null;
                    this.oDiv.onmouseup = null;
                    this.oDiv.releaseCapture();
                }
                else {
                    document.removeEventListener("mousemove", this.doDrag, true);
                    document.removeEventListener("mouseup", this.stopDrag, true);
                }
            },
            ajustSize(){
                this.current.forEach(com => {
                    const divCom=$(`#${com.info.id}`);
                    this.$emit('update', {
                        attr: {
                            width: {
                                type: 'textNumber',
                                value: divCom.width()
                            },
                            height: {
                                type: 'textNumber',
                                value: divCom.height()
                            }
                        },
                        info: com.info
                    })
                });
            },
            ajustPosition(){
                this.current.forEach(com => {
                      const divCom=$(`#${com.info.id}`)[0];
                      const params={
                        position: {
                            offsetLeft:parseFloat(divCom.style.left.replace('px','')) ,
                            offsetTop: parseFloat(divCom.style.top.replace('px',''))
                        },
                        info: com.info
                      }
                      this.$emit('updatePosition',params)
                 });
            }
        }
    }
</script>
<style lang="less">
    @import "../../../styles/dragTool.less";
</style>