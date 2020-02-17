// pages/index.js
var dataList = require('../../config/example.js');
var colorsList = require('../../config/color.js');
var settingList = require('../../config/setting.js');
import Toast from '../../dist/toast/toast';
import {db_manager} from '../../logic/db_manager.js';
import {
  io_manager
} from '../../logic/io_manager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH: wx.getSystemInfoSync().windowHeight,
    winW: wx.getSystemInfoSync().windowWidth,
    topActive: "completing", //上面标签栏
    active: 0, //下面标签页
    currentData: 0,
    imageURL: "../../images/logo.jpg",
    exampleData: dataList.dataExampleList,
    selfInfo: {
      name: '游客',
      sex: 'f', //f女，m男，u未知
      logo: "../../images/logo.jpg",
      linked: false
    },
    otherInfo: dataList.otherInfo,
    otherDream: dataList.otherDream,
    colorsData: colorsList.colors,
    // settingList: settingList.settings,
    settingList:[],
    popup_show: false,
    canUse: false, //判断是否授权登陆
    getCard_show:false,//控制抽卡是否出现
    getDream_idx:0,//抽卡标签
    animationMain: true,
    animation:false
    // animationBack: false
    // animationMain: null,//正面
    // animationBack: null,//背面
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    // fontFamily: 'Muyao-Softbrush',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('loading');
    var that = this;
    var res = wx.getStorageInfoSync();
    var otherInfo = this.data.otherInfo;
    console.log(res.keys)
    console.log(res.keys.indexOf('selfInfo'))
    console.log(this.data.selfInfo)
    if (res.keys.indexOf('selfInfo') == -1) {
      var selfInfo = {
        name: '游客',
        sex: 'f', //f女，m男，u未知
        logo: "../../images/logo.jpg",
        linked: false
      }
      that.setData({
        canUse: false,
        selfInfo: selfInfo
      })
      // var new_settings = [];
      var settings = [{
        title: "与" + (selfInfo.linked ? ((otherInfo.sex == 'm' ? '他' : '她') + '解绑') : ((selfInfo.sex == 'm' ? '她' : '他') + '绑定')),
        icon: "../../images/icon/link@50.svg"
      }, {
        title: (otherInfo.sex == 'm' ? '他' : '她') + "的愿望",
        icon: "../../images/icon/otherDream@50.svg"
      }, {
        title: "历史轨迹",
        icon: "../../images/icon/history@50.svg"
      }, {
        title: "心愿回收",
        icon: "../../images/icon/bin@50.svg"
      }, {
        title: "使用帮助",
        icon: "../../images/icon/qa@50.svg"
      }, {
        title: "关于我们",
        icon: "../../images/icon/gou@50.svg"
      }];
      that.setData({
        settingList: settings.filter((item, index) => index != 1)
      })
    } else {
      var selfInfo = wx.getStorageSync('selfInfo');
      that.setData({
        canUse: true,
        selfInfo: self,
      })
      var new_settings = [];
      var settings = [{
        title: "与" + (selfInfo.linked ? ((otherInfo.sex == 'm' ? '他' : '她') + '解绑') : ((selfInfo.sex == 'm' ? '她' : '他') + '绑定')),
        icon: "../../images/icon/link@50.svg"
      }, {
        title: (otherInfo.sex == 'm' ? '他' : '她') + "的愿望",
        icon: "../../images/icon/otherDream@50.svg"
      }, {
        title: "历史轨迹",
        icon: "../../images/icon/history@50.svg"
      }, {
        title: "心愿回收",
        icon: "../../images/icon/bin@50.svg"
      }, {
        title: "使用帮助",
        icon: "../../images/icon/qa@50.svg"
      }, {
        title: "关于我们",
        icon: "../../images/icon/gou@50.svg"
      }];

      if (selfInfo.linked) {
        new_settings = settings;
        that.setData({
          settingList: new_settings
        })
        console.log(that.data.settingList)
      } else {
        new_settings = settings.filter((item, index) => index != 1);
        that.setData({
          settingList: new_settings
        })
        console.log(that.data.settingList)
      }
      // that.setData({
      //   settingList: new_settings
      // })

    }
    // console.log(that.data.settingList)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('showing')
    var that = this;
    var selfInfo = wx.getStorageSync('selfInfo');
    this.setData({
      popup_show: false,
      active: 0,
      currentData: 0,
      selfInfo:selfInfo
      // canUse:canUse
    });
  },
  bindGetUserInfo(e) {
    var that = this;
    var selfInfo = {
      name: '游客',
      sex: 'f', //f女，m男，u未知
      logo: "../../images/logo.jpg",
      linked: false
    };
    console.log(selfInfo)
    var otherInfo = this.data.otherInfo;

    console.log('------------------')
    db_manager.login(e.detail.userInfo)
    

    var info = e.detail.userInfo;
    console.log(e.detail.userInfo)
    selfInfo.name = info.nickName;
    selfInfo.sex = (info.gender == 1 ? 'n' : 'f');
    selfInfo.logo = info.avatarUrl;
    selfInfo.linked = true;

    that.setData({
      selfInfo: selfInfo,
      canUse: true
    });
    wx.setStorageSync('selfInfo', selfInfo);
    console.log(e.detail.userInfo)
    this.onLoad();
    // this.onShow();
  },
  onChangeBar(event) {
    // event.detail 的值为当前选中项的索引
    var that = this;
    var detail = event.detail;

    this.setData({
      active: event.detail,
      currentData: event.detail,
      getCard_show: false
    });
    if (detail == 0 || detail == 2) {
      this.setData({
        popup_show: false,
        
        // active: event.detail,
        // currentData: event.detail,
      });
    }
  },
  onOpen(event) {
    const {
      position,
      name
    } = event.detail;
    switch (position) {
      case 'left':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
      case 'right':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
    }
  },
  //取消swiper的滑动操作
  stopTouchMove(event) {
    return false;
  },
  //点击右上角头像
  sexToast: function() {
    var self = this.data.otherInfo.sex;
    if (self == "m") {
      Toast('这是他的心愿喔~');
    } else {
      Toast('这是她的心愿喔~');
    }
  },
  //点击右下角花朵图像
  completedToast: function() {
    Toast('这是一个已完成的心愿~');
  },
  //点击下方中间添加按钮
  addClick: function() {
    var that = this;
    var popup_show = this.data.popup_show;
    this.setData({
      popup_show: !popup_show
    })
    if (this.data.popup_show == false) {
      that.setData({
        active: 0,
        currentData: 0
      });
    }
  },
  onPopupClose: function() {
    this.setData({
      popup_show: false
    })
  },
  toAddDream: function() {
    wx.navigateTo({
      url: '../addDream/addDream'
    })
  },
  toGetDream: function() {
    this.setData({
      popup_show:false,
      getCard_show:true,
      active: 1,
      currentData: 1
    });
  },
  getDreamSwiperChange:function(e){
    console.log(e)
    this.setData({
      getDream_idx:e.detail.current,
      animation: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('ready')
  },
  //获取swiper高度
  getHeight: function (e) {
    console.log(e.detail)
    var winWid = wx.getSystemInfoSync().windowWidth;
    console.log(winWid);
    // var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50;//获取当前屏幕的宽度
    // var imgh = e.detail.height;//图片高度
    // var imgw = e.detail.width;
    // var sH = winWid * imgh / imgw + "px"
    // this.setData({
    //   swiperH: sH//设置高度
    // })
  },
  rotateFn(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var idx = e.currentTarget.dataset.idx;
    var cur = this.data.getDream_idx;
    var ani = this.data.animation;
    this.setData({
      animation:!ani
    })
    console.log(this.data.animation)
    // if()
    // this.animation_main = wx.createAnimation({
    //   duration: 400,
    //   timingFunction: 'linear'
    // })
    // this.animation_back = wx.createAnimation({
    //   duration: 400,
    //   timingFunction: 'linear'
    // })
    // 点击正面

    if (id == 1) {
      this.setData({
        animationMain:false,
        // animation:false
        // animationBack:true
      })
      // this.animation_main.rotateY(180).step()
      // this.animation_back.rotateY(0).step()
      // this.setData({
      //   animationMain: this.animation_main.export(),
      //   animationBack: this.animation_back.export(),
      // })
    }
    // 点击背面
    else {
      this.setData({
        animationMain: true,
        // animation: false
        // animationBack: false
      })
      // this.animation_main.rotateY(0).step()
      // this.animation_back.rotateY(-180).step()
      // this.setData({
      //   animationMain: this.animation_main.export(),
      //   animationBack: this.animation_back.export(),
      // })
    }
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})