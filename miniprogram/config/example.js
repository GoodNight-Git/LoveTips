var colorsList = require('color.js');
// var self = {
//   name: 'SPY-xxx',
//   sex: 'f',//f女，m男，u未知
//   logo: "../../images/logo.jpg",
//   linked: true
// };
var others = {
  name:'JZM',
  sex:'m',
  logo:"../../images/logo.jpg",
  linked:true
};
var list = [{
  id: 1,
  createdTime: "2020年1月14日 星期五",
  images: ["../../images/test1.jpg"],
  name: "鬼鬼的衣服",
  price: 1200,
  comment: "这是一个测试的例子",
  self: true,
  completed: false,
  del: false
}, {
  id: 2,
    createdTime: "2020年1月14日 星期五",
  images: ["../../images/test2.jpg"],
  name: "白白的衣服",
  price: 220,
  comment: "这是一个测试的例子",
  self: false,
  completed: false,
  del: false
}, {
  id: 3,
    createdTime: "2020年1月14日 星期五",
  images: ["../../images/test3.jpg"],
  name: "周边",
  price: 20,
  comment: "这是一个测试的例子",
  self: true,
  completed: true,
  del: false
}, {
  id: 4,
    createdTime: "2020年1月14日 星期五",
  images: ["../../images/test4.jpg"],
  name: "YSL口红",
  price: 150,
  comment: "这是一个测试的例子",
  self: true,
  completed: false,
  del: false
}];
var newList = [];
list.forEach((item, index) => {
  var temp = {
    id: 0,
    createdTime: "",
    completedTime:"",
    delTime:"",
    images: [],
    name: "",
    price: 0,
    comment: "",
    color: "",
    self: true,
    completed: false,
    del: false
  }
  temp.id = item.id;
  temp.createdTime = item.createdTime;
  temp.images = item.images;
  temp.name = item.name;
  temp.price = item.price;
  temp.comment = item.comment;
  temp.color = colorsList.colors[index % colorsList.colors.length];
  temp.self = item.self;
  temp.completed = item.completed;
  temp.del = item.del;
  newList.push(temp);
})
module.exports = {
  dataExampleList: newList,
  selfInfo: self,
  otherInfo:others
}