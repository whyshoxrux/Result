const axios = require("axios")
axios
.get("https://jsonplaceholder.typicode.com/comments/499")
.then(function(response){
    console.log("Comments", response.data);
})
.catch(function(error){
    console.log("Xatolik boldi", error.message);
})



async function komentlarniOlish(){
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/comments/499"
        )
    }catch{}
}