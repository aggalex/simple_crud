export interface Login {
    email: string,
    password: string,
}

export interface User {
    id: number,
    username: string,
    email: string,
}

export interface UserFactory {
    login(cred: Login): User;
    logout();
}
