import "dotenv/config"
import type { UserServiceContract } from "../../../services/user/user.types";
import type { UserHandlerContract } from "./user.types";

export function createUserHandler(
    service: UserServiceContract
): UserHandlerContract{
    return{
        async register(req, res) {
            try {
                const { email, password } = req.body;

                if(!email || !password){
                    res.status(422).json({message: "Validation Error!"});
                    return
                }
                const user = await service.register({email, password});
                res.status(201).json(user);
            }
            catch(error) {
                res.status(500).json({message: "Internal Server Error!"});
            }
        },

        async login(req, res) {
            try {
                const { email, password } = req.body;

                const result = await service.login({email, password});
                
                res.cookie("token", result.token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 15 * 60 * 1000,
                    path: "/"
                });
                console.log(result.token)
                res.status(200).json(result.user);
            }
            catch(error) {
                res.status(500).json({message: "Internal server error"})
            }
        }
        
    }
}