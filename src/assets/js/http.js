const apiMethods = {
  methods: {
    apiGet(url, data) {
      return new Promise((resolve, reject) => {
        this.axios.get(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
          console.log('超时')
        })
      })
    },
    apiPost(url, data) {
      return new Promise((resolve, reject) => {
        this.axios.post(url, data).then((response) => {
          resolve(response.data)
        }).catch((response) => {
          console.log('f', response)
          resolve(response)
          console.log('超时')
        })
      })
    },
    handelResponse(res, cb, errCb) {
      if (res.code == 200) {
        cb(res.data)
      } else {
        if (typeof errCb == 'function') {
          errCb()
        }
        console.log('数据错误')
      }
    }
  }
}

export default apiMethods
