import type { Login, User, UserFactory } from "./user";

export const Factory: UserFactory = {
    login(cred: Login): User {
        return {
            username: cred.email.slice(0, cred.email.lastIndexOf("@")),
            email: cred.email,
            id: Math.random()
        };
    },

    logout() {

    }
}
