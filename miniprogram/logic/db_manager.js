class database
{
  /**
   * 用户点击登陆时，成功获取用户信息后调用
   * info  用户信息的对象，即wx.getUserInfo返回值中的userInfo 
   */
  async login(info)
  {
    console.log('-------info--------')
    console.log(info)
    try {
      let res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'login',
        // 传给云函数的参数
        data: {
          user_info: info
        }
      })
      return res.result
    }
    catch (err) {
      console.error()
    }
  }

  /**
   * 在登陆后同步用户数据，只获取前100条
   * -------output---------
   * tip_list   愿望列表
   * is_success
   */
  async love_tips_async() {
    try {
      let res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'love_tips_async',
        // 传给云函数的参数
        data: {}
      })
      return res.result
    }
    catch (err) {
      console.error()
    }
  }

  /**
   * 删除指定id的愿望
   * ---------in-----------
   * _id      愿望的id
   * 
   * ---------out----------
   * 返回一个数字代表删除的记录数，若为0，则不成功
   */
  async love_tips_delete(tip_id) {
    try {
      let res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'love_tips_delete',
        // 传给云函数的参数
        data: {
          _id: tip_id
        }
      })
      return res.result
    }
    catch (err) {
      console.error()
    }
  }

  /**
   * insert_obj需要有以下属性：
   * name           string
   * images         string 不同url分号隔开
   * price          number
   * links          string 不同url分号隔开
   * comment        string
   */
  async love_tips_insert(insert_obj)
  {
    try {
      let res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'love_tips_insert',
        // 传给云函数的参数
        // data: {
        //   name: 'jiang',
        //   images: '',
        //   price: 100,
        //   links: 'https://',
        //   comment: ''
        // }
        data: insert_obj
      })
      return res.result.tipid
    }
    catch (err) {
      console.error()
    }
  }

  /**
   * 根据id抽取一个愿望
   * -------out---------
   * 返回愿望对象
   */
  async love_tips_pick(player_id) {
    try {
      while (true)
      {
        let res = await wx.cloud.callFunction({
          // 云函数名称
          name: 'love_tips_get',
          data: {
            open_id: player_id
          }
        })
        if (res.is_success)
        {
          let index = Math.floor(Math.random() * res.tip_list.length)
          return res.tip_list[index]
        }
      }
      return res.result.tipid
    }
    catch (err) {
      console.error()
    }
  }


  // --------------private---------------

  /**
   * 传入对方openid
   * other_id    string 对方的id
   * 
   * --------out---------
   * --- suc ---
   * relation_info: 对方的信息对象
   * 包含如下：
   * open_id      openid
   * user_info    同微信UserInfo对象
   * --- fail ---
   * undefined
   */
  async relation_insert(other_id) {
    try {
      let res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'relation_insert',
        // 传给云函数的参数
        data: {
          other_id
        }
      })
      return res.result
    }
    catch (err) {
      console.error()
    }
  }

  test()
  {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'love_tips_insert',
      // 传给云函数的参数
      data: {
        name: 'jiang',
        images: '',
        price: 100,
        links: 'https://',
        comment: ''
      },
      success: res => {
        console.log(res.result.tipid)
        this.tipid = res.result.tipid

        wx.cloud.callFunction({
          // 云函数名称
          name: 'love_tips_delete',
          // 传给云函数的参数
          data: {
            _id: this.tipid
          },
          success: res => {
            console.log(res.result.remove_num)
          },
          fail: console.error
        })
      },
      fail: console.error
    })
  }
}


export var db_manager = new database()