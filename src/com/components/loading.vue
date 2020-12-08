<template>
    <!-- <transition name="fade">
        <div v-if="loadingShow">
            <Spin fix class="loading" >
                <Icon type="load-a" size=100 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>            
    </transition> -->
    <div class="loader-container" v-if="loadingShow">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
    export default {
        props: {
            loadingShow: {
                type: Boolean,
                default: true
            },
        },
    }
</script>

<style scoped lang="less">
    .loading {
        position: fixed;
        background-color: #0e2a43;
        font-size: 30px;
        z-index: 999;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

    @keyframes ball-climbing-dot-steps {
    0% {
        top: 0;
        right: 0;
        opacity: 0
    }

    50% {
        opacity: 1
    }

    100% {
        top: 100%;
        right: 100%;
        opacity: 0
    }
}

@keyframes ball-climbing-dot-jump {
    0% {
        -webkit-transform: scale(1, 0.7);
        -moz-transform: scale(1, 0.7);
        -o-transform: scale(1, 0.7);
        transform: scale(1, 0.7)
    }

    20% {
        -webkit-transform: scale(0.7, 1.2);
        -moz-transform: scale(0.7, 1.2);
        -o-transform: scale(0.7, 1.2);
        transform: scale(0.7, 1.2)
    }

    40% {
        -webkit-transform: scale(1, 1);
        -moz-transform: scale(1, 1);
        -o-transform: scale(1, 1);
        transform: scale(1, 1)
    }

    50% {
        bottom: 125%
    }

    46% {
        -webkit-transform: scale(1, 1);
        -moz-transform: scale(1, 1);
        -o-transform: scale(1, 1);
        transform: scale(1, 1)
    }

    80% {
        -webkit-transform: scale(0.7, 1.2);
        -moz-transform: scale(0.7, 1.2);
        -o-transform: scale(0.7, 1.2);
        transform: scale(0.7, 1.2)
    }

    90% {
        -webkit-transform: scale(0.7, 1.2);
        -moz-transform: scale(0.7, 1.2);
        -o-transform: scale(0.7, 1.2);
        transform: scale(0.7, 1.2)
    }

    100% {
        -webkit-transform: scale(1, 0.7);
        -moz-transform: scale(1, 0.7);
        -o-transform: scale(1, 0.7);
        transform: scale(1, 0.7)
    }
}
    .loader-container{
        width: 200px;
        height: 150px;
        display: block;
        font-size: 0;
        color: #fff;
        position: absolute;
        box-sizing: border-box;
        right: calc(~"50% - 100px");
        top:calc(~"50% - 100px");
    }
    .loader-container>div{
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor
    }

    
.loader-container>div:nth-child(1) {
    position: absolute;
    bottom: 32%;
    left: 30%;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    -webkit-transform-origin: center bottom;
    -moz-transform-origin: center bottom;
    -ms-transform-origin: center bottom;
    -o-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
    -moz-animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
    -o-animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
    animation: ball-climbing-dot-jump 0.6s ease-in-out infinite
}

.loader-container>div:not(:nth-child(1)) {
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 4px;
    border-radius: 0;
    -webkit-transform: translate(60%, 0);
    -moz-transform: translate(60%, 0);
    -ms-transform: translate(60%, 0);
    -o-transform: translate(60%, 0);
    transform: translate(60%, 0);
    -webkit-animation: ball-climbing-dot-steps 1.8s linear infinite;
    -moz-animation: ball-climbing-dot-steps 1.8s linear infinite;
    -o-animation: ball-climbing-dot-steps 1.8s linear infinite;
    animation: ball-climbing-dot-steps 1.8s linear infinite
}

.loader-container>div:not(:nth-child(1)):nth-child(2) {
    -webkit-animation-delay: 0ms;
    -moz-animation-delay: 0ms;
    -o-animation-delay: 0ms;
    animation-delay: 0ms
}

.loader-container>div:not(:nth-child(1)):nth-child(3) {
    -webkit-animation-delay: -600ms;
    -moz-animation-delay: -600ms;
    -o-animation-delay: -600ms;
    animation-delay: -600ms
}

.loader-container>div:not(:nth-child(1)):nth-child(4) {
    -webkit-animation-delay: -1200ms;
    -moz-animation-delay: -1200ms;
    -o-animation-delay: -1200ms;
    animation-delay: -1200ms
}
</style>