const app = {
    logo : 'https://www.mixtiles.com/images/dark-logo.svg',
    url : {
        getUnitPrice : 'https://mixtilesvietnam.com/api/getprice', // Lấy đơn giá  - Method GET
        placeOrder : 'https://mixtilesvietnam.com/api/submitorder', // Đặt đơn - Method POST
        generateVNPayInvoiceUrl: 'https://mixtilesvietnam.com/api/makepaymentlink', // Lấy link thanh toán - Method POST
        getOrderStatus : 'https://mixtilesvietnam.com/api/getstatus' // Lấy trạng thái đơn hàng  - Method GET
    }
}
export default app
