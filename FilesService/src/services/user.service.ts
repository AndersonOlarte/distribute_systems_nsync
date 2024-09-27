import { userRepository } from "../db-connection";
import { User } from "../entities/User.entity";




export class UserService {
    getUserById (userId: number): Promise<User | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await userRepository.findOneBy({
                    id: userId
                })
                console.log(user);
                if (user) resolve(user);
                else {
                    console.log('there was not user with id: '+ userId);
                    resolve(null);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}