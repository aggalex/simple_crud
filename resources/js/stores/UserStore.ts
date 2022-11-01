import {createStore} from "vuex";
import {SERVER} from "../constants";
import {Login} from "../model/user/user";
import {Factory} from "../model/user/mock";

export default createStore({
    state() {
        return {
            user: null,
            error: null
        }
    },
    mutations: {
        login(state, cred: Login) {
            state.error = null;
            try {
                state.user = Factory.login(cred);
            } catch (e) {
                state.error = e;
            }
        },
        logout(state, cred: Login) {
            state.error = null;
            try {
                Factory.logout();
            } catch (e) {
                state.error = e;
            }
        }
    }
});
