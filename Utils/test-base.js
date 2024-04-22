const base = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        testDataForOrder :{
        
                email : "anshika222@gmail.com",
                password : "Iamking@000",
                productName: "ADIDAS ORIGINAL"
            
        }
    }
)