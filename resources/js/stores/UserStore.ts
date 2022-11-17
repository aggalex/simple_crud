import {createStore, Store, useStore as baseUseStore} from "vuex";
import {SERVER} from "../constants";
import {LoggedOut, Login, User} from "../model/user/user";
import {actions} from "../model/user/rest";
import {FactoryPipelines, ObjectMapper} from "../utils/utils";
import {computed, InjectionKey} from "vue";
import router from "../router";

export const store = createStore<User>({
    strict: true,
    state() {
        return {...LoggedOut}
    },
    getters: {
        isLoggedIn(state) {
            return state.id >= 0
        }
    },
    mutations: {
        setUser(state, user: User) {
            console.log("mutating: ", user)
            Object.keys(user)
                .forEach(key => store.state[key] = user[key])
        }
    },
    actions
})

export const key: InjectionKey<Store<User>> = Symbol();

export function useStore() {
    return baseUseStore(key)
}
