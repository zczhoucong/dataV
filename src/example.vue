<template>
    <div style="height: 100vh;background-color:#003;">
        <city-rate ></city-rate>
    </div>
</template>
<script>
    import xGradient from './com/components/xGradient'
    import cityRate from './com/list/other/innerFrame.vue'
    export default{
        components: {
            xGradient, cityRate
        },
        methods: {
            showStatus(json){
                console.log(json)
            }
        }
    }
</script>