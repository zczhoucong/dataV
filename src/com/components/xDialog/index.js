/**
 * Created by Administrator on 2018/4/13.
 */
import Vue from 'vue';
import xDialog from './xDialog.vue';

const xDialogConstructor = Vue.extend(xDialog);
xDialogConstructor.prototype.close = function () {
    var vm = this;
    this.$on('after-leave', _ => {
        if (vm.$el && vm.$el.parentNode) {
            vm.$el.parentNode.removeChild(vm.$el);
        }
        this.$destroy();
    })
    vm.value = false;
};
const xDialogBox = (options = {}) => {
    if (Vue.prototype.$isServer) return;
    options = Object.assign({}, options);
    let instance = new xDialogConstructor({
        el: document.createElement('div'),
        data: options
    });
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.value = true;
    });
    return instance;
}
export default xDialogBox;