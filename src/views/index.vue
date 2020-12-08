<!--系统首页-->
<template>
  <section class="datav-body">
    <div class="datav-header">
      <div class="system-logo">{{title}}</div>
      <div class="datav-user-box">
        <Dropdown>
          <Icon type="android-person" size="24" color="#fff"></Icon>
          <Button type="text" style="margin-top:-10px;" class="datav-user-btn">
            <span>SubSpring</span>
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="exitSystem">
              <Icon type="android-exit" size="20" style="float:left;"></Icon>
              <div style="float:left;margin-left:10px;">退出</div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="datav-contain">
      <div class="datav-menu">
        <ul class="datav-menu-list">
          <li :class="index===active?'active':''" v-for="(menu,index) in menuList" :key="'menu_'+index">
            <router-link :to="menu.path" @click.native="tabMenu(index,menu.path)">
              <Icon :type="menu.icon" size="20"></Icon>
              <span>{{menu.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="datav-page">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      title: config.header,
      active: 0,
      menuList: [{
        name: '我的可视化',
        icon: 'ios-easel-outline',
        path: '/datashow/project'
      }, {
        name: '我的模板',
        icon: 'ios-bookmarks-outline',
        path: '/datashow/model'
      }, {
        name: '我的皮肤',
        icon: 'ios-pie-outline',
        path: '/datashow/skin'
      }]
    }
  },
  created () {
    const index = this.menuList.findIndex(i => i.path === this.$route.path);
    if (index > -1) {
      this.active = index;
    }
  },
  methods: {
    exitSystem () {
      alert('退出系统')
    },
    tabMenu (index, path) {
      if (path === '') {
        this.$Message.warning("该功能尚未开放")
      } else {
        this.active = index;
      }
    }
  }
}
</script>