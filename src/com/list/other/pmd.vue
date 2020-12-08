 /**
  * @Author: 高春超
  */
 <template>
    <marquee :style='container' v-html="dataname"  onmouseout = "this.start()" onmouseover = "this.stop()" behavior="scroll" :direction="direction" loop="infinite" :scrollamount="scrollamount" scrolldelay="250" >
             <!-- {{dataname}} -->
    </marquee> 
 </template>
 <script>
 import { getApiSource } from "@/utils/getApiData";
     export default{
         props:{
             width:{type:Number},
             height:{type:Number},
            //  背景颜色
             bgcolor:{type:String},
            // 滚动方向:left/right/down/up
            direction:{type:String},
            // 滚动速度
            // 字体大小
            size:{type:Number},
            // 字体颜色
            color:{type:String},
            // 字体
            family:{type:String},
            // 粗细
            weight:{type:String},
            scrollamount:{type:[String,Number]},
            dataType: { type: String, default: "Static" },
            apiUrl: { type: String },
            staticData: {
                type: Array,
                default: []
            }
         },
         computed:{
             container(){
                 return {
                     width:`${this.width}px`,
                     height:`${this.height}px`,
                     background:this.bgcolor,
                    //  lineHeight:`${this.height}px`,
                     fontSize:`${this.size}px`,
                     color:this.color,
                     fontFamily:this.family,
                     fontWeight:this.weight
                 }
             }
         },
          mounted(){
              setTimeout(()=>{
                  this.getData()
              },20)
          },
          data(){
              return {
                  dataname:''
              }
          },
          methods:{
             async  getData(){
                  this.datalist = await getApiSource(
                        this.dataType,
                        this.apiUrl,
                        this.staticData
                  );
                  this.dataname = this.datalist[0].text

              }
          }
         

     }
 </script>
<style>

</style>
