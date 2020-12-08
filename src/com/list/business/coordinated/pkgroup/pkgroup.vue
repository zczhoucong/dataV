<template>
    <div class="pkgroupwrapper">
        <p class="cityname1">{{this.firstone}}</p>
        <img src="/../static/images/underline.png" class="underline1">
        <number-change :endVal='this.firstoneval' class="num1"></number-change>
        <pk class="pkpic"></pk>
        <p class="cityname2">{{this.twoone}}</p>
        <img src="/../static/images/underline.png" class="underline2">
        <number-change :endVal='this.twooneval' order=2 class="num2"></number-change>
    </div>

</template>
<script>
    import pk from "../subcomponents/pk/pk";
    import numberChange from "../subcomponents/numberChange/numberChange";
    export default {
        components: {
            pk,
            numberChange
        },
        props: {
            firstone: {
                type: String,
                default() {
                    return "";
                }
            },
            firstoneval: {
                type: Number
            },
            twoone: {
                type: String,
                default() {
                    return "";
                }
            },
            twooneval: {
                type: Number
            }
        },
    };
</script>
<style scoped lang="less" type="text/less">
    .pkgroupwrapper {
        width: 318px;
        height: 136px;
        position: relative;
        .pkpic {
            position: absolute;
            left: 115px;
            top: 0;
        }
        .num1 {
            position: absolute;
            bottom: -30px;
            left: 0px;
        }
        .num2 {
            position: absolute;
            right: 0px;
            bottom: -30px;
        }
        .cityname1,.cityname2 {
            font-family: zhscnm;
            position: absolute;
            top: 20px;
            font-size: 28px;
            color: white;
        }
        .cityname1 {
            left: 25px;
        }
        .cityname2 {
            right: 14px;
        }
        .underline1,.underline2 {
            position: absolute;
            top: 62px;
        }
        .underline1 {
            left: 15px;
        }
        .underline2 {
            right: 5px;
        }
    }
</style>
