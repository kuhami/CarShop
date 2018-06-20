// 获取小程序实例
var app = getApp();
var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var sizeType = [ ['compressed'], ['original'], ['compressed', 'original'] ]

Page({
    // 数据
    data: {
        hasNetworkType: false,
        systemInfo: {},

        /* 图片数据 */
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],

        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '原图或压缩'],

        countIndex: 8,
        count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        // 获取缓存API
        imageList: wx.getStorageSync('imageList'),
        //转发功能
        shareData: {
            title: '兔个槽吧',
            desc: '吐啊吐啊吐啊',
            path: '/pages/wx_API/wx_API'
        },
    },
    onShareAppMessage: function () {
        return this.data.shareData
    },
    onLoad: function() {
        this.setData({
            hasLogin: app.globalData.hasLogin
        })
    },
 /* 获取 网络类型函数 */
    getNetworkType: function() {
        var that = this;
        // 调取 网络类型API
        wx.getNetworkType({
            success: function(res) {
                console.log(res)
                that.setData({
                    hasNetworkType: true,
                    networkType: res.networkType
                })
            }
        })
    },
    // 清除 网络状态的数据
    clear: function() {
        this.setData({
            hasNetworkType: false,
            networkType: ''
        })
    },
/* 获取 系统信息函数 */
    getSystemInfo: function() {
        var that = this;
        // 调取 系统信息API
        wx.getSystemInfo({
            success: function(res) {
                console.log(res)
                that.setData({
                    systemInfo: res
                })
            }
        });
        // 3秒后 清空系统信息
        setTimeout(function () {
            that.setData({
                systemInfo: {}
            });
            // 消息提示框API
            wx.showToast({
                title: "持续3秒,数据已清空",
                duration: 2000,
                success: function() {
                    console.log("消息提示框API调用成功,持续2秒")
                }
            });
        }, 3000)
    },
/* 选择图片函数 */ 
    sourceTypeChange: function(e) {
        console.log(e);
        this.setData({
            sourceTypeIndex: e.detail.value
        });
    },
    sizeTypeChange: function(e) {
        console.log(e);
        this.setData({
            sizeTypeIndex: e.detail.value
        });
    },
    countChange: function(e) {
        console.log(e);
        this.setData({
            countIndex: e.detail.value
        });
    },
    // 选择函数
    chooseImage: function() {
        var that = this;
        // 选择图片API
        wx.chooseImage({
           sourceType:  sourceType[this.data.sourceTypeIndex],
           sizeType: sizeType[this.data.sizeTypeIndex],
           count: this.data.count[this.data.countIndex],
           success: function(res){
               console.log(res);
               console.log(res.tempFilePaths)
               //数据缓存API
               wx.setStorageSync('imageList', res.tempFilePaths);
               that.setData({
                   imageList: res.tempFilePaths
               })
               //模态弹窗API
               wx.showModal({
                   title: "上传成功",
                   content: "下次进入应用时，图片仍存在",
                   cancelColor: "red"
               })
           }
        })
    },
    // 预览图片API
    previewImage: function(e) {
        var current = e.target.dataset.src;
        // 预览图片API
        wx.previewImage({
            current: current,
            urls: this.data.imageList
        })
    },
    // 清除图片
    clearFile: function() {
        // 清除缓存API
        wx.removeStorageSync("imageList")
        this.setData({
            imageList: []
        })
        console.log("点击了清除图片按钮")
    },
/* 登录函数 */
    login: function() {
        var that = this;
        // 登录
        wx.login({
            success: function(res){
                console.log(res);
                // 改变全局属性
                app.globalData.hasLogin = true;
                that.setData({
                    hasLogin: app.globalData.hasLogin
                })
            }
        })
    },
/* 获取用户信息函数 */
    getUserInfo: function() {
        var that = this;
        if (app.globalData.hasLogin === false) {
            // 模态框API
            wx.showModal({
                title: "还未登录",
                content: "请先登录..."
            })
        } else {
            wx.showModal({
                title: "已登录",
                content: "调用获取信息函数..."
            })
            // 调用获取信息函数
            _getUserInfo();
        }
        // 获取信息函数
        function _getUserInfo() {
            // 获取用户信息API
            wx.getUserInfo({
                success: function(res) {
                    console.log(res);
                    that.setData({
                        userInfo: res.userInfo
                    })
                }
            })
        }
    },
    // 预览用户头像
    previewUser: function(res) {
        var userImage = res.target.dataset.userImage
        var urls = []
        // 追加元素到数组
        urls.push(userImage)
        // 预览图片API
        wx.previewImage({
            current: userImage,
            urls: urls,
        })
    },
    // 清除用户信息
    clearUserInfo: function() {
        this.setData({
            userInfo: {}
        })
    }
})