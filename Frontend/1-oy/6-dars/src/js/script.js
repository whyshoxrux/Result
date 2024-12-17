const postsWrap = document.querySelector('.posts');
let posts = []

async function getData(){
    await fetch('https://jsonplaceholder.typicode.com/posts')
}