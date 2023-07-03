import { userModel } from "../DAO/models/users.model.js";
 class UserService{
    async getAll(){
        const users = await userModel.find(
            {},
            {
                _id:true,
                firstName:true,
                lastName:true,
                email:true,

            }
            );
        
        return users;
    }
    async findUser({email, password}) {
		const user = await userModel.findOne(
			{ email: email },
			{
				_id: true,
				email: true,
				firsName: true,
                lastName:true,
				password: true,
				rol: true,
			}
		);
	
	}


    async create({firstName, lastName, email}){
        const userCreated = await userModel.create({ 
            firstName, 
            lastName, 
            email 
        });
        return userCreated;
    }

    async updateOne({_id, firstName,lastName, email}){
        const userUptaded = await userModel.updateOne(
            { _id: _id },
            { firstName, lastName, email }
          );

          return userUptaded;
    };

    async deleteOne({_id}){
        const deleted = await userModel.deleteOne(
            { _id: _id }
        );
        return deleted;
    }
}
export const userService = new UserService();