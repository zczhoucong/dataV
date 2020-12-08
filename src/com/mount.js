/**
 * Created by 高春超 on 2018/3/7.
 */
import Vue from 'vue';
import store from '../vuex/store'

const mount = function (id, _component) {
    let components = $Vue.$store.state.components;
    let component = components.find(c => c.info.id === id);
    return new Promise((resolve, reject) => {       
        setTimeout(() => {            
            let data = {};
            if (_component.attributes) {
                Object.keys(_component.attributes).forEach(key => {
                    data[key] = _component.attributes[key].value;
                })
            }            
            let vm = new Vue({
                name: id.toString(),
                data() {
                    return data
                },
                template: _component.template.replace(":width",` comId="${id}" :width`),
                store,
                el: document.getElementById(id),
                mounted() {
                    this.$el.id = id
                    this.$el.style.position = "absolute";
                    this.$el.style.left = `${component.position.offsetLeft}px`;
                    this.$el.style.top = `${component.position.offsetTop }px`;
                    this.$el.style.transform =`rotate(${component.position.rotate }deg) scaleX(${component.position.scaleX}) scaleY(${component.position.scaleY})`;                    
                    this.$el.style.zIndex = `${component.position.zIndex }`;
                    this.$el.style.opacity = `${component.position.opacity }`;
                    this.$el.style.width = `${component.attributes.width.value}px`;
                    this.$el.style.height = `${component.attributes.height.value}px`;
                },
                methods: {
                    showDialogEvent(url) {
                        if (window.location.href.indexOf('screen') > 0) return;
                        window.open(url);
                    },
                    bindEvent(obj) {
                        // 判断是否注册点击事件
                        if (window.location.href.indexOf('screen') > 0) return;
                        const eventObj = _component.events.filter(event => event.type === 'click');
                        if (eventObj.length > 0) {
                            // 判断该子元素是否注册点击事件
                            const event = eventObj[0].children.filter(event => event.xid === obj.data.xtype);
                            if (event.length > 0) {
                                eval(event[0].event.replace(/ &t&/g, ' '))();
                            }
                        }
                    },
                    count(obj) {
                        //console.log('是否传递过来了---' + JSON.stringify(obj))
                        Object.assign(_component.attributes, {
                            _child: {
                                type: 'text',
                                value: obj
                            },
                        });
                        let curCom = $Vue.$store.state.currentComponent;
                        if(curCom.length===1){
                            $Vue.$store.commit('setCurrentCom', {
                                currentComponent: [_component]
                            });
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
            });
            resolve(vm);
        }, 100)
    })
}
export default mount;