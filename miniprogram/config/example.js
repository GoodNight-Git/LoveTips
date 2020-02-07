var colorsList = require('color.js');
var self = {
  name:'SPY-xxx',
  sex:'female',
  logo:"../../images/logo.jpg",
  linked:1
};
var list = [{
  id: 1,
  time: "2020年1月14日 星期五",
  images: ["../../images/test1.jpg"],
  name: "鬼鬼的衣服",
  price: 1200,
  comment: "这是一个测试的例子",
  self: 1,
  completed:0
}, {
  id: 2,
  time: "2020年1月14日 星期五",
  images: ["../../images/test2.jpg"],
  name: "白白的衣服",
  price: 220,
  comment: "这是一个测试的例子",
  self: 0,
  completed: 0
}, {
  id: 3,
  time: "2020年1月14日 星期五",
  images: ["../../images/test3.jpg"],
  name: "周边",
  price: 20,
  comment: "这是一个测试的例子",
  self: 1,
  completed: 1
}, {
  id: 4,
  time: "2020年1月14日 星期五",
  images: ["../../images/test4.jpg"],
  name: "YSL口红",
  price: 150,
  comment: "这是一个测试的例子",
  self: 1,
  completed: 0
}];
var newList = [];
list.forEach((item, index) => {
  var temp = {
    id: 0,
    time: "",
    images: [],
    name: "",
    price: 0,
    comment: "",
    color: "",
    self:1,
    completed:0
  }
  temp.id = item.id;
  temp.time = item.time;
  temp.images = item.images;
  temp.name = item.name;
  temp.price = item.price;
  temp.comment = item.comment;
  temp.color = colorsList.colors[index % colorsList.colors.length];
  temp.self = item.self;
  temp.completed = item.completed;
  newList.push(temp);
})
module.exports = {
  dataExampleList: newList,
  selfInfo:self
}