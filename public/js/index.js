const socket = io();

const chatBox = document.getElementById("input-msg");

let mailIngresado = "";

async function main() {
    const { value: email } = await Swal.fire({
      title: "Enter your email",
      input: "text",
      inputLabel: "Your email",
      inputValue: "",
      showCancelButton: false,
      allowOutsideClick:false,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
  
   
      mailIngresado = email;
      
}
  
  main();
chatBox.addEventListener("keyup", ({key})=>{
    if(key == "Enter"){
        socket.emit("msg_front_back", {
            message: chatBox.value,
            user: mailIngresado,
        });
        chatBox.value = "";
    }
})

socket.on("listado_msgs", (msgs)=>{
    const listadoMsg = document.getElementById("div-msg")
    let formato = "";
    msgs.forEach((msg)=>{
        formato= formato + "email " + msg.user + ": " + msg.message +"</p>"
    })
    listadoMsg.innerHTML = formato;
})




