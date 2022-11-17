import {Event} from '../../utils/utils'
import {ActionTree} from "vuex";

export interface Login {
    email: string,
    password: string,
}

export interface Register extends Login {
    name: string,
    passwordConfirmation: string
}

export interface User {
    id: number | null,
    name: string | null,
    email: string | null,
}

export const LoggedOut: User = {
    id: -1,
    name: "",
    email: ""
}

interface VuexState {
    commit: Function
}

export interface UserActions extends ActionTree<User, User> {
    register(state: VuexState, cred: Register),
    updateProfile(state: VuexState),
    login(state: VuexState, cred: Login),
    logout(state: VuexState),
}
