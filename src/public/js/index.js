const socket = io();

const tota_message = document.getElementById("tota_message");
let contenedor_message = document.getElementById('contenedor_message');

socket.on('listMessage', date => {
    contenedor_message.innerHTML = "";
    const message = date
    tota_message.innerHTML = `Total mensajes ${message.length}`

    message.forEach(mensaje => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('card', 'border-primary', 'mb-3');
        messageDiv.style.maxWidth = '18rem';

        const messageContent = `
            <div class="card-header">${mensaje.user}</div>
            <div class="card-body text-primary">
                <p class="card-title">${mensaje.message}</p>
                <div class="col-3" style="margin-top: 20px;">
                <button id="eliminarMessage" value=${mensaje._id} class="btn btn-warning">Eliminar</button>
                </div>
            </div>
        `;

        messageDiv.innerHTML = messageContent;

        contenedor_message.appendChild(messageDiv);


        //Eliminar mensaje
        messageDiv.querySelector('#eliminarMessage').addEventListener('click', () => {
            const messageID = mensaje._id;
            socket.emit('eliminarMessage', messageID);
        });
    });
})


document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    let user = document.getElementById('user').value
    let message = document.getElementById('message').value;

    const newMessage = {
        user:user,
        message:message
    }

    if(user != "" && message != ""){
        socket.emit('newMessage', newMessage);
    }
    else{
        alert("Completar formulario")
    }
});

