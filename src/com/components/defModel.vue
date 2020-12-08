<!--自定义弹出层 暂未使用-->
<template>
    <div class="def-model-box" v-show="">
        <div class="def-model-mask"></div>
        <div class="def-model-wrap">
            <div class="def-model">
                <div class="def-modal-content">
                    <a class="def-model-close">
                        <Icon type="ios-close-empty"></Icon>
                    </a>
                    <div class="def-model-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style type="text/less" lang="less">
    @zIndex: 10000;
    .def-model-box {
        .def-model-mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(55, 55, 55, 0.6);
            height: 100%;
            z-index: @zIndex
        }
        .def-model-wrap {
            position: fixed;
            overflow: auto;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: @zIndex;
            outline: 0;
            .def-model {
                width: auto;
                margin: 0 auto;
                position: relative;
                outline: 0;
                top: 100px;
            }
        }
    }
</style>