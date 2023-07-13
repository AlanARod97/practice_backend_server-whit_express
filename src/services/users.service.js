// import { userModel } from "../DAO/models/users.model.js";
// import { isValidPassword } from "../utils/bcrypt.js";
//  class UserService{
//     async getAll(){
//         const users = await userModel.find(
//             {},
//             {
//                 _id:true,
//                 username: true,
//                 email:true,
//                 password: true,
//                 rol: true,

//             }
//             );
        
//         return users;
//     }
//     async findUser(email, password) {
// 		const user = await userModel.findOne(
// 			{ email: email },
// 			{
// 				_id: true,
// 				email: true,
// 				username: true,
//                 password: true,
				
// 			}

// 		);
        
//         // if(user && isValidPassword(password, user.password)){
//         //     return user;
//         // }else{
//         //     return false;
//         // }

//         return user;

//     }


//     async findUserByEmail(email){
//         const user = userModel.findOne(
//             {email: email},
//             {
//                 _id: true,
//                 email: true,
//                 username: true,
//                 password: true,
//                 rol: true, 
//             }
//         )

//         return user || false; 
//     }


//     async create(email, username, password, rol){
//         const userAlreadyExist = await this.findUserByEmail(email)
        
//         if (userAlreadyExist){
//            return "El usuario ya ha sido registrado"
//         }
        
//         const userCreated = await userModel.create({ 
//            email,
//            username,
//            password,
//            rol 
//         });
//         return userCreated;
//     }

//     async updateOne(_id, email, username, password, rol){
//         const userUptaded = await userModel.updateOne(
//             { _id: _id },
//             { email, username, password, rol }
//           );

//           return userUptaded;
//     };

//     async deleteOne(_id){
//         const deleted = await userModel.deleteOne(
//             { _id: _id }
//         );
//         return deleted;
//     }
// }
// export const userService = new UserService();