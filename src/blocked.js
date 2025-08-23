function thinkManually(){
    // window.history.back();
    window.location.href="https://stackoverflow.com/"
};

document.querySelector('.btn-think-manually').addEventListener('click', thinkManually);
function surrender(){
     document.getElementById("original-icon").hidden = true;
    document.getElementById("fun-icon").hidden = false;
}
document.querySelector('.btn-surrender').addEventListener('click', surrender);


fetch('./messages.json')
  .then(response => response.json())
  .then(res => {
    const messages = res.messages;
    const random = messages[Math.floor(Math.random() * messages.length)];

    document.querySelector("#main-message").innerHTML = random.main;
    document.querySelector("#sarcasm-message").innerHTML = random.subtitle;
  });



