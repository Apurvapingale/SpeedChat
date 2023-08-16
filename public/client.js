const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".msg-area");
do {
  name = prompt("Please Enter your name:");
} while (!name);

const SendBtn = document.getElementById("send-btn");

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    sendMessage(e.target.value);
    textarea.value = "";
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //msg and message type are passesd to the server
  appendMessage(msg, "outgoing");
  scrollToBtm();
  //send to server via socket
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  // creatiing div for incoming
  let mainDiv = document.createElement("div");
  //to decide incoming or outgoing msg
  let className = type;
  //adding class on div - one is dynamic one from html
  mainDiv.classList.add(className, "msg");
  if (msg.message.trim() !== "") {
    mainDiv.style.display = "block"; // Show the message container
  }

  let markup =
    // obj  - msg  param.key is the key of the object
    `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>`;

  //to insrt html in div
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//recieve message from server- browser
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBtm();
});

function scrollToBtm() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

SendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const message = textarea.value.trim();

  if (message !== "") {
    sendMessage(message);
    textarea.value = "";
  }
});
