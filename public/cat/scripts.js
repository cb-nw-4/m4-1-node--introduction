// here there be JS, yarrr ☠️

const handleFocus = () => {
  messageInput.focus();
};

const messageInput = document.querySelector("#user-input");

const conversationElem = document.querySelector("#conversation-container");

const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();

  console.log(messageInput.value);

  const message = { author: "user", text: messageInput.value };
  updateConversation(message);

  // This is a 'GET' call to the /cat-message endpoint.
  fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
      updateConversation(data.message);
    });
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  
  // deconstruct the message object
  const { author, text } = message;
  if (author === "user") {
    messageInput.value = "";
  }
  // create a <p> element
  const messageElem = document.createElement("p");
  messageElem.classList.add("message", author);
  // add the text message to the element
  messageElem.innerHTML = `<span>${text}</span>`;
  // append the element to the conversation
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;
  console.log(message);
  handleFocus();
};

handleFocus();
