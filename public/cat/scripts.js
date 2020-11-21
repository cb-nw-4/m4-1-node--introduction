//
// 2.When the user clicks "Send", we need to take the contents of the input field and render
// it to the screen as a user message.
const messageInput = document.querySelector("#user-input");

// 3.add that message (and all messages) to the DOM inside the <div id="conversation-container">
const conversationElem = document.querySelector("#conversation-container");
const handleFocus = () => {
    messageInput.focus();
};
// 1.sendMessage function
// 4.When sendMessage() is called, it should call another function (updateConversation()) to update the conversation.
const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();

    const message = { author: "user", text: messageInput.value };
    updateConversation(message);
    // 6.Eveytime, the user sends a message, our page should contact the server and retrieve the cat message.
    // Add a fetch call - this is a 'GET' call to the /cat-message endpoint.
    fetch("/cat-message")
        // convert data to json
        .then((res) => res.json())
        //Use the data received to update the conversation.
        .then((data) => {
            updateConversation(data.message);
        });
};

// 5. updateConversation() is called from sendMessage()
const updateConversation = (message) => {
    // deconstruct the message object
    const { author, text } = message;
    // create a <p> element
    const messageElem = document.createElement("p");
    // 7.Add a 'message' class and a class based on the author
    messageElem.classList.add("message", author);
    // add the text message to the element
    messageElem.innerHTML = `<span>${text}</span>`;
    // append the element to the conversation
    conversationElem.appendChild(messageElem);
    // scroll
    conversationElem.scrollTop = conversationElem.scrollHeight;
    console.log(message);
    // clear the input
    if (author === "user") {
        messageInput.value = "";
    }
    // then focus on the input
    handleFocus();
};
handleFocus();