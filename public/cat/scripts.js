const messageInput = document.querySelector("#user-input");
const conversationElement = document.querySelector("#conversation-container");

const handleFocus = () => {
    messageInput.focus();
}

const updateConversation = (message) => {
    const { author, text } = message;
    const messageElement = document.createElement("p");
    messageElement.classList.add("message", author);
    messageElement.innerHTML = `<span>${text}</span`;
    conversationElement.appendChild(messageElement);
    conversationElement.scrollTop = conversationElement.scrollHeight;
    if (author === "user") {
        messageInput.value = "";
    }
    handleFocus();
    console.log(message);
}

const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    const message = { author: "user", text: messageInput.value };
    updateConversation(message);
    // GET call to the cat-message endpoint
    fetch("/cat-message")
        .then((res) => res.json())
        .then((data) => {
            updateConversation(data.message);
    });
    // receive this error message: Uncaught (in promise) SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data
}

handleFocus();
