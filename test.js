const productsArray = [
    {
        id: 1,
        title: 'mouse',
        price: 123,
        description: 'Good mouse'
    },
    {
        id: 2,
        title:'keyboard',
        price: 1234,
        description: 'Excellent keyboard'
    }
]


// Promise

// pending - ще виконується (очікування)
// rejected - завершено з помилкою (помилка)
// fulfilled - успішно завершено (успіх)

function getProducts(){    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productsArray)
            // reject("Error")
        }, 1000)
    })
}

async function showProducts() {
    try{
        const products = await getProducts()
        
        console.log(products)
    } catch (error) {
        console.log(error)
    }
}

showProducts()


// .then and .catch

// getProducts()
//     .then((products) => {
//         console.log(products)  
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
   

// 

// function wait(ms) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve()
//         }, ms)
//     })
// }

// async function example() {
//     console.log(1)

//     await wait(1000)

//     console.log(3)
// }

// example()

// console.log(2)