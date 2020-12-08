import guid from '@/utils/guid';
export default{
    props:{
        animation: {type: Boolean, default: true},
        animationType: {type: String, default: 'scale'},        
        animationDuration: {type: [Number, String], default: 1000}, // 宽度
        animationEasing: {type: String, default: 'cubicIn'},

        width: {type: [Number, String], default: 450}, // 宽度
        height: {type: [Number, String], default: 250}, // 高度
    },
    data(){
        return {
            chartId: guid()
        }
    },
    computed: {
        container(){
            return {
                width: `${this.width.toString().replace('px','')}px`,
                height: `${this.height.toString().replace('px','')}px`,
            }
        }
    },
    methods:{
        animationEffect(){
            let animation={
                animation:this.animation,
                animationType: this.animationType
            }
            if(this.animationType==='scale'){
                Object.assign(animation,{
                    animationEasing: this.animationEasing,
                    animationDuration:this.animationDuration,
                    animationDelay: function () {
                        return Math.random() * 200;
                    }
                })
            }
            return animation
        }
    },
    deactivated() {
        this.$destroy();
    }
}