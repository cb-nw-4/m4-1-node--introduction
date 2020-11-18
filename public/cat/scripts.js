const messageInput = document.querySelector('#user-input');
const conversationsElem = document.querySelector('#conversation-container');

const handleFocus = () => {
  messageInput.focus();
}

const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement('p');
  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationsElem.appendChild(messageElem);
  conversationsElem.scrollTop = conversationsElem.scrollHeight;
  handleFocus();
}

const sendMessage = (event) => {
  const message = { author: 'user', text: messageInput.value };

  // prevent the default "page reload" from occurring.
  event.preventDefault();

  updateConversation(message);

  fetch('/cat-message')
    .then((res) => res.json())
    .then((data) => {
      updateConversation(data.message);
    });
};

handleFocus();
