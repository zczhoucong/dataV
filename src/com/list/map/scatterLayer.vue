<template>
  <div></div>
</template>
<script>
export default {
  name: "scatterLayer",
  props: {
    width: { type: [Number, String], default: 400 }, // 宽度
    height: { type: [Number, String], default: 200 }, // 高度
    // sourceData: { type: Object, default: [] },
    // sourceStyle: { type: Array, default: [] },
    // vectorRange: { type: Object, default: {} }
  },
  data() {
    return {};
  },
  computed: {
  },
  created() {
    this.addScatter();
  },
  methods: {
    randomCoord(){
      return [114.40512441851385 - (0.2 - (Math.random() * 0.2 * 2)), 30.51334586864693 - (0.2 - (Math.random() * 0.2 * 2))];
    },
    addScatter() {
      this.$mapapi.effectScatter();
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