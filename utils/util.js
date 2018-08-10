const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

/**
 * 获取当前页url
 */
function getCurrentPageUrl() {
  var pages = getCurrentPages()                 // 获取加载的页面
  var currentPage = pages[pages.length - 1]     // 获取当前页面的对象
  var url = currentPage.route                   // 当前页面url
  return url
}

/**
 * 获取当前页带参数的url
 */
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages()                  // 获取加载的页面
  var currentPage = pages[pages.length - 1]      // 获取当前页面的对象
  var url = currentPage.route                    // 当前页面url
  var options = currentPage.options              // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

module.exports = {
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs
}

function getCode(_this, num) {
  _this.setData({
    isShow: true                    // 按钮1隐藏，按钮2显示
  })
  var remain = num;                 // 用另外一个变量来操作秒数是为了保存最初定义的倒计时秒数，就不用在计时完之后再手动设置秒数
  var time = setInterval(function () {
    if (remain == 1) {
      clearInterval(time);
      _this.setData({
        sec: num,
        isShow: false
      })
      return false                  // 必须有
    }
    remain--;
    _this.setData({
      sec: remain
    })
  }, 1000)
}
module.exports = {
  getCode                           // 此js模块化  也可以写成getCode:getCode
}


// 获取d当前时间多少天后的日期和对应星期
function getDates(days) {
  var todate = getCurrentMonthFirst()
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}

/**
 * 传入时间后几天
  * param：传入时间：dates: "2018-04-02", later:往后多少天
 */
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  dateObj.year = date.getFullYear();
  dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth());
  dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.week = show_day[day];
  return dateObj;
}

// 获取当前时间
function getCurrentMonthFirst() {
  var date = new Date();
  var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth()) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  return todate;
}

//获得某月的最后一天  
function getLastDay(year, month) {
  var new_year = year;    //取当前的年份          
  var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）          
  if (month > 12) {
    new_month -= 12;        //月份减          
    new_year++;            //年份增          
  }
  var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天          
  return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期          
} 

module.exports = {
  getDates: getDates,
  dateLater: dateLater,
  getLastDay: getLastDay
}

