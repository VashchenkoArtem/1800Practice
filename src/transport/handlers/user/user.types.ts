import type { Request, Response } from "express"
import type { UserCredentialsBody } from "../../dto/user/requests"

export interface UserHandlerContract{
    register: (
        req: Request<{}, {}, UserCredentialsBody>,
        res: Response,
    ) => Promise<void>
    login: (
        req: Request<{}, {}, UserCredentialsBody>,
        res: Response,
    ) => Promise<void>
}