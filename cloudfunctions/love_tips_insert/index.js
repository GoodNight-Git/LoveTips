// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'love-tips-env-ezgwv'
})

// 云函数入口函数
/**
 * ---- input properties ----
 * name           string
 * images         string
 * price          number
 * links          string
 * comment        string
 * 
 * ---- auto generate properties ----
 * add_time       Date
 * pick_time      Date
 * complete_time  Date
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const collection = db.collection('tips_uncompleted')
  await collection.add({
    data : {
      name : event.name,
      images : event.images,
      price : event.price,
      links : event.links,
      comment : event.comment,
      add_time : db.serverDate(),
      pick_time : db.serverDate(),
      complete_time : db.serverDate()
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}