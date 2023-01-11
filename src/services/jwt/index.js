import jwt from 'jsonwebtoken'

class JWTService{
    constructor(){
        this.JWT_SECRET = process.env.JWT_SECRET_KEY;
    }

    generateJwt(userData){
        const token = jwt.sign({data: userData}, this.JWT_SECRET, { expiresIn: 60 * 60 });
        return token;
    }

}

export default JWTService;