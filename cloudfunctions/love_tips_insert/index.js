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
 * comment        string
 * order          number  优先级
 * 
 * ---- auto generate properties ----
 * is_complete    bool
 * is_del         bool
 * self_id        string
 * picker_id      string
 * add_time       Date
 * pick_time      Date
 * complete_time  Date
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const collection = db.collection('love-tips')
  await collection.add({
    data : {
      name : event.name,
      images : event.images,
      price : event.price,
      comment : event.comment,
      order : event.order,
      is_complete : false,
      is_del : false,
      self_id : wxContext.OPENID,
      picker_id : wxContext.OPENID,
      add_time : db.serverDate(),
      pick_time : db.serverDate(),
      complete_time : db.serverDate(),
      del_time : db.serverDate(),
    }
  }).then(
    res => {
      console.log('suc'+res._id)
      this._id = res._id
    },
    err => {
      console.log('fail')
      this._id = undefined
    }
  )

  return {
    tip_id: this._id
  }
}