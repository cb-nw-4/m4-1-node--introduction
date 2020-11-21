const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');

// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement('p');

  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === 'user') messageInput.value = '';
  handleFocus();
};

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: 'user', text: messageInput.value };
  updateConversation(message);

  const getBotMessage = () => {
    const commonGreetings = ["hi", "hello", "howdy", "hi there"];
    const commonGoodbyes = ["goodbye", "see ya", "ciao", "later"];
    let botMsg = "";
    if (commonGreetings.includes(message.text.toLowerCase())) {
      botMsg = "Bzzt hello!";
    } else if (commonGoodbyes.includes(message.text.toLowerCase())) {
      botMsg = "Bzzt goodbye!";
    } else {
      botMsg = `Bzzt ${message.text}`;
    }
    return botMsg;
  }
  getBotMessage();

  fetch(`/bot-message?text=${getBotMessage()}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();