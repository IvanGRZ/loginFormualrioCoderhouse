class UserDTO{
    constructor(data){
        this.username = data.username
    }

    build(){
        return this
    }
}

export default UserDTO;