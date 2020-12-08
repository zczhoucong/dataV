<template>
  <div :id="marker"></div>
</template>
<script>
export default {
  name: "markerLayer",
  props: {
    width: { type: [Number, String], default: 400 }, // 宽度
    height: { type: [Number, String], default: 200 }, // 高度
    sourceData: { type: Object, default: [] },
    sourceStyle: { type: Array, default: [] },
    vectorRange: { type: Object, default: {} }
  },
  data() {
    return {};
  },
  computed: {
    // 根据选中的边框类型设置边框样式
    getStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  created() {
    this.initOption();
    this.addMarker();
  },
  methods: {
    randomCoord(){
      return [114.40512441851385 - (0.2 - (Math.random() * 0.2 * 2)), 30.51334586864693 - (0.2 - (Math.random() * 0.2 * 2))];
    },
    addMarker() {
      let data = [];
      for (let i = 0; i < 30; i++) {
        let coord = this.randomCoord();
        data.push({
          id: i+1,
          name: '标注'+(i+1),
          x: coord[0],
          y: coord[1]
        })
      }
      let layername = 'markerlayer', index = 0;
      let inter = setInterval(() => {
        index++;
        let layerid = layername + index;
        this.$mapapi.layerExistStatus(layerid, status => {
          if(!status){
            clearInterval(inter);
            let option = {
              layername: layerid,
              // imgname: "", //图片名称--可无(相对路径下assets/map文件夹内图片名称)
              markerWidth: 24, //图片宽度--可无
              markerHeight: 34 //图片高度--可无
            };
            this.$mapapi.addMarker(data, option, data => {});
            this.$mapapi.updateMarkerStyle(layerid, window.markerOption[layerid]);
          }
        });
      }, 500);
    },
    initOption(layerid){
      window.markerOption = {};
      window.markerOption[layerid] = {
        TextField: "",
        textFill: "#fff",
        textFaceName: "arial",
        textWeight: "normal",
        textSize: 14,
        textOpacity: 1,
        textDx: 0,
        textDy: 0,
        textHaloOpacity: 0,
        textHaloFill: '#fff',
        textHaloRadius: 0,
        markerFile: '',
        markerWidth: 24,
        markerHeight: 34,
        markerOpacity: 1,
        markerDx: 0,
        markerDy: 0
      }
    },
  }
};
</script>