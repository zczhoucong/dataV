export default {
    methods:{
        confirm(content,callback){
            this.$Modal.confirm({
                render: (h) => {
                    return h('div',[h('Icon',{
                      props:{
                        type:"md-help-circle",
                        size:32,
                        color:'#ff9900',                            
                      },
                      style:{
                          marginRight:'10px'
                        }
                    }),h('span',content)])
                },
              onOk:()=>{
                callback()
              }
            })
        },
        warning(content){
            this.$Modal.warning({
                render: (h) => {
                    return h('div',[h('Icon',{
                      props:{
                        type:"ios-alert",
                        size:32,
                        color:'#ff9900',                            
                      },
                      style:{
                          marginRight:'10px'
                        }
                    }),h('span',content)])
                },
                closable:true
            });
        }
    }
}