class ApiUtils
{
    
    constructor(apiContext, requestPayload){
        this.apiContext = apiContext;
        this.requestPayload = requestPayload;
    }

    async getToken(){
            const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.requestPayload
        })
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;

        console.log(token);
        return token;
    }

    async createOrder(orderApiRequestPayload){
        let response = {};
        response.token = await this.getToken();
        const OrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
        data: orderApiRequestPayload,
        headers: {
            'Authorization' : response.token,
            'Content-Type' : 'application/json'
        }
        })
        const OrderResponseJson = await OrderResponse.json();
        console.log(OrderResponseJson);
        const orderId = OrderResponseJson.orders[0];
        response.orderId = orderId;
        return orderId;
        
    }
}

module.exports = {ApiUtils};