<template>
    <Modal v-model="showDialog" :footerHide="true" :scrollable="true" :closable="false" class-name="defModel">
        <iframe :src="href" frameborder="0" style="width:100%"></iframe>
    </Modal>
</template>
<script>
    export default{
        props: {
            showDialog: {
                type: Boolean,
                default: false
            },
            href: {
                type: String,
                default: ''
            },
            width: {
                type: String | Number,
                default: 520
            }
        }
    }
</script>
<style>
    .defModel .ivu-modal-body {
        padding: 0
    }
</style>