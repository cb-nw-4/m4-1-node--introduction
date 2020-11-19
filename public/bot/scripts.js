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


let isJoke = false;


const getBotMessage = (text) => {
  const commonGreetings = ["hi", "hello", "howdy"];
  const commonGoodByes = ['bye', 'goodbye', 'bye bye', 'later'];
  const tellJoke =["something funny"]

  const cleanJokes = ['What do dentists call their x-rays? Tooth pics!',
  'Do you want to hear a construction joke? Sorry, I’m still working on it.',
  ' Did you hear about the first restaurant to open on the moon? It had great food, but no atmosphere.',
  'Why should you never trust stairs?  They’re always up to something.',
  'Did you hear about the fire at the circus? It was in tents! ',
  'What does a nosey pepper do? It gets jalapeño business'];

  let botMsg = "";
  if (commonGreetings.includes(text.toLowerCase())) {
    botMsg = "Hello!";
  } else if(commonGoodByes.includes(text.toLowerCase())){
    botMsg = "Bye!";
  } else if(tellJoke.includes(text.toLowerCase())){
    botMsg='Do you want to hear a joke?'
    isJoke = true;
  }else if(isJoke && text.toLowerCase() === 'yes'){
    botMsg = `${cleanJokes[Math.floor(Math.random() * cleanJokes.length)]}
      Do you want another joke?
    `;
  }else if(isJoke && text.toLowerCase() == 'no'){
    isJoke = false;
    botMsg = "Bye!";
  }
  else{
    botMsg= text;
  }
  return botMsg;
};



const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: 'user', text: messageInput.value };

  const text = getBotMessage(messageInput.value);

  updateConversation(message);
  

  fetch(`/bot-message/?message=${text}`)
    .then((res) => res.json())
    .then((data) => {
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();
