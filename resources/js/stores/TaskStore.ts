import {createStore, Store, useStore as baseUseStore} from "vuex";
import {Task} from "../model/tasks/tasks";
import {actions} from "../model/tasks/rest";
import {InjectionKey} from "vue";
import {User} from "../model/user/user";

export const store = createStore({
    strict: true,
    state: () => ({
        tasks: new Map<number, Task>()
    }),
    getters: {
        ids(state) {
            return state.tasks.keys()
        }
    },
    mutations: {
        set(state, tasks: Task[] | Task) {
            if (!Array.isArray(tasks))
                tasks = [tasks]
            console.log(tasks)
            tasks.forEach(task => state.tasks.set(task.id, task))
        },
        remove(state, id: number[] | number) {
            if (typeof id === "number")
                id = [id]
            id.forEach(id => state.tasks.delete(id))
        },
    },
    actions
});

export const key: InjectionKey<Store<User>> = Symbol();

export function useStore() {
    return baseUseStore(key)
}
