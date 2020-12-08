/**
 * @Author: 高春超
 * @description: 组件右键菜单基本事件
 * @param {type} 
 * @return: 
 * @Date: 2019-03-15 13:23:54
 */
import {param2Obj} from '@/utils/assist'
export default {
    data(){
        return{
            pgId:'',
            zIndex:0
        }
    },    
    computed: {
        components: { //组件树 ，预览视图中所有组件
            get() {
                return this.$store.state.components
            },
            set(components) {
                this.$store.commit('setState', {
                    components: components,
                    pgId: this.pgId
                })
            }
        },
        current: { //当前选中组件
            get() {
                return this.$store.state.currentComponent
            }
        },
        checkList: { // 选中的组件集合
            get(){
                let list = [];
                this.$store.state.currentComponent.forEach(i => {
                    list.push(i.info.id);
                });
                return list;
            }
        }
    },    
    created(){
        const params=param2Obj(window.location.href);
        this.pgId= params.pgId;
        this.zIndex=this.getMaxIndex(); 
    },    
    methods:{
        // 修改组件位置信息
        updateComPosition(json){            
            this.updatePosition(json)
        },
         // 获取全部组件最高层级
         getMaxIndex(){
            let zIndex=0;
            this.components.forEach(x=>{
                if(x.position.zIndex>=zIndex){
                    zIndex=x.position.zIndex
                }
            })
            return zIndex;
        },        
        // 获取选中组件集合最高层级
        getMaxSltIdx(){
            const sortList = this.current.sort((a, b) => a.position.zIndex > b.position.zIndex ? -1 : 1);
            return sortList[0].position.zIndex;
        },
        // 获取选中组件集合最低层级
        getMinSltIdx(){
            const sortList = this.current.sort((a, b) => a.position.zIndex > b.position.zIndex ? -1 : 1);
            return sortList[sortList.length - 1].position.zIndex;
        },

        // 多组件置顶后，按顺序分别是max,max-1，底部组件保持不变，剩下的组件按照升序一次排序
        // 例如  1 2 3 4 5 6 ，25置顶后，1保持不变，剩下的3,4,6顺序依次变成2,3,4
        topLevel(){
            const maxIndex = this.getMaxIndex();
            const minIndex = this.getMinSltIdx();

            let currentComponent = JSON.parse(JSON.stringify(this.current)); // 选中组件集合
            // 获取选中组件和底部组件ID集合
            let idList = [...new Set(this.checkList)];
            this.components.forEach(i => {
                if (i.position.zIndex < minIndex) {
                    idList.push(i.info.id);
                }
            })

            // 根据ID集合获取除选中组件和底部组件外的其他组件
            const otherComponent = JSON.parse(JSON.stringify(this.components)).filter(i => {
                return !new Set(idList).has(i.info.id)
            });
            // 选中组件按照降序进行排序
            const ascCurrent = currentComponent.sort((a, b) => a.position.zIndex > b.position.zIndex ? -1 : 1);
            ascCurrent.forEach((i, index) => {
                const json= {
                    info: i.info,
                    position: Object.assign(i.position, {zIndex: maxIndex - index})
                }
                this.updateComPosition(json);                
            });
            // 其他组件按照升序进行排序
            const ascOthers = otherComponent.sort((a, b) => a.position.zIndex > b.position.zIndex ? 1 : -1);
            ascOthers.forEach((com, index) => {
                const json = {
                    info: com.info,
                    position: Object.assign(com.position, {zIndex: minIndex + index})
                };
                this.updateComPosition(json);
            })
        },
        // 多组件置底后，按顺序分别是0,1，，顶部组件保持不变，剩下的组件按照升序一次排序
        // 如果1 2 3 4 5 6 ，25置底后，6保持不变，剩下的1,3,4顺序依次变成3,4,5
        bottomLevel(){
            const maxIndex = this.getMaxSltIdx();
            let currentComponent = JSON.parse(JSON.stringify(this.current)); // 选中组件集合
            // 获取待移动的非选中组件
            let moveComponents = [];
            this.components.forEach(i => {
                const _index = currentComponent.findIndex(x => x.position.zIndex === i.position.zIndex);
                if (_index === -1 && i.position.zIndex < maxIndex) {
                    moveComponents.push(i)
                }
            });
            // 选中组件按照升序进行排序
            const ascCurrent = currentComponent.sort((a, b) => a.position.zIndex > b.position.zIndex ? 1 : -1);
            ascCurrent.forEach((i, index) => {
                const json={
                    info: i.info,
                    position: Object.assign(i.position, {zIndex: 0 + index})
                }
                this.updateComPosition(json);
            });

            // 其他组件按照升序进行排序
            const ascOthers = moveComponents.sort((a, b) => a.position.zIndex > b.position.zIndex ? 1 : -1);
            ascOthers.forEach((com, index) => {
                const json = {
                    info: com.info,
                    position: Object.assign(com.position, {zIndex: currentComponent.length + index})
                };
                this.updateComPosition(json);
            })

        },
        // 多组件上移一层，判断组件zIndex是否等于Max，如果是，则不移动，如果否，则判断该组件zIndex+1是否等于Max并且Max在多组件集合中，
        // 如果是，则依然不移动，如果否，则该组件zIndex+1；小于minZindex底部组件和大于多组件集合zIndex+1组件保持不变，其他组件按顺序依次填坑
        // 例如：1 2 3 4 5 6,25上移一层，按逻辑，5！=6 && （5+1）不在（2,5）集合中，则5的顺序变成6,2的顺序变成3,1,4保持位置不变，剩下的3,6依次变成2,5
        upLevel(){
            let currentComponent = JSON.parse(JSON.stringify(this.current)); // 选中组件集合
            const maxIndex = this.getMaxIndex();
            // 寻找要移动的非选中组件
            const components = JSON.parse(JSON.stringify(this.components));
            let moveComponents = [];
            currentComponent.forEach(i => {
                // 如果zIndex不等于Max并且zIndex+1不在currentComponent中
                const _index = currentComponent.findIndex(x => x.position.zIndex === (i.position.zIndex + 1));
                if (i.position.zIndex != maxIndex && _index === -1) {
                    const com = components.filter(x => x.position.zIndex === i.position.zIndex + 1);
                    if (com.length > 0) {
                        moveComponents.push(com[0])
                    }
                }
            });
            // 如果moveComponents长度等于0，则无选中组件移动
            if (moveComponents.length > 0) {
                //moveComponents组件移动
                moveComponents = moveComponents.sort((a, b) => a.position.zIndex > b.position.zIndex ? -1 : 1);
                // 获取moveComponents的zIndex最大值，小于最大值的才可以进行移动
                const maxMoveIndex = moveComponents[0].position.zIndex;
                currentComponent = currentComponent.sort((a, b) => a.position.zIndex > b.position.zIndex ? -1 : 1);
                for (let k = 0; k < moveComponents.length; k++) {
                    let a = [];
                    for (let m = 0; m < currentComponent.length; m++) {
                        if (k + 1 < moveComponents.length) {
                            if (currentComponent[m].position.zIndex < moveComponents[k].position.zIndex && currentComponent[m].position.zIndex > moveComponents[k + 1].position.zIndex) {
                                a.push(currentComponent[m]);
                            }
                        } else {
                            if (currentComponent[m].position.zIndex < moveComponents[k].position.zIndex) {
                                a.push(currentComponent[m]);
                            }
                        }
                    }
                    const json={
                        info: moveComponents[k].info,
                        position: Object.assign(moveComponents[k].position, {zIndex: moveComponents[k].position.zIndex - a.length})
                    }
                    this.updateComPosition(json);
                }

                //  选中组件移动
                currentComponent.forEach(i => {
                    if (i.position.zIndex < maxMoveIndex) {
                        const json={
                            info: i.info,
                            position: Object.assign(i.position, {zIndex: i.position.zIndex + 1})
                        }
                        this.updateComPosition(json);
                    }
                });
            }
        },
        // 多组件下移一层，判断组件zIndex是否等于0，如果是，则不移动，如果否，则判断该组件zIndex+1是否等于0并且0在多组件集合中，
        // 如果是，则依然不移动，如果否，则该组件zIndex-1；大于maxZindex顶部组件和小于多组件集合zIndex-1组件保持不变，其他组件按顺序依次填坑
        // 例如：1 2 3 4 5 6,25下移一层，按逻辑，2！=1 && （2-1）不在（2,5）集合中，则5的顺序变成4,2的顺序变成1,3,6保持位置不变，剩下的1,4依次变成2,5
        downLevel(){
            let currentComponent = JSON.parse(JSON.stringify(this.current)); // 选中组件集合
            // 寻找要移动的非选中组件
            const components = JSON.parse(JSON.stringify(this.components));
            let moveComponents = [];
            currentComponent.forEach(i => {
                // 如果zIndex不等于Max并且zIndex+1不在currentComponent中
                const _index = currentComponent.findIndex(x => x.position.zIndex === (i.position.zIndex - 1));
                if (i.position.zIndex != 0 && _index === -1) {
                    const com = components.filter(x => x.position.zIndex === i.position.zIndex - 1);
                    if (com.length > 0) {
                        moveComponents.push(com[0])
                    }
                }
            });
            // 如果moveComponents长度等于0，则无选中组件移动
            if (moveComponents.length > 0) {
                //moveComponents组件移动
                moveComponents = moveComponents.sort((a, b) => a.position.zIndex > b.position.zIndex ? 1 : -1);
                currentComponent = currentComponent.sort((a, b) => a.position.zIndex > b.position.zIndex ? 1 : -1);
                for (let k = 0; k < moveComponents.length; k++) {
                    let a = [];
                    for (let m = 0; m < currentComponent.length; m++) {
                        if (k + 1 < moveComponents.length) {
                            if (currentComponent[m].position.zIndex > moveComponents[k].position.zIndex && currentComponent[m].position.zIndex < moveComponents[k + 1].position.zIndex) {
                                a.push(currentComponent[m]);
                            }
                        } else {
                            if (currentComponent[m].position.zIndex > moveComponents[k].position.zIndex) {
                                a.push(currentComponent[m]);
                            }
                        }
                    }
                    const json= {
                        info: moveComponents[k].info,
                        position: Object.assign(moveComponents[k].position, {zIndex: moveComponents[k].position.zIndex + a.length})
                    }
                    this.updateComPosition(json);
                }

                //  选中组件移动
                currentComponent.forEach(i => {
                    if (i.position.zIndex > 0) {
                        const json={
                            info: i.info,
                            position: Object.assign(i.position, {zIndex: i.position.zIndex - 1})
                        }
                        this.updateComPosition(json);
                    }
                });
            }
        }
    }
}