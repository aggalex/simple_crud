import type {Login, Register, User, UserActions} from "./user";
import {LoggedOut} from "./user";

interface StoreEntry extends  User {
    password: string
}

const mockStore: {[email: string]: StoreEntry } = {}

export const actions: UserActions = {
    async login({ commit }, cred: Login) {
        if (cred.email !in mockStore) {
            return Promise.reject(404)
        }

        let user = mockStore[cred.email]

        if (user.password !== user.password) {
            return Promise.reject(403)
        }

        Promise.resolve(user)
            .then(user => commit('setUser', user))
    },

    async logout({ commit }) {
        commit('setUser', LoggedOut)
    },

    async register({ commit }, cred: Register) {
        mockStore[cred.email] = ({
            id: Object.keys(mockStore).length + 1,
            email: cred.email,
            name: cred.name,
            password: cred.password
        })
    },

    updateProfile({ commit }) {
    }
}
