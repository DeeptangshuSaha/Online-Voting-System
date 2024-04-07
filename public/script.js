let Popup = document.getElementById("popup");
let VoteButton = document.getElementById("vote-btn");

const OpenPopup = () => {
  Popup.classList.add("open-popup");
  document.querySelector("body").style.backgroundColor = "#1d3557ff";
  document.querySelector("header").innerText = "";
  document.querySelector("table").innerText = "";
  VoteButton.innerText = "";
};

const ClosePopup = () => {
  Popup.classList.remove("open-popup");
};

VoteButton.addEventListener("click", OpenPopup);
