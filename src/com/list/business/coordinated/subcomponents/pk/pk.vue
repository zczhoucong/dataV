<template>
    <div class="pkwrapper">
        <img class="img1" src="/../static/images/firstcir.png">
        <img class="img2" src="/../static/images/seccir.png">
        <img class="img3" src="/../static/images/thirdcir.png">
        <img class="img4" src="/../static/images/pk.png">
    </div>

</template>
<script>
    export default {};
</script>

<style scoped lang="less" type="text/less">
    @import '../../../../../../styles/animat.less';

    .pkwrapper {
        width: 100px;
        height: 100px;
        position: relative;

        .img1 {
            position: absolute;
            top: 0;
            left: 0;
            animation: myfirst 5s infinite linear;
            -moz-animation: myfirst 5s infinite linear;
            -webkit-animation: myfirst 5s infinite linear;
            -o-animation: myfirst 5s infinite linear;
        }

        .img2 {
            position: absolute;
            top: 8px;
            left: 8px;
            animation: mysec 4s infinite linear;
            -moz-animation: mysec 4s infinite linear;
            -webkit-animation: mysec 4s infinite linear;
            -o-animation: mysec 4s infinite linear;
        }

        .img3 {
            position: absolute;
            top: 21px;
            left: 21px;
            animation: myfirst 4s infinite linear;
            -moz-animation: myfirst 4s infinite linear;
            -webkit-animation: myfirst 4s infinite linear;
            -o-animation: myfirst 4s infinite linear;
        }

        .img4 {
            position: absolute;
            top: 40px;
            left: 40px;
        }
    }
</style>
