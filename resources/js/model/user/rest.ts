import {LoggedOut, UserActions} from "./user";
import {SERVER} from "../../constants";
import {request} from "../../utils/utils";

export const actions: UserActions = {
    login({ commit }, cred) {
        request(SERVER + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        })
            .then(res => res.json())
            .then(user => commit('setUser', user))
            .catch(err => console.error(err))
    },

    logout({ commit }) {
        request(SERVER + "/logout", {
            method: 'GET'
        })
            .then(res => res.ok)
            .then(_ => commit('setUser', LoggedOut))
            .catch(err => console.error(err))
    },

    register(state, cred) {
        request(SERVER + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        })
            .then(res => res.ok)
            .catch(err => console.error(err))
    }

}
