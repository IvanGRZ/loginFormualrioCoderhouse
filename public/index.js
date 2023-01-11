const socket = io();

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

const messages = []

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if(getParameterByName('username') == '' || getParameterByName('username') == null){
    window.location.replace("/login.html");
}


const sendNewMessage = () => {
    const message = document.querySelector('#message').value;
    const username = getParameterByName('username');
    const  date = new Date()
    let moment = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
    
    const messageObj = {
        username,
        message,
        moment
    }
    
    postData(`http://localhost:3005/api/addMessages`,messageObj)
    .then(response => response.json())
    .then(data => console.log(data))
    socket.emit('NEW_MESSAGE_TO_SERVER', messageObj);
    document.querySelector('#message').value = '';
}

const sendNewProduct = () => {

    const productObj = {
     title : document.getElementById('title').value,
     price : document.getElementById('price').value,
     thumbnail : document.getElementById('thumbnail').value
    }

    console.log(productObj)

    postData(`http://localhost:3005/api/addProduct`,productObj)
    .then(response => response.json())
    .then(data => console.log(data))

    socket.emit('NEW_PRODUCT', productObj)

    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";

    return false
}

const updateMessages = (data) => {
    let messagesToHtml = ''
    data.forEach(i => {
        messagesToHtml = messagesToHtml + `<li><b style="color: blue;">${i.username}</b> <i style="color: brown;">[${i.moment}]</i>: <i style="color: green; font-family:italic;" >${i.message}</i> </li> `
    })
    document.querySelector('#messagesList').innerHTML = messagesToHtml;
}

const updateProducts = (data) => {

    if(data.length) {
        const tableHead = ` 
            <table class="table"'>
            <thead class='thead-dark'>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Imagen</th>
                </tr>
            </thead>
            <tbody>`;
    
        const tableBody = 
            data.map((elem, index) => {
                return(` 
                    <tr>
                        <th scope='row'>
                            ${elem.id}
                        </th>
                        <td>
                            ${elem.title}
                        </td>
                        <td>
                            ${elem.price}
                        </td>
                        <td><img src=${elem.thumbnail}  alt="" border=1 height=48 width=48></img></th>
                    </tr>
                    `)
            }).join(" ");

        const tableHeadEnd = 
                `</tbody>
                </table>`;

        const table = tableHead + tableBody + tableHeadEnd;
        document.querySelector('#tableProducts').innerHTML = table;
    }
    else {
        document.querySelector('#tableProducts').innerHTML = "No hay productos :(";
    }
}


socket.on('UPDATE_DATA', (data) => {
    messages = data
    updateMessages(data)
});

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
    messages.push(data)
    updateMessages(messages)
});

socket.on('PRODUCT', (data)=>{
    updateProducts(data)
})