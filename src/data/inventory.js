// const inventory = {
// beans: {
// <beanType>: <grams>,
//...
// }
// milk: {
//     <milkType>: {
//         <oz>: <ozInStock>,
//         <milkPrice>: <priceValue>
//     }
// }
// }

const inventory = {
    beans: {
        ethiopian: 1000,
        colombian: 1000,
        nicaraguan: 1000
    },
    milk: {
        oat: {
            oz: 500,
            price: 1
        },
        whole: {
            oz: 5000,
            price: 0
        },
        almond: {
            oz: 1000,
            price: .50
        }
    }
}

export default inventory;