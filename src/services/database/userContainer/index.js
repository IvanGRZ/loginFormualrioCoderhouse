import UserModel from '../../models/index.js';

class userContainer {

    constructor(){}

    async getUserByCondition(condition){
        return await UserModel.findOne(condition);
    }

    async createUser(userData){
        const userStage = new UserModel(userData);
        return await userStage.save();
    }

}

export default userContainer;