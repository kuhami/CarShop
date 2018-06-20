var app = getApp();
Page( {
  data: {
    userInfo: {
        avatarUrl:'../../image/tu.png',
    },
      //转发功能
    shareData: {
        title: '兔个槽吧',
        desc: '吐啊吐啊吐啊',
        path: '/pages/my/index'
    },
    userListInfo: [ {
      icon: '../../image/my-order.png',
      text: '我的订单',
      nextPage:"myOrder"
      // isunread: true,
        // unreadNum: 2
    }, 
    // {4px
    //     icon: '../../images/iconfont-card.png',
    //     text: '我的代金券',
    //     isunread: false,
    //     unreadNum: 2
    //   }, 
    //   {
    //     icon: '../../image/my-Spell.png',
    //     text: '我的拼团',
    //     isunread: true,
    //     unreadNum: 3
    //   },
      {
        icon: '../../image/my-address.png',
        text: '收货地址管理',
        nextPage:"myAddress"
      },
        {
            icon: '../../image/search.png',
            text: '搜索',
            nextPage:"mySearch"
        },
        // {
      //   icon: '../../images/iconfont-kefu.png',
      //   text: '联系客服'
      // },
      // {
      //   icon: '../../images/iconfont-help.png',
      //   text: '常见问题'
      // }
      ]
  },

  onLoad: function() {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
        console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })

    })
  },
    onShareAppMessage: function () {
        return this.data.shareData
    },
    // 我的订单跳转
    myOrder: function() {
        wx.navigateTo({
            url: '../my-order/my-order'
        })
    },
    myAddress: function() {
        wx.navigateTo({
            url: '../my-address/my-address'
        })
    },
    mySearch: function() {
        wx.navigateTo({
            url: '../my-search/my-search'
        })
    }
})