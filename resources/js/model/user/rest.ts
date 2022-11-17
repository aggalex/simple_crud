import {LoggedOut, UserActions} from "./user";
import {SERVER} from "../../constants";
import {getResponseJSON, getResponseOk, request} from "../../utils/utils";
import router from "../../router";

export const actions: UserActions = {
    async login({ commit }, cred) {
        await request(SERVER + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        })
            .then(getResponseOk)

        await this.dispatch('updateProfile')

        await router.push({
            path: '/'
        })
    },

    logout({ commit }) {
        request(SERVER + "/logout", {
            method: 'POST'
        })
            .then(getResponseOk)
            .then(_ => commit('setUser', LoggedOut))
            .catch(err => console.error(err))
    },

    register({ commit }, cred) {
        cred['password_confirmation'] = cred.passwordConfirmation
        delete cred.passwordConfirmation
        request(SERVER + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        })
            .then(getResponseOk)
            .catch(err => console.error(err))
    },

    updateProfile({ commit }) {
        fetch(SERVER + "/profile", {
            method: 'GET',
        })
            .then(getResponseJSON)
            .then(user => commit('setUser', user))
            .catch(err => {
                console.error(err)
                commit('setUser', LoggedOut)
            })
    }

}
