console.log('soy el cliente');
const title = document.querySelector('#title-welcome');
const chatBox = document.querySelector('#send');
const socket = io();
let user = '';

Swal.fire({
    title: 'ingrese un nombre de usuario',
    input: 'text',
    text: 'Para ingresar al chat identificarse',
    allowOutsideClick: false,
    inputValidator: (value) =>{
        return !value && 'ingrese un nombre por favor'
    }
}).then((result)=>{
    user = result.value
    console.log(result.value)
    title.innerText = 'Bienvenido al chat ' + user
    socket.emit('newUser', { user });
})

chatBox.addEventListener('keyup', (e) =>{
    if(e.key ===  'Enter'){
        socket.emit('mensaje', { user, mensaje: e.target.value });
        chatBox.value = '';
    }
})

socket.on('conversacion', (data)=>{
    const contenedorChat = document.querySelector('#contenedor-chat');
    contenedorChat.innerHTML = ''
    data.forEach(chat=>{
        const div = document.createElement('div');
        const nombre = document.createElement('p');
        const mensaje = document.createElement('p');
        nombre.innerText = chat.user + ': ';
        mensaje.innerText = chat.mensaje;
        div.appendChild(nombre);
        div.appendChild(mensaje);
        contenedorChat.appendChild(div);
    })
})