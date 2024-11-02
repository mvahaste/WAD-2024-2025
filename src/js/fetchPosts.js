// API: https://api.npoint.io/8a752e6d7ecbd9311040
// Edit: https://www.npoint.io/docs/8a752e6d7ecbd9311040
const JSON_API_LINK = "https://api.npoint.io/8a752e6d7ecbd9311040";
const JSON_PATH = "/WAD-2024-2025/assets/data/posts.json";

window.onload = function() {
    // fetchPostsFromSource(JSON_API_LINK);
    fetchPostsFromSource(JSON_PATH);
}

function createElementWithClass(tagName, DOMClass) {
    const element = document.createElement(tagName);
    element.setAttribute("class", DOMClass);
    return element;
}

function fetchPostsFromSource(source) {
    fetch(source)
        .then((response) => response.json())
        .then(json => {
            const mainElement = document.querySelector("main");

            json.forEach((post) => {
                const postElement = createElementWithClass("div", "post");

                const postHeader = createElementWithClass("div", "post-header");

                {
                    const authorName = post.author;

                    const profilePictureElement = document.createElement("img");
                    let profilePictureUrl = "https://ui-avatars.com/api/?background=random&name=";
                    profilePictureUrl = profilePictureUrl.concat(authorName.replace(/ /g, "+"));
                    profilePictureElement.setAttribute("src", profilePictureUrl);
                    profilePictureElement.setAttribute("alt", "User avatar");

                    const authorNameElement = document.createElement("p");
                    authorNameElement.innerText = authorName;

                    const dateElement = createElementWithClass("p", "date");
                    dateElement.innerText = new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    }).format(new Date(post.created));

                    postHeader.append(profilePictureElement, authorNameElement, dateElement);
                }

                const content = createElementWithClass("div", "content");

                {
                    if ("image" in post) {
                        const imageElement = document.createElement("img");
                        imageElement.setAttribute("src", post.image);
                        content.append(imageElement);
                    }

                    const postContent = document.createElement("p");
                    postContent.innerText = post.text;

                    content.append(postContent);
                }

                const interactions = createElementWithClass("div", "interactions");

                {
                    const likeButton = document.createElement("button");
                    likeButton.innerText = `Like (${post.likes})`;

                    const reportButton = document.createElement("button");
                    reportButton.innerText = "Report";

                    interactions.append(likeButton, reportButton);
                }

                postElement.append(postHeader, content, interactions);
                mainElement.append(postElement);
            })
        })
}