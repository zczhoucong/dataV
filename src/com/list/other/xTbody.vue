<template>
  <ul  class="yyzx-tbody" ref="tbody" >
    <li v-for="(item,index1) in dataItem" :style="[trHeight,fontStyl(index1)]" :key="'li'+index1">
      <div class="table-td" :style="[widthsty(idx),seriessty(idx,index1)]" v-for="(td,index,idx) in item" :key="'td'+index">
        {{td}}
      </div>
    </li>
  </ul>
</template>
<script>
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    //奇数行颜色
    oddcolor:{type:[String,Number]},
    // 偶数行颜色
    evencolor:{type:[String,Number]},
    // 系列数据
    tableList:{ type: Array,default: () => {return []}},
    // 表头背景色
    headbg:{type:String},
    // 表头字体颜色
    headcolor:{type:String},
    // 表头字号
    headsize:{type:[Number,String]},
    // 表头字体
    headfamily:{type:String},
    // 表头粗细
    headweight:{type:String},
    // 样式:中间有线与没有间隔线
    borderstyle:{type:[String,Number]},
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    dataType: { type: String},
    apiUrl: {type: String,default: ""},
    staticData: {type: Array,default: () => {return []}},
    x: {type: String},
    y: {type: String},
    color: {type: String,default: "#25d4e7"},
    // 字体大小
    size:{type:Number},
    // 字体颜色
    fontColor:{type:String}
  },
  data() {
    return {
      liHeight: 24,
      dataItem:[],
      mycount:0,
    };
  },
  computed:{
    trHeight(){
      const count = this.dataItem.length;
      this.liHeight = this.height / count;
      let style={
        height:`${this.liHeight}px`,
        lineHeight:`${this.liHeight}px`,
        borderColor: this.color
      }
      if(this.borderstyle=='样式三'){
        Object.assign(style,{border:'none'})                            
      }
      return style
    }
  },
  created(){
    this.getdata()
  },
  methods: {
    seriessty(index,index1){
      if(index1!=0){
          return{
              color:this.tableList[index].color,
              fontSize:`${this.tableList[index].size}px`,
              fontWeight:this.tableList[index].weight,
              fontFamily:this.tableList[index].fontFamily
          }
      }
    },
    widthsty(index){            
      let order
      let sum=0
      this.tableList.forEach(x=>sum+=x.ratio);
      if(sum===0){
        order=0
      }else{
        order=this.tableList[index].ratio/sum*100
      }
    
      // 判断当前样式
      if(this.borderstyle == '样式二'){
        return{
          width:order+'%',
          borderRight:`1px solid ${this.color}`
        }
      }else{
        return{
          width:order+'%',
        }
      }        
    },
    fontStyl(index){
      let style={}
      if(index==0){
        style={
            fontSize:`${this.headsize}px`,
            color:this.headcolor,
            fontWeight:this.headweight,
            fontFamily:this.headfamily,
            background:this.headbg,
        }
      }else{
          style={
            background:index%2==0?this.evencolor:this.oddcolor
          }
      }
      return style
    }, 
    async getdata(){
      this.dataItem=[]
      const data= await getApiSource(this.dataType,this.apiUrl,this.staticData);
      data.forEach(item=>{
        this.dataItem.push({
          x:item[this.x],
          y:item[this.y]
        })
      })
      this.mycount =  this.dataItem.length
    }
  }
};
</script>

<style type="text/less" lang="less">
.yyzx-tbody {
  float: left;
  width: 100%;
  height: 100%;
  li {
    float: left;
    color: #fff;
    border: 1px solid #22afc3;
    border-bottom: none;
    width: 100%;
    &:last-child {
      border-bottom: 1px solid #22afc3;
    }
    .table-td {
      float: left;
      height: 100%;
      padding-left: 10px;
      overflow: hidden;
    }
  }
}
</style>
