/*
* @desc：协调发展-对标找差业务组件
* @Author: lujing
* @Date: 2018-06-01 10:24:10
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-26 18:43:14
*/
<template>
    <div class="getgapwrapper">
        <selector :comId ='comId' @selectitem="getitem" :isLBAuto='isLBAuto' :scrollTime='scrollTime*1000' class="selectorsty"
                  :dataitemarr='dataitem' ref='selectorref'></selector>
        <pkgroup @click.native="bindEvent()" style='cursor:pointer' :firstone="this.firstone"
                 :firstoneval="this.firstoneval" :twoone="this.twoone" :twooneval="this.twooneval"
                 class="pkgrouppos"></pkgroup>
    </div>
</template>
<script>
    import pkgroup from "./pkgroup/pkgroup";
    import selector from "./subcomponents/selector/selector2";
    import {getApiSource} from "@/utils/getApiData";
    import {getPageDifferData} from "@/api/corddataapi";
    export default {
        props: {
            comId: {type: String, default: ""}, //该组件ID
            width:{type:[Number,String]},
            height:{type:[Number,String]},
            scrollTime: {type: [Number, String], default: 2}, // 滚动时长
            isLBAuto: {type: [Boolean, String], default: false}, //是否自动轮播
            dataType: {type: String, default: "WebApi"},
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
            x: {type: String, default: "cityName"},
            y: {type: String, default: "val"},
            s: {type: String, default: "differCity"},
            i: {type: String, default: "planId"},
            t: {type: String, default: "planName"}
        },
        components: {
            pkgroup,
            selector,
        },
        data() {
            return {
                firstone: "上海",
                firstoneval: 6.56,
                twoone: "南京",
                twooneval: 8.12,
                // 对标找差需要的元数据
                dataitem: [],
                // 对标找差
                dbzc: "",
                // 对标找差名称
                dbzcname: ""
            };
        },

        mounted() {
            // 联网请求数据
            this.$nextTick(() => {
                // 获得数据
                this.getDatafromNet();
            });
            this.$emit("count", {
                count: 1,
                data: [
                    {
                        title: "对标找差",
                        xid: 1
                    }
                ]
            });
        },

        methods: {
            async getDatafromNet() {
                let dataJson = await getApiSource(
                    this.dataType,
                    this.apiUrl,
                    this.staticData
                );
                this.dbzc = dataJson;
                this.dbzcname = "对标找差";
                this.getdataitem();
                //触发子组件的轮播 
                this.$refs.selectorref.outpicker();
            },
            //获得对标找差的元数据
            getdataitem() {
                for (let k = 0; k < this.dbzc.length; k++) {
                    let obj = {};
                    obj.text = this.dbzc[k][this.t];
                    obj.value = k;
                    this.dataitem.push(obj);
                }
            },
            //对标找差的两个城市名称和对应的值
            getitem(item) {
                for (let i = 0; i < this.dbzc.length; i++) {
                    if (this.dbzc[i].planName == item) {
                        // 如果城市名称为空，则使用暂无替代
                        if (this.dbzc[i][this.x] == "" || this.dbzc[i][this.x] == null) {
                            this.firstone = "暂无";
                        } else {
                            this.firstone = this.dbzc[i][this.x];
                        }
                        //对标的值处理：数据整数位大于等于4，去掉小数位；如果为空，则显示0
                        if (
                            this.dbzc[i][this.y] == "" ||
                            this.dbzc[i][this.y] == null ||
                            this.dbzc[i][this.y] == "暂无数据"
                        ) {
                            this.firstoneval = 0;
                        } else {
                            // 大于等于4位取整
                            let temp = (this.dbzc[i][this.y] + "").split(".")[0];
                            let temparr = temp.split("");
                            if (temparr.length >= 4) {
                                this.firstoneval = parseInt(temp);
                            } else {
                                this.firstoneval = parseFloat(this.dbzc[i][this.y]);
                            }
                        }
                        if (
                            this.dbzc[i].differCity[0][this.x] == "" ||
                            this.dbzc[i].differCity[0][this.x] == null ||
                            this.dbzc[i].differCity[0][this.x] == "暂无数据"
                        ) {
                            this.twoone = "暂无";
                        } else {
                            this.twoone = this.dbzc[i].differCity[0][this.x];
                        }

                        // 值处理
                        if (
                            this.dbzc[i].differCity[0][this.y] == "" ||
                            this.dbzc[i].differCity[0][this.y] == null ||
                            this.dbzc[i].differCity[0][this.y] == "暂无数据"
                        ) {
                            this.twooneval = 0;
                        } else {
                            let temp2 = (this.dbzc[i].differCity[0][this.y] + "").split(".")[0];
                            let temp2arr = temp2.split("");
                            if (temp2arr.length >= 4) {
                                this.twooneval = parseInt(temp2);
                            } else {
                                this.twooneval = parseFloat(this.dbzc[i].differCity[0][this.y]);
                            }
                        }
                        return;
                    }
                }
            },
            // 绑定事件
            bindEvent() {
                let that = this;
                // 注册内部元素点击事件
                this.$emit("callback", {
                    type: "click",
                    data: {
                        title: "对标找差",
                        xtype: 1
                    }
                });
            }
        }
    };
</script>
<style scoped lang="less" type="text/less">
    .getgapwrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        .selectorsty {
            margin-right: 10px;
        }
    }
</style>
