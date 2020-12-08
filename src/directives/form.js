// 自动聚焦
const focus={
     // 指令的定义
     inserted(el) {
        el.focus()
      }
}
const btnControl={
  inserted(el,bind){
    el.addEventListener("click", () => {
      el.disabled = true;
      bind.value().then(res => {
          el.disabled = false;
      });
  });
  }
}


export {focus,btnControl};