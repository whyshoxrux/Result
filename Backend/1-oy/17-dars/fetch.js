// function post(text){
//     for(const key of text){
//         if(key.postId == 2){
//             console.log(key);
//         }
//     }
// }

// fetch("https://jsonplaceholder.typicode.com/comments", {method: "GET"})


// .then(function(natija){
//     return natija.json();
// })
// .then(function(natijaJson){
//     post(natijaJson);
// })
// .catch(function(error){
//     console.log("Xatolik boldi", error.message);
// })



//! ////////////////////////////////////////////////



fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
    "postId": 2,
    "id": 10,
    "name": "Shoxrux",
    "email": "shoxrux@caroline.name",
    "body": "NIGGA"
    })
})


.then(function(natija){
    return natija.json();
})
.then(function(natijaJson){
    console.log(natijaJson);
})
.catch(error => console.error('Xato', error));