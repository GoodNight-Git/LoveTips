class database
{
  /**
   * data需要有以下属性：
   * name           string
   * images         string 不同url分号隔开
   * price          number
   * links          string 不同url分号隔开
   * comment        string
   */
  async dbinsert(data) {
    try {
      let res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'love_tips_insert',
        // 传给云函数的参数
        data: {
          name: 'jiang',
          images: '',
          price: 100,
          links: 'https://',
          comment: ''
        }
      })
      return res.result.tipid
    }
    catch (err) {
      console.error()
    }

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
      },
      fail: console.error
    })
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