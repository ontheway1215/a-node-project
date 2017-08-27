/**
 * @author: chen
 * @description:
 * @Date: 2017/8/24 下午5:36
 */
let baseUrl = 'http://192.168.1.37:8080/'
new Vue ({
  el: '.album-content',
  data() {
    return {
      zhanlang: [],
      aDog: [],
      xuelangquan: [],
      woshishui: [],
      renmin: [],
      fengmeng: [],
      hot: []
    }
  },
  methods: {
    getzhanlang() {
      axios({
        method: 'get',
        url: baseUrl + 'search/战狼2'
      })
        .then((res) => {
        console.log(res)
          this.zhanlang = res.data.emojis.slice(0, 4)
        }, (err) => {
          console.log(err)
        })
    },
    getAdog() {
      axios({
        method: 'get',
        url: baseUrl + 'search/一条狗的使命'
      })
        .then((res) => {
          this.aDog = res.data.emojis.slice(0, 4)
        }, (err) => {
          console.log(err)
        })
    },
    getXuelangquan() {
      axios({
        method: 'get',
        url: baseUrl + 'search/血狼犬'
      })
        .then((res) => {
          this.xuelangquan = res.data.emojis.slice(0, 4)
        }, (err) => {
          console.log(err)
        })
    },
    getWoshishui() {
      axios({
        method: 'get',
        url: baseUrl + 'search/我是谁的宝贝'
      })
        .then((res) => {
          this.woshishui = res.data.emojis.slice(0, 4)
        }, (err) => {
          console.log(err)
        })
    },
    getRenmin() {
      axios({
        method: 'get',
        url: baseUrl + 'search/人民的名义'
      })
        .then((res) => {
          this.renmin = res.data.emojis.slice(0, 4)
        }, (err) => {
          console.log(err)
        })
    },
    getFengmeng() {
      axios({
        method: 'get',
        url: baseUrl + 'search/冯梦龙传奇'
      })
        .then((res) => {
          this.fengmeng = res.data.emojis.slice(0, 4)
        }, (err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getzhanlang()
    this.getAdog()
    this.getXuelangquan()
    this.getWoshishui()
    this.getRenmin()
    this.getFengmeng()
  }
})