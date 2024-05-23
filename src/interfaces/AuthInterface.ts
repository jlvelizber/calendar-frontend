import { UserInterface } from "./UserInterface";

export interface AuthInterface {
    status:  "checking" | 'authenticated'  |'not-authenticated',
    user: UserInterface,
    errorMessage: string | undefined,
}