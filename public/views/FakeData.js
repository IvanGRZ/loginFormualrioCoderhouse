const socket = io();

function getData(urlApi, data) {

    const response = fetch(urlApi, {
        method: 'GET', 
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response
}


const setFakeProduct = () => {


    getData(`http://localhost:3005/api/productos-test`)
    .then(response => response.json())
    .then(data => socket.emit('FAKEPRODUCT', data))

    return false
}

const getFakeProducts = (data) => {

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
        document.querySelector('#tableProductsFake').innerHTML = table;
    }
    else {
        document.querySelector('#tableProductsFake').innerHTML = "No hay productos :(";
    }
}


socket.on('UPDATEFAKEPRODUCT', (data) => {
    getFakeProducts(data)
})