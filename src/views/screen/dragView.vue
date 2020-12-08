<template>
  <div class="screen-content" id="screenContent">
    <div class="dragView-panel" ref="dragPanel" @click.stop.prevent="emptyCom">
      <!--previewContainer 根据设置的高度进行动态变化，并保持上下左右居中-->
      <div id="previewContainer" :style="containStyle" @dragover="dragOver" @drop="drop">
        <div id="dragView" ref="dragView" :style="previewStyle">
          <div class="dragViewMap">
            <div :id="item.info.id" v-for="(item,index) in components" :key="'com_sort_'+index"></div>
            <drag-tool v-show="toolShow" @update="updateAttribute" @updatePosition="updatePosition"
              :component="component" v-for="(component,index) in current" :key="'tool_'+index"></drag-tool>
          </div>
        </div>
      </div>
    </div>
    <div class="dragView-scale">
      <div class="dragView-tool">
        <Icon type="ios-remove-circle-outline" size="20" color="#00c1de" class="icon-btn"
          @click.native="minusScale"></Icon>
        <Slider class="slider-tool" v-model="scale" :title="scale" :min="0.2" :max="4" :step="step"
          show-tip="never" @on-change="changeScale"></Slider>
        <Icon type="ios-add-circle-outline" size="20" color="#00c1de" class="icon-btn"
          @click.native="plusScale"></Icon>
        <Icon type="ios-refresh-circle-outline" size="20" color="#00c1de" class="icon-btn"
          @click.native="reSet"></Icon>
      </div>
    </div>
    <div class="arrow-left">
      <Icon :type="leftArrow?'ios-arrow-back':'ios-arrow-forward'" class="arrow-icon" @click.native="toggleLeft"></Icon>
    </div>
    <div class="arrow-right">
      <Icon :type="rightArrow?'ios-arrow-forward':'ios-arrow-back'" class="arrow-icon" @click.native="toggleRight"></Icon>
    </div>
  </div>
</template>
<script>

import { getTemplate } from '../../com/template/index'
import mount from '../../com/mount';
import guid from '../../utils/guid'
import { compareJson, parse_url } from '../../utils/assist'
import dragTool from './components/dragTool.vue';
import { saveCom } from '@/api/com'
export default {
  props: ['pgId'],
  components: {
    dragTool
  },
  data () {
    return {
      toolShow: false,// 是否显示组件工具栏
      leftArrow: true,
      rightArrow:true,
      panel: {
        width: 0, // 编辑区父容器宽度
        height: 0, // 编辑区父容器高度
      },
      zIndex: 0, // 组件层级
      scale: 0, // 当前放大级别
      step: 0.01, // 步长
      cKey: false, // 记录ctrl/shift键
      containStyle: {}, // 编辑区父容器样式                
      previewStyle: { // 编辑区样式
        "backgroundImage": `url(${this.$store.state.config.backgroundImage})`,
        "backgroundColor": `${this.$store.state.config.color}`
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(window).resize(() => {
        this.panel.width = this.$refs.dragPanel.clientWidth;
        this.panel.height = this.$refs.dragPanel.clientHeight;
      });
      this.reSet();
      $(window).keydown(e => {
        if (e.ctrlKey || e.shiftKey) {
          this.cKey = true;
        }
      }).keyup(() => {
        this.cKey = false;
      });
      $("#dragView").on("click contextmenu", ".com-border", ev => {
        const oEvent = ev || event;
        oEvent.cancelBubble = true;
        oEvent.stopPropagation();
        oEvent.preventDefault();
        this.clickPreview(oEvent)
      }).find(".com-border");
    })
  },
  computed: {
    components: { //组件树 ，预览视图中所有组件
      get () {
        return this.$store.state.components
      },
      set (components) {
        this.$store.commit('setState', {
          components: components,
          pgId: this.pgId
        })
      }
    },
    current: { //当前选中组件
      get () {
        return this.$store.state.currentComponent
      }
    },
    activedComponents () {
      const actived = this.$store.state.components.filter(i => {
        const attribute = i.attributes;
        const dataType = attribute.dataType;
        const apiUrl = attribute.apiUrl;
        return dataType && apiUrl && dataType.value === 'WebApi' && apiUrl.value.replace(/\s/g, '').indexOf('=:') > 0;
      })
      return actived;
    },
    keys () {
      return this.$store.state.keys
    },
  },
  watch: {
    ['$store.state.config.width'] () {
      this.reSet();
    },
    ['$store.state.config.height'] () {
      this.reSet();
    },
    ['$store.state.config.backgroundImage'] (val) {
      this.previewStyle = Object.assign(this.previewStyle, { "backgroundImage": `url(${val})` });
    },
    ['$store.state.config.color'] (val) {
      this.previewStyle = Object.assign(this.previewStyle, { "backgroundColor": `${this.$store.state.config.color}` });
    },
    keys: function (newVal, oldVal) {
      this.activeCom(newVal, oldVal);
    },
    panel: {
      handler () {
        // 重置编辑区大小
        this.reSet();
      },
      deep: true
    },
    current (val) {
      // 当前有选中组件时则显示工具栏，否则不显示工具栏
      if (val.length === 0) {
        this.toolShow = false;
      } else {
        this.toolShow = true;
      }
    }
  },
  methods: {
    // newKeys与oldKeys进行对比，判断哪些参数发生了变化。
    activeCom (newKeys, oldKeys) {
      //1、获取发生变化的参数集合
      const compare = compareJson(newKeys, oldKeys);
      // 根据参数集合获取含该参加的组件集合
      const sltedComs = this.activedComponents.filter(i => {
        //获取url参数集合
        const apiUrl = i.attributes.apiUrl.value;
        const params = parse_url(apiUrl);
        // 将url参数集合与keys进行对比，如果keys中存在，则返回改组件
        const result = Object.keys(params).filter(o => {
          return compare[params[o]];
        });

        if (result.length > 0) return i;
      });

      this.mountAll(sltedComs);
    },
    dragOver (e) {
      this.toolShow = false;
      e.preventDefault()
    },
    drop (e) {
      e.preventDefault();
      let info = JSON.parse(e.dataTransfer.getData('info'));
      info.id = guid();
      let component = getTemplate(info);
      // 设置组件实际位置
      const width = component.attributes.width.value;
      const height = component.attributes.height.value;
      let left = e.offsetX - width / 2;
      let top = e.offsetY - height / 2;
      // 判断e的目标对象是否是画布dragView,如果不是，则需要计算其实际位置
      if (e.target.id != 'dragView') {
        const _target = $(e.target).closest(".com-border");
        left = left + eval(_target.css('left').replace('px', ''));
        top = top + eval(_target.css('top').replace('px', ''));
      }
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      const zIndex = this.zIndex++;
      component.position = {
        offsetLeft: left,
        offsetTop: top,
        opacity:1,
        rotate:0,
        scaleX:1,
        scaleY:1,
        zIndex: zIndex
      };
      let components = JSON.parse(JSON.stringify(this.components));
      components.push(component);
      this.components = components;
      this.mountOne(component);
      this.$store.commit('setCurrentCom', {
        currentComponent: [component]
      })
    },
    // 取消当前组件选中
    emptyCom () {
      this.$store.commit('setCurrentCom', {
        currentComponent: []
      });
      $(".com-border").attr('data-component-active', '');
    },
    // 修改组件
    updateAttribute (params) {
      // 获取被修改组件参数
      let attr = params.attr || {};
      let position = params.position || {};
      let info = params.info || {};
      let events = params.events || [];
      // 获取当前store里的所有组件
      let components = JSON.parse(JSON.stringify(this.$store.state.components));
      // 获取被修改组件索引
      let index = components.findIndex(component => component.info.id === info.id);
      // 获取被修改组件
      let current = components.filter(component => component.info.id === info.id)[0];
      if (Object.keys(attr).length === 1 && attr[Object.keys(attr)].items) {
        attr[Object.keys(attr)].items = attr[Object.keys(attr)].items.split(',');
      }
      // 获取最新attr属性
      attr = Object.assign(current.attributes, attr);
      let component = getTemplate(info, attr, components[index].slots, events, components[index].active), //更新模板
        attributes = component.attributes;
      // 设置最新组件位置
      if (position) {
        component.position = Object.assign(current.position, position);
      }
      //getTemplate中可能修改了components，所以重新获取
      components = JSON.parse(JSON.stringify(this.$store.state.components))
      index = components.findIndex(component => component.info.id === info.id);
      Object.assign(components[index]['attributes'], attributes) //更新从getTemplate获取到的最新属性
      components[index]['slots'] = component.slots
      components[index].position = component.position;
      //更新组件的事件
      if (events.length > 0) {
        component.events = events;
        components[index].events = component.events;
      } else {
        component.events = current.events;
        components[index].events = component.events;
      }
      // 重置当前store里的所有组件
      this.$store.commit('setState', {
        components: components,
        pgId: this.pgId
      });
      let currentComponent = JSON.parse(JSON.stringify(this.$store.state.currentComponent));
      let _index = currentComponent.findIndex(component => component.info.id === info.id);
      // 如果store选中组件中含有被修改的组件，则修改store中选中组件的属性
      if (_index > -1) {
        Object.assign(currentComponent[_index]['attributes'], attributes);
        currentComponent[_index]['slots'] = component.slots
        currentComponent[_index].position = component.position;
        // if (currentComponent[_index].events) currentComponent[_index].events = component.events;
        currentComponent[_index].events = component.events;
        this.$store.commit('setCurrentCom', {
          currentComponent: currentComponent
        });
      }
      mount(component.info.id, component, this);
      this.saveCurComInfo(current)
    },
    //修改组件位置
    updatePosition (params) {
      let position = params.position;
      let info = params.info;
      // 获取当前store里的所有组件
      let components = JSON.parse(JSON.stringify(this.$store.state.components));
      let currentComponent = JSON.parse(JSON.stringify(this.$store.state.currentComponent));
      // 获取被修改组件索引
      let index = components.findIndex(component => component.info.id === info.id);
      let _index = currentComponent.findIndex(component => component.info.id === info.id);
      //修改当前组件的位置
      let current = components.filter(component => component.info.id === info.id)[0];
      Object.assign(current.position, position);
      components[index] = current;
      currentComponent[_index] = current;
      // 重置当前store里的所有组件
      this.$store.commit('setState', {
        components: components,
        pgId: this.pgId
      });
      this.$store.commit('setCurrentCom', {
        currentComponent: currentComponent
      });
      let com = document.getElementById(info.id);
      Object.assign(com.style, {
        position: 'absolute',
        left: `${current.position.offsetLeft}px`,
        top: `${current.position.offsetTop}px`,
        opacity: `${current.position.opacity}`,
        transform:`rotate(${current.position.rotate }deg) scaleX(${current.position.scaleX}) scaleY(${current.position.scaleY})`,
        zIndex: `${current.position.zIndex}`
      })
      this.saveCurComInfo(current)
    },
    //挂载当前组件
    mountOne (component) {
      mount(component.info.id, component).then((vm) => {
        $(".com-border").attr('data-component-active', '');
        $(`#${component.info.id}`).attr('data-component-active', 'true');
        this.saveCurComInfo(component)
      })
    },
    // 保存组件信息
    saveCurComInfo (component) {
      const info = {
        attributes: component.attributes,
        dataApi: component.dataApi,
        info: component.info,
        position: component.position,
        active: component.active,
        events: component.events
      }
      saveCom({ pageId: this.pgId, com_Id: component.info.id, com_value: JSON.stringify(info) })
    },
    // 挂载组件集合
    mountAll (components) {
      components.forEach(component => {
        mount(component.info.id, component);
      })
    },
    // 获取选中的组件
    getComponentNode (node) {
      if (node && node.getAttribute('data-component-active') !== null)
        return node
      else {
        if (node.parentElement)
          return this.getComponentNode(node.parentElement)
        else
          return false
      }

    },
    // 点击选中组件
    clickPreview (e) {
      let target = e.target;
      e.preventDefault();
      let componentHTML = this.getComponentNode(target);
      if (componentHTML) {
        //添加选中效果
        if (!this.cKey) { // 如果单选
          let list = document.querySelectorAll('[data-component-active="true"]');
          list.forEach(el => {
            el.setAttribute('data-component-active', '');
          });
        }
        componentHTML.setAttribute('data-component-active', 'true');
        //保存到vuex
        let currentId = componentHTML.id
        let component = this.components.find(component => component.info.id === currentId);
        if (component && this.cKey) { // 多选
          let currentComponent = JSON.parse(JSON.stringify(this.$store.state.currentComponent));
          currentComponent.push(component);
          this.$store.commit('setCurrentCom', {
            currentComponent: currentComponent
          })
        } else if (component) { // 单选
          this.$store.commit('setCurrentCom', {
            currentComponent: [component]
          })
        }
      }
    },
    // 控制图层组件板块
    toggleLeft () {
      this.leftArrow = !this.leftArrow;
      this.$emit("toggleLeft", this.leftArrow);
      this.ajustSize()
    },
    // 控制页面|组件设置板块
    toggleRight(){
      this.rightArrow = !this.rightArrow;
      this.$emit("toggleRight", this.rightArrow);
      this.ajustSize()
    },
    // 调整布局
    ajustSize(){
        // 左侧显示 右侧隐藏
        if(this.leftArrow&&!this.rightArrow){
          $("#screenContent").css("width", "calc(100% - 185px)");
        }else if(this.leftArrow && this.rightArrow){
          $("#screenContent").css("width", "calc(100% - 485px)");
        }else if(!this.leftArrow&&this.rightArrow){
          $("#screenContent").css("width", "calc(100% - 300px)");
        }else{
          $("#screenContent").css("width", "100%");
        }
         this.reSet();
    },
    // 重置编辑区大小
    reSet () {
      const width = this.$store.state.config.width;
      const height = this.$store.state.config.height;
      this.panel.width = this.$refs.dragPanel.clientWidth - 60; // 父容器宽度*设置margin:20px 30px
      this.panel.height = this.$refs.dragPanel.clientHeight - 40;  // 父容器高度
      const to = parseFloat(width / height);    // 获取配置宽高比
      let c, d;
      if (width > this.panel.width) { // 如果配置宽度大于a，则设置容器宽度为a，则容器高度为a/ to
        c = this.panel.width;
        d = Math.floor(this.panel.width / to);
        // 判断 容器高度是否大于 b
        if (d > this.panel.height) {
          d = this.panel.height;
          c = this.panel.height * to;
        }
      } else {
        c = width;
        d = Math.floor(width / to);
        if (d > this.panel.height) {
          d = this.panel.height;
          c = this.panel.height * to;
        }
      }
      // 设置previewContainer容器上下左右居中
      this.containStyle = {
        "width": `${c}px`,
        "height": `${d}px`,
        "marginLeft": `${((this.panel.width - c) / 2 + 30)}px`,
        "marginTop": `${((this.panel.height - d) / 2 + 20)}px`
      };
      this.previewStyle = Object.assign(this.previewStyle, {
        "width": `${width}px`,
        "height": `${height}px`,
        "transform": `scale(${parseFloat(c / width)})`,
        "visibility": "visible"
      });
      this.scale = parseFloat(c / width);
      //记录缩放比例
      this.$store.dispatch("setScale", this.scale);
    },

    // 缩小比例
    minusScale () {
      this.scale = this.scale - this.step;
      this.scaleScreen();
    },

    // 放大比例
    plusScale () {
      this.scale = this.scale + this.step;
      this.scaleScreen();
    },
    // 滑动滑块
    changeScale (value) {
      this.scale = value;
      this.scaleScreen();
    },
    // 缩放屏幕大小
    scaleScreen () {
      this.previewStyle = Object.assign(this.previewStyle, { "transform": `scale(${this.scale})` });
      // 设置previewContainer容器上下左右居中
      this.containStyle.width;
      const width = this.$store.state.config.width;
      const height = this.$store.state.config.height;
      this.containStyle.width = `${width * this.scale + 40}px`;
      this.containStyle.height = `${height * this.scale + 40}px`;
      //记录缩放比例
      this.$store.dispatch("setScale", this.scale);
    }
  },
}
</script>
<style>
@import url(../../styles/dragView.css);
</style>
