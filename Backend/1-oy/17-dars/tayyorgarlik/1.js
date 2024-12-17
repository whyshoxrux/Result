//? fetch va axios kutubxonalaridan foydalanish orqali server 
//? bilan muloqot qilish mumkin. Ushbu kutubxonalar yordamida biz HTTP so'rovlar yuborish va javoblarni qabul qilishimiz mumkin



// fetch('https://jsonplaceholder.typicode.com/comments', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Xato:', error));




// fetch('https://jsonplaceholder.typicode.com/comments', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         title: 'misol',
//         body: 'mazmuni',
//         userId: 1
//     })
// })

// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error("Xato:", error));


const axios = require("axios")

axios.get('https://jsonplaceholder.typicode.com/posts',{
    title: 'yangi sarlavha',
    body: 'yangi mazmun',
    userId: 1
})

.then(response => {
    console.log('Yaratilgan malumot: ', response.data);

})
.catch(error => {
    console.error('Xato: ', error);
})