const socket = io();

const messages = []

function getData(urlApi, data) {

    const response = fetch(urlApi, {
        method: 'POST', 
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response
}

function postData(urlApi, data) {

    const response = fetch(urlApi, {
        method: 'POST', 
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response
}

const conectar = () =>{
    const mailID = document.getElementById('correo');
    const name = document.getElementById('nombre');
    const lastName = document.getElementById('apellido');
    const age = document.getElementById('edad');
    const nickname = document.getElementById('alias');

        let mailIDValue = mailID?.value || '';
        let nameValue = name?.value || '';
        let lastNameValue = lastName?.value || '';
        let ageValue = age?.value || '';
        let nicknameValue = nickname?.value || '';

        const dataUser = {
            mailIDValue,
            nameValue,
            lastNameValue,
            ageValue,
            nicknameValue
        }  

    getData(`http://localhost:3005/api/getMessagesFirebase`,dataUser)
    .then(response => response.json())
    .then((data) => {
        if(data.result.connected == 'true'){
           console.log(data.result.info.author[mailIDValue])
            if(data.result.info.author[mailIDValue] != undefined){
                document.getElementById("messagesChat").style.display = "flex";
                data.result.info.messages.forEach(mensaje => {
                    let messageObj = mensaje
                    if(!messages.length){
                        socket.emit('NEW_MESSAGE_TO_SERVER', messageObj);
                    }

                });
            }
        }
        else{
            alert("cuenta inexistente")
        }
    })
}


const sendNewMessage = () => {

    const message = document.getElementById('message');
    const name = document.getElementById('nombre');
    const mailID = document.getElementById('correo');
    const lastName = document.getElementById('apellido');
    const age = document.getElementById('edad');
    const nickname = document.getElementById('alias');
    const date = new Date()
    let time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `

        let text = message?.value || '';
        let author = mailID?.value || '';
        let id = mailID?.value || '';
        let nombre = name?.value || '';
        let apellido = lastName?.value || '';
        let edad = age?.value || '';
        let alias = nickname?.value || '';

        const messageObj = {
            text,
            author,
            time,
            type: 'messages'
        }

        const authorObj = {
            id,
            nombre,
            apellido,
            edad,
            alias,
            type: 'author'
        }

        const obj = [authorObj,messageObj]
    
    postData(`http://localhost:3005/api/addMessagesFirebase`,obj)
    .then(response => response.json())
    .then(data => console.log(data))

    socket.emit('NEW_MESSAGE_TO_SERVER', messageObj );
    document.querySelector('#message').value = '';
}


const updateMessages = (data,id) => {
    let messagesToHtml = ''
    document.querySelector('#messagesList').innerHTML = '';

    data.forEach(i => {
        messagesToHtml = messagesToHtml + `<li><b style="color: blue;">${i.author}</b> <i style="color: brown;">[${i.time}]</i>: <i style="color: green; font-family:italic;" >${i.text}</i> </li> `
    })
    document.querySelector('#messagesList').innerHTML = messagesToHtml;
}



socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
    messages.push(data)
    updateMessages(messages)
});