const div = document.createElement("div");

const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container")


const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");


//pegando id pela url
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");


//pegando todos os post
async function getAllPosts() {
    
    const response = await fetch(url);
    
    const data = await response.json();

    loadingElement.classList.add("hide");

    data.map((post)=> {

        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerHTML = post.title;
        body.innerText = post.body;
        link.innerHTML = "Ler";
        link.setAttribute("href",`/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div);

    });
}

// pegando o post individual

async function getPost(id) {
    
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
    ])

    const dataPost = await responsePost.json();
    const dataComments = await responseComments.json();

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const commentText = document.createElement("p");

    title.innerText = dataPost.title;
    commentText.innerText = dataPost.body;

    postContainer.appendChild(title);
    postContainer.appendChild(commentText);

    dataComments.map((comment)=>{
        createComment(comment)
    })
}
function createComment(comment){

    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");

    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    div.appendChild(email);
    div.appendChild(commentBody);

    commentsContainer.appendChild(div);

}

    
async function postComment(comment){
    const response = await fetch(`${url}/${postId}/comments`,{
        method: "POST",
        body: comment,
        headers:{
            "Content-type": "application/json",
        }
    })

    const data = await response.json();

    createComment(data)

}



if(!postId){
    getAllPosts();
}else{
    getPost(postId);

    commentForm.addEventListener("submit", e => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value
        };

        comment = JSON.stringify(comment);

        postComment(comment);
    })
}