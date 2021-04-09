const axios = require("axios");
import app from "../configs/app";

function postData(url = "", dataPost = {}) {
  let URL = app.url.placeOrder
  let data = new FormData()

  if(!dataPost.address?.note){
    dataPost.address.note = ""
  }
  if(!dataPost.address?.email){
    dataPost.address.email = ""
  }
  data.append('address', JSON.stringify(dataPost.address))
  data.append('checkout_method', dataPost.checkout_method)
  data.append('frame', dataPost.selectedFrame)
  if(dataPost.charge_id){
    data.append('charge_id', dataPost.charge_id)
  }
  dataPost.imgs.forEach( (file,i) => {
    data.append(`images[${i}]`, file)
  });

  let config = {
    header : {
      'Content-Type' : 'multipart/form-data'
    }
  }

  return axios.post(URL, data, config)
}
export const putOrder = (dataPush) => {
  return postData(app.url.placeOrder , dataPush);
};
export const getOrderStatus = (data) => {
  return axios.get(app.url.getOrderStatus, {params : data})
}

export const generateVNPayInvoiceUrl = (data) => {
  return axios.post(app.url.generateVNPayInvoiceUrl, data)
}

export const getUnitPrice = () => {
  return axios.get(app.url.getUnitPrice)
}
