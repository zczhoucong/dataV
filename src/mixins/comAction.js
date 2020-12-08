/**
 * @Author: 高春超
 * @description: 组件自身修改
 * @param {type} 
 * @return: 
 * @Date: 2019-03-15 15:14:55
 */
import {param2Obj} from '@/utils/assist'
export default {
    data(){
        return{
            pgId:''
        }
    }, 
    created(){
        const params=param2Obj(window.location.href);
        this.pgId= params.pgId;        
    },   
    methods:{
        // 修改组件位置层级信息
        updatePosition(params){
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
                zIndex: `${current.position.zIndex}`
            })
        }
    }
}