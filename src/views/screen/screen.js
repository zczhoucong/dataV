/**
 * Created by Administrator 
 */
const menu = [{
  name: '图表',
  level: 'multi',
  children: [{
    name: '柱图',
    type: 'chart',
    children: [{
      name: '垂直基本柱图',
      type: 'barBasic',
      pType: 'chart',
      img: require('../../images/com/chart/barBasic.png')
    }, {
      name: '水平基本柱图',
      type: 'barVertBasic',
      pType: 'chart',
      img: require('../../images/com/chart/barBasicv.png')
    }, {
      name: '弧形柱图',
      type: 'ringBar',
      pType: 'chart',
      img: require('../../images/com/chart/ringBar.png')
    }, {
      name: '梯形柱图',
      type: 'barVert',
      pType: 'chart',
      img: require('../../images/com/chart/txbar.png')
    }, {
      name: '分组柱图',
      type: 'barHori',
      pType: 'chart',
      img: require('../../images/com/chart/fzbar.png')
    }, {
      name: '折线柱图',
      type: 'lineBar',
      pType: 'chart',
      img: require('../../images/com/chart/lineBar.png')
    }, {
      name: '垂直堆叠柱图',
      type: 'barVertStack',
      pType: 'chart',
      img: require('../../images/com/chart/barVert.png')
    }, {
      name: '水平堆叠柱图',
      type: 'barHoriStack',
      pType: 'chart',
      img: require('../../images/com/chart/barHori.png')
    }, {
      name: '垂直胶囊柱图',
      type: 'barVertJn',
      pType: 'chart',
      img: require('../../images/com/chart/barVertJn.png')
    }, {
      name: '水平胶囊柱图',
      type: 'barHoriJn',
      pType: 'chart',
      img: require('../../images/com/chart/barHoriJn.png')
    }, {
      name: '水平双向柱状图',
      type: 'hpanhBar',
      pType: 'chart',
      img: require('../../images/com/chart/hpanhBar.png')
    }, {
      name: '水平状图',
      type: 'horBar',
      pType: 'chart',
      img: require('../../images/com/chart/horizontalBar .png')
    }]
  }, {
    name: '饼图',
    type: 'chart',
    children: [{
      name: '基本饼图',
      type: 'pieBasic',
      pType: 'chart',
      img: require('../../images/com/chart/pieBasic.png')
    }, {
      name: '单值百分比饼图',
      type: 'pieSignle',
      pType: 'chart',
      img: require('../../images/com/chart/pieSignle.png')
    }, {
      name: '标注对比饼图',
      type: 'pieCompare',
      pType: 'chart',
      img: require('../../images/com/chart/pieCompare.png')
    }, {
      name: '带图饼图',
      type: 'pieIcon',
      pType: 'chart',
      img: require('../../images/com/chart/pieIcon.png')
    }, {
      name: '多环带图饼图',
      type: 'pieIconMulti',
      pType: 'chart',
      img: require('../../images/com/chart/pieSignle.png')
    }, {
      name: '旋转百分比环图',
      type: 'circleBorder',
      ptype: 'chart',
      img: require('../../images/com/chart/xzbfb.png')
    }]
  }, {
    name: '折线图',
    type: 'chart',
    children: [{
      name: '基本折线图',
      type: 'lineBasic',
      pType: 'chart',
      img: require('../../images/com/chart/lineBasic.png')
    }, {
      name: '双轴折线图',
      type: 'multiYLine',
      pType: 'chart',
      img: require('../../images/com/chart/multiLine.png')
    }]
  }, {
    name: '其他',
    type: 'chart',
    children: [{
        name: '词云',
        type: 'cloudWord',
        ptype: 'chart',
        img: require('../../images/com/chart/cy.png')
      }, {
        name: '常用列表',
        type: 'mulTable',
        ptype: 'chart',
        img: require('../../images/com/chart/list.png')
      },
      {
        name: '基本仪表盘',
        type: "gaugeBasic",
        pType: 'chart',
        img: require('../../images/com/chart/ybp2.png')
      }, {
        name: '基本水球图',
        type: 'liquidFill',
        pType: 'chart',
        img: require('../../images/com/chart/liquidFill.png')
      }, {
        name: '基本雷达图',
        type: 'radarBasic',
        pType: 'chart',
        img: require('../../images/com/chart/radarBasic.png')
      }, {
        name: '基本气泡图',
        type: 'bubbleBasic',
        pType: 'chart',
        img: require('../../images/com/chart/bubbleBasic.png')
      }, {
        name: '特色气泡图',
        type: 'bubbleSpecial',
        pType: 'chart',
        img: require('../../images/com/chart/bubbleSpecial.png')
      }, {
        name: '金字塔图',
        type: 'funnel',
        pType: 'chart',
        img: require('../../images/com/chart/ldt.png')
      }
    ]
  }]
}, {
  name: '地图',
  level: 'single',
  type: 'map',
  children: [{
      name: '实时交通',
      type: 'traffic',
      pType: 'map',
      img: require('../../images/com/map/map_traffic.png')
    }, {
      name: '热力图',
      type: 'geomap',
      pType: 'map',
      img: require('../../images/com/map/map_traffic.png')
    }, {
      name: '迁徙图',
      type: 'geomap1',
      pType: 'map',
      img: require('../../images/com/map/map_traffic.png')
    } //,{
    //     name: '矢量图',
    //     type: 'geomap',
    //     pType: 'map',
    //     img: require('../../images/com/map/map_traffic.png')
    // },{
    //     name: '专题图',
    //     type: 'geomap',
    //     pType: 'map',
    //     img: require('../../images/com/map/map_traffic.png')
    // }
  ]
}, {
  name: '文字',
  level: 'multi',
  children:[{
    name: '标题',
    type: 'other',
    children:[{
      name: '通用标题',
      type: 'title',
      img: require('../../images/com/other/bt.png')
    },{
      name: '跑马灯',
      type: 'pmd',
      img: require('../../images/com/other/pmd.png')
    }, {
      name: '数字翻牌器',
      type: 'numberFlop',
      img: require('../../images/com/other/numberFlop.png')
    }, {
      name: '卡片翻牌器',
      type: 'numberCard',
      img: require('../../images/com/other/szfpq.png')
    },
    {
      name: '下拉框选择器',
      type: 'dropDownSelector',
      img: require('../../images/com/other/select.png')
    }]
  },{
    name: '列表',
    type: 'other',
    children:[{
      name: '简单列表',
      type: 'xtbody',
      img: require('../../images/com/other/jdlb.png')
    },
    {
      name: '基本菜单',
      type: 'ghMenu',
      img: require('../../images/com/default.png')
    },
    {
      name: 'tab页',
      type: 'xTab',
      img: require('../../images/com/other/tab.png')
    },]
  }]
},{
  name: '其他',
  level: 'single',
  type: 'other',
  children: [ {
      name: '条目边框',
      type: 'itemborder',
      img: require('../../images/com/other/tmbk.png')
    },
    {
      name: '自定义边框',
      type: 'border',
      img: require('../../images/com/other/zdybk.png')
    }, {
      name: '单张图片',
      type: 'sigImg',
      img: require('../../images/com/other/dztp.png')
    }, {
      name: '时间轴',
      type: 'xTimeLine',
      img: require('../../images/com/other/sjz.png')
    },
    {
      name: '圆形框',
      type: 'gauge',
      img: require('../../images/com/other/yh.png')
    },
    {
      name: '内联框架',
      type: 'innerFrame',
      img: require('../../images/com/other/iframe.png')
    },
    {
      name: '背景快',
      type: 'bBlocks',
      img: require('../../images/com/other/custom.png')
    }
  ]
},{
  name: '业务组件',
  level: 'single',
  type: 'work',
  children:[{
    name: '栏目',
    type: 'xPanel',
    ptype: 'other',
    img: require('../../images/com/other/custom.png')
  },{
    name: '业务组件',
    type: 'oneBusiness',
    ptype: 'custom',
    img: require('../../images/com/other/custom.png')
  }]
}];
export default menu;