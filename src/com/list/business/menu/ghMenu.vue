<template>
    <section class="menu-box" :id="menuComId" :style="container">
        <ul>
            <li v-for="menu in menuData" :style="liStyle" :key="menu.xid">
                <div class="menu" @click="bindEvent(menu)" :style="sltName===menu.title?[spanStyle,sltStyle]:spanStyle">{{menu.title}}</div>
            </li>
        </ul>
    </section>
</template>
<script>
    import guid from '../../../../utils/guid';
    import {getApiSource} from '../../../../utils/getApiData'
    export default{
        props: {
            width: {type: [Number, String]},
            height: {type: [Number, String]},
            ImgWidth: {type: [Number, String]},
            ImgHeight: {type: [Number, String]},
            topOffset:{type: [Number, String],default:0}, // 上移
            bgImg: {type: String, default: `${config.resourceApiUrl}/images/menu/defMenu.png`}, // 默认背景图片
            fontSize: {type: Number, default: 16}, // 字体大小
            fontColor: {type: String, default: ""},//字体颜色
            fontWeight: {type: String, default: 'bold'}, //字体粗细
            fontFamily: {type: String, default: ""}, // 字体样式
            sltName: {type: String}, // 选中菜单ID,
            sltImg: {type: String, default: `${config.resourceApiUrl}/images/menu/sltMenu.png`},// 选中背景图片
            sltColor: {type: String, default: ""}, // 选中字体样式
            dataType: {type: String, default: "Static"},
            apiUrl: {type: String, default: ""},
            staticData: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            menuId: {type: String, default: "id"},
            menuName: {type: String, default: "name"}
        },
        data(){
            return {
                menuComId: guid(),
                comName: '规划菜单',
                colorNum: 1,
                menuData: []
            }
        },
        computed: {
            container(){
                return {
                    width: `${this.width.toString().replace('px', '')}px`,
                    height: `${this.height.toString().replace('px', '')}px`,
                }
            },
            liStyle(){
                return {
                    width: `calc(100% / ${this.menuData.length})`
                }
            },
            spanStyle(){
                return {
                    width: `${this.ImgWidth}px`,
                    height: `${this.ImgHeight}px`,
                    lineHeight: `${this.ImgHeight- this.topOffset}px`,
                    fontSize: `${this.fontSize}px`,
                    color: this.fontColor,
                    fontFamily: this.fontFamily,
                    fontWeight: this.fontWeight,
                    background:`url("${this.bgImg}") no-repeat`,
                    backgroundSize: "100% 100%"
                }
            },
            sltStyle(){
                return {
                    color: this.sltColor,
                    background:`url("${this.sltImg}") no-repeat`,
                    backgroundSize: "100% 100%"
                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                // 注册组件内部待绑定事件个数
                setTimeout(() => {
                    this.initMenuList();
                });
            })
        },
        methods: {
            async initMenuList(){
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                this.callbackEvent(dataJson);

            },
            bindEvent(stat){
                // 注册内部元素点击事件
                this.$emit('callback', {
                    type: 'click',
                    data: {
                        title: stat.title,
                        xtype: stat.xid
                    }
                })
            },
            callbackEvent(dataJson){
                dataJson.forEach(i => {
                    this.menuData.push({
                        title: i[this.menuName],
                        xid: i[this.menuId]
                    })
                })
                this.$emit('count', {
                    count: this.menuData.length,
                    data: this.menuData
                });
            }
        }
    }
</script>
<style type="text/less" scoped lang="less">
    .menu-box {
        ul {
            float: left;
            width: 100%;
            height: 100%;
            li {
                float: left;
                height:100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .menu {
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }
</style>