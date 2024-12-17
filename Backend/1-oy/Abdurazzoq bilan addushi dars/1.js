// const cars = [
//     {
//         'type': 'Fiat',
//         'model': '500',
//         'color': 'white',
//         'info': function () { return `${this.type} ${this.model} ${this.color}`;}
//     },

//     {
//         'type': 'Porsche',
//         'model': '911',
//         'color': 'black',
//         'info': function () { return `${this.type} ${this.model} ${this.color}`;}
//     }
// ];

// cars.forEach(car => {
//     console.log(car.info())
// })





async function get(){
    let response = await fetch('https://fakestoreapi.com/products');
    let jsonData = await response.json();

    console.log(jsonData);
}
get()