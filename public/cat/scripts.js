// here there be JS, yarrr ☠️

const conversationElem = document.querySelector("#conversation-container");
const messageInput = document.querySelector("#user-input");

const handleFocus = () => {
    messageInput.focus();
};

const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    console.log(messageInput.value);
    const message = { author: "user", text: messageInput.value };
    updateConversation(message);
    fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        updateConversation(data.message);
    });
};

const updateConversation = (message) => {
    console.log(message);
    const { author, text } = message;
    const messageElem = document.createElement("p");
    messageElem.innerHTML = `<span>${text}</span>`;
    messageElem.classList.add("message", author);
    conversationElem.appendChild(messageElem);
    if (author === "user") {
        messageInput.value = "";
    }
    conversationElem.scrollTop = conversationElem.scrollHeight;
    handleFocus();
};
