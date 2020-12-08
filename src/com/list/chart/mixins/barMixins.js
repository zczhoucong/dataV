/**
 * @Author: 高春超
 * @description: 柱状图公共组件属性--混入
 * @param {type} 
 * @return: 
 * @Date: 2019-03-13 16:59:58
 */
import guid from '@/utils/guid';
import eCharts from "echarts";
import {transfterLegPosition} from '@/utils/assist'
export default {
    props:{
        width: {type: [Number, String], default: 450}, // 宽度
        height: {type: [Number, String], default: 350}, // 高度
        font: { // 字体
            type: String,
            default: "AgencyFBBold"
        }, 
        dataType: {type: String, default: 'Static'},
        apiUrl: {type: String},
        autoReplay:{type:Boolean,default:false},
        autosecond:{type:Number,default:5},

        gridTop: {type: [Number, String], default: 30}, // 上边距
        gridBottom: {type: [Number, String], default: 45}, // 下边距
        gridLeft: {type: [Number, String], default: 40}, // 左边距
        gridRight: {type: [Number, String], default: 40}, // 右边距

        labelShow: {type: String | Boolean, default: false}, // 是否显示值标签
        labelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
        labelColor: {type: String, default: '#fff'}, // 值标签颜色
        labelSize: {type: [Number, String], default: 16}, // 值标签大小

        lineShow: {type: String | Boolean, default: true}, // 轴线是否显示
        tickShow: {type: String | Boolean, default: true}, // 刻度是否显示
        tickLength: {type: [Number, String], default: 5}, // 刻度的长度
        tickColor: {type: String, default: '#fff'}, // 刻度的颜色
        // 图例
        legendShow: {type: String | Boolean, default: true},
        legendColor: {type: String, default: '#fff'},
        legPosition: {type: String, default: '顶部居中'},
        orient: {type: String, default: 'horizontal'},
        legendSize: {type: [Number, String], default: 12},
        legendGap: {type: [Number, String], default: 10}
    },
    data(){
        return {
            chartId: guid(),
            timer:null
        }
    },
    watch:{
        autoReplay(val){
            if(!val){
                clearInterval(this.timer)
            }
        }
    },
    computed: {
        container(){
            return {
                width: `${this.width.toString().replace('px','')}px`,
                height: `${this.height.toString().replace('px','')}px`,
            }
        }
    },
    methods:{        
        axisTick(){
            return {
                show: this.tickShow,
                length: this.tickLength,
                lineStyle: {
                    color: this.tickColor
                }
            }
        },
        axisLine(){
            return {
                show: this.lineShow,
                lineStyle: {
                    color: this.tickColor
                }
            }
        },
        grid(){
            return {
                left: this.gridLeft,
                right: this.gridRight,
                bottom: this.gridBottom,
                top: this.gridTop,
                containLabel: true
            }
        },
        legend(){
            return {
                show: this.legendShow,
                textStyle: {
                    color: this.legendColor,
                    fontSize: this.legendSize,
                    fontFamily:this.font
                },
                ...transfterLegPosition(this.legPosition),
                itemGap: this.legendGap,
                itemWidth:15,
                orient: this.orient                
            }
        },
        label(){
            return  {
                show: this.labelShow,
                position: this.labelPosit,
                color: this.labelColor,
                fontFamily: this.font,
                fontSize: this.labelSize
            }
        },
        clearTimer(){
            if(this.timer){
                clearTimeout(this.timer)
            }
        },
        interval(func,wait){
          if (window.location.href.indexOf('screen') > 0) return;
           this.clearTimer()
            var interv = ()=>{
                func.call(null);
                this.clearTimer()
                this.timer= setTimeout(interv, wait);
            }            
            this.timer= setTimeout(interv, wait);
        },
        loadChart(option){
            if(this.chart){
                this.autoReplayEvent();
            }else{
                if (document.getElementById(this.chartId)) {
                    this.chart = eCharts.init(document.getElementById(this.chartId));
                    this.chart.setOption(option);                 
                }
            }
            this.clearTimer()
            if(this.autoReplay){                    
                this.interval(this.autoReplayEvent,this.autosecond*1000)                    
            }
        }
    }, 
    beforeDestory(){
        if(this.timer){
            clearTimeout(this.timer)
        }
    },
    deactivated() {        
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.$destroy();
    }
}