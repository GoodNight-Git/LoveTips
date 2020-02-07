var temp = require('example.js');
var new_settings = [];
var selfInfo = {};
const res = wx.getStorageInfoSync();
if (res.keys.indexOf('selfInfo') == -1) {
  selfInfo = {
    name: '游客',
    sex: 'f', //f女，m男，u未知
    logo: "../../images/logo.jpg",
    linked: false
  }

} else {
  selfInfo = wx.getStorageSync('selfInfo');

}
var settings = [{
  title: "与" + (selfInfo.linked ? ((temp.otherInfo.sex == 'm' ? '他' : '她') + '解绑') : ((selfInfo.sex == 'm' ? '她' : '他') + '绑定')),
  icon: "../../images/icon/link@50.svg"
}, {
  title: (temp.otherInfo.sex == 'm' ? '他' : '她') + "的愿望",
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

if (!selfInfo.linked) {
  new_settings = settings.filter((item, index) => index != 1);
} else {
  new_settings = settings;
}

module.exports = {
  settings: new_settings
}