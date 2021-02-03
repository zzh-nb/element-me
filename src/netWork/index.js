// 引入core文件
import { request } from "./config"
// 引入config文件
import { Method, PATH } from "./core"

const netClient = {

  // 登录接口：
  LOGIN(username, password) {
    return request(Method.POST, PATH.LOGIN + '?' + `username=${username}&password=${password}`)
  },

  // 退出
  GOOUT() {
    return request(Method.POST, PATH.GOOUT)
  },

  // 商品管理：
  SHOPP(num = 1) {
    return request(Method.GET, PATH.SHOPP + '?' + `pageNum=${num}`)
  },


  // 品类管理、
  OTHER() {
    return request(Method.GET, PATH.OTHER + "?" + `categoryId=0`)
  },


  // 查询
  SEARCH(status, name) {
    return request(Method.GET, PATH.SEARCH + '?' + `listType=${status}&pageNum=1&productName=${name}`)
  },


  // 订单管理
  ORDER(num = 1) {
    return request(Method.GET, PATH.ORDER + '?' + `pageNum=${num}`)
  },

  //商品上架与下架
  setStatus(id, status) {
    return request(Method.GET, PATH.status + `?productId=${id}&status=${status}`)
  },

  //商品详情
  detail(id) {
    return request(Method.GET, PATH.detail + `?productId=${id}`)
  },

  //品级
  category(id) {
    return request(Method.GET, PATH.category + `?categoryId=${id}`)
  },

  //修改商品
  setShop(ids, name, title, img, detail, price, num, status, id) {
    return request(Method.GET, PATH.setShop + `?categoryId=${ids}&name=${name}&subtitle=${title}&subImages=${img}&detail=${detail}&price=${price}&stock=${num}&status=${status}&id=${id}`)
  },

  //上传图片
  imgs(upload_file) {
    return request(Method.POST, PATH.imgs, upload_file)
  },

  //添加商品
  getShop(ids, name, title, img, detail, price, num, status) {
    return request(Method.GET, PATH.setShop + `?categoryId=${ids}&name=${name}&subtitle=${title}&subImages=${img}&detail=${detail}&price=${price}&stock=${num}&status=${status}`)
  },

  //修改品类
  setCategory(id, name) {
    return request(Method.GET, PATH.setCategory + `?categoryId=${id}&categoryName=${name}`)
  },

  //添加品类 
  ddCategory(id, name) {
    return request(Method.GET, PATH.addCategory + `?parentId=${id}&categoryName=${name}`)
  },

  //订单搜索
  order_search(name) {
    return request(Method.GET, PATH.order_search + `?listType=search&pageNum=1&orderNo=${name}`)
  },

  //订单详情
  order_detail(id) {
    return request(Method.GET, PATH.order_detail + `?orderNo=${id}`)
  },
}

// 抛出netClient
export default netClient;
