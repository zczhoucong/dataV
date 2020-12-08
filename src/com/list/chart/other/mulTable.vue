 /**
  * @Author: 高春超
  * @description: 
  * @param {type} 
  * @return: 
  * @Date: 2019-03-18 09:00:01
  */
 <template>
  <div class="wrapper" :style='container'>
    <div v-if='showhead' :style='tableheadstyl' class="tableHead">    
        <div v-if='showfirst||index!=0' :style='tdStyle(index,"th")' :title="val" v-for='(val,key,index) in tabData[0]' :key="'th'+index">{{val}}</div>
    </div>
    <div :style='tabbodystyl' class="tableBody">
      <transition-group name="flip-list" tag="table">
        <tr :style="trStyle(index)" v-for='(item ,index) in bodydata' :key='JSON.stringify(item)'>
          <td v-if='showfirst||index!=0' :style="tdStyle(index,'td')" style='text-align:center;' v-for='(val,key,index) in item' :key="'td'+index">
            <div v-if='index==0' class='numstyl'>
              <Icon class='numcol' style='' v-show='shape!="none"' :type="shape" :size='bodyFontsize*2' :color='orderColor'></Icon>
              <span class='numcol' style=''>{{val}}</span>
            </div>
            <span :title="val" v-else>{{val}}</span>
          </td>
        </tr>
      </transition-group>
    </div>
  </div>
</template>

 <script>
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    dataType: { type: String, default: "Static" },
    apiUrl: {
      type: String,
      default: ""
    },
    staticData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    // 是否显示边框
    bordershow: { type: Boolean },
    // 边框颜色
    bordercolor: { type: String },
    // 边框大小
    borderSize: { type: [String, Number] },
    // 列表的表头的高度
    tableHeadHeight: { type: [Number, String] },
    // 表格行数
    showNum: { type: [Number, String] },
    // 展示所有行
    showAll: { type: Boolean },
    // 是否显示表头
    showhead: { type: Boolean },
    // 组件id
    comId:{type:String},
    // 表头背景色
    tableheadcolor: { type: [Number, String] },
    // 表头字体大小
    tableheFontSize: { type: [Number, String] },
    // 表头字体颜色
    tablehecolor: { type: [Number, String] },
    // 表头字体粗细
    tablehebig: { type: [Number, String] },
    // 表头字体
    tablehefamily: { type: String },
    //行配置--奇数行颜色
    oddcolor: { type: [Number, String] },
    //行配置--偶数行颜色
    evencolor: { type: [Number, String] },
    //行配置--字体颜色
    bodycolor: { type: [Number, String] },
    //行配置--字体大小
    bodyFontsize: { type: [Number, String] },
    // 序号类是否显示
    showfirst: { type: Boolean },
    // 序号的形状
    shape: { type: String },
    // 序号的颜色
    orderColor: { type: String },
    // 是否轮播
    lunbo: { type: Boolean },
    // 轮播时间间隔
    onetime: { type: [Number, String] },
    // 列控制
    listColum: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      // 表格数据
      tabData: [],
      // 表体数据
      bodydata: [],
      // 计时器
      serval: null,
      // 实际数据行数
      dataNum: 0,
      // 实际列数（比数据中多一个，因为加了一个序号）
      columNum: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.clearTimer();
      this.getTableData();
    });
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    // 表头样式
    tableheadstyl() {
      let style = {
        height: `${this.tableHeadHeight}px`,
        lineHeight: `${this.tableHeadHeight}px`,
        background: this.tableheadcolor,
        fontSize: `${this.tableheFontSize}px`,
        color: this.tablehecolor,
        fontWeight: this.tablehebig,
        fontFamily: this.tablehefamily
      };
      if (this.bordershow) {
        Object.assign(style,{
          border: `${this.borderSize}px solid ${this.bordercolor}`,
          borderBottom: "none"
        })
      }
      return style
    },
    // 表体样式
    tabbodystyl() {
      const height=this.showhead?(this.height - this.tableHeadHeight):this.height;
      let style = {
        height: `${height}px`,
        overflow: "hidden"
      };
      if (this.bordershow) {
        Object.assign(style,{
          border: `${this.borderSize}px solid ${this.bordercolor}`,
          borderTop: "none"
        })
      } 
      return style
    }
  },
  methods: {
    // 清空该组件定时器
    clearTimer() {
      const timer = sessionStorage.getItem(`mulTable${this.comId}`);
      if (timer) {
        clearInterval(timer);
        sessionStorage.removeItem(`mulTable${this.comId}`);
      }
    },
    // 轮播
    golunbo() {
      if (this.lunbo) {
          // 如果展示的行数比实际数据的行数大于或等于，则禁止轮播
          if (this.showNum >= this.bodydata.length) {
            return;
          }
          // 如果显示全部的行数，便禁止轮播
          if (this.showAll) {
            return;
          }
          this.serval = setInterval(() => {
            console.log(1)
            // 获得第一个数据项
            let firstitem = this.bodydata.shift();
            //添加到最后
            this.bodydata.push(firstitem);
          }, this.onetime * 1000);
          sessionStorage.setItem(`mulTable${this.comId}`, this.serval);
      } else {
        clearInterval(this.serval);
        sessionStorage.removeItem(`mulTable${this.comId}`)
        this.serval=null
      }
    },
    //行样式
    trStyle(index) {      
      const tbodyHeight=this.showhead?(this.height - this.tableHeadHeight):this.height;     
      const itemHeight=this.showAll?tbodyHeight / this.dataNum:tbodyHeight / this.showNum
      const bgColor=index % 2 == 0?this.oddcolor:this.evencolor    
      let style = {
        height: `${itemHeight}px`,
        lineHeight: `${itemHeight}px`,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        background: bgColor,
        fontSize: `${this.bodyFontsize}px`
      };
      if (this.bordershow) {
          Object.assign(style,{
             borderTop: `${this.borderSize}px solid ${this.bordercolor}`
          })
      }
      return style
    },
    tdStyle(index, str) {     
      if (index == 0) {
        let listWidth=0
        this.listColum.forEach(x=>listWidth+=x.widthorder)        
        let indexColum = {
          height: "100%",
          width:`${100-listWidth}%`
        };
        if (this.bordershow) {
          Object.assign(indexColum,{
            borderRight: `${this.borderSize}px solid ${this.bordercolor}`
          })                   
        }
        if (str === "td") {
          Object.assign(indexColum,{
            color: this.bodycolor,
          })
        } 
        return indexColum
      } else {
        let width = 0;
        // 字体颜色
        let fontColor = "";
        let size = 14; //字体大小
        let familys = "Microsoft Yahei"; //字体
        let weight = "normal"; //粗细
        if (this.listColum && this.listColum[index - 1]) {
          width = this.listColum[index - 1].widthorder;
          fontColor = this.listColum[index - 1].color;
          size = this.listColum[index - 1].fontSize;
          familys = this.listColum[index - 1].fontFamily;
          weight = this.listColum[index - 1].weight;
        }
        // 基础样式
         let thStyle={
          width:`${width}%`,
          height: "100%",
          fontWeight: this.tablehebig
        }
        // 表格Body样式
        let bodyStyle={
          color: fontColor, //字体颜色
          fontSize: `${size}px`,
          fontFamily: familys,
          fontWeight: weight
        }
        if (this.bordershow && index < this.columNum - 1) {
          Object.assign(thStyle,{
            borderRight: `${this.borderSize}px solid ${this.bordercolor}`,
          })
        } 
        if (str === "td") {
          Object.assign(thStyle,bodyStyle)
        }
        return thStyle
      }
    },

    async getTableData() {      
      let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
      this.tabData = dataJson.map((item, index, arr) => {      
        item = {
            num: index===0?'序号':index,
            ...item
          };
        return item;
      });
      this.bodydata = this.tabData.filter((item, index, arr) =>index != 0);
      this.dataNum = this.bodydata.length;
      if (this.tabData && this.tabData.length > 0) {
        this.columNum = Object.keys(this.tabData[0]).length;
      }
      this.golunbo();
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.flip-list-move {
  transition: transform 1s;
}

.wrapper {
  .tableHead{
    float: left;
    width:100%;
    text-align: center;
    div{
      float: left;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tableBody {
    width: 100%;
    table {
      width:100%;
      height:100%;
      padding:0;
      margin:0;
      border-collapse:collapse;
      .trhead{
        height:100%;
        // display:flex;
        // flex-direction: row;
        // align-content: center;
        // align-items: center;1
      }
      tr {
        th,
        td {
          text-align: center;
          vertical-align: middle;
          // display: flex;
          // align-content: center;
          // align-items: center;          
          justify-content: center;
          overflow: hidden;
          text-overflow: ellipsis;          
          .numstyl{
            display:flex;
            align-items: center;
            width:100%;
            height:100%;
            position:relative;
            .numcol{
              position:absolute;
              margin:0 auto;
              left:0;
              right:0;
            }
          }
        }
      }
    }
  }
}
</style>

