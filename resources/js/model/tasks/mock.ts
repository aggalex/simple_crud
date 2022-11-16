import {Task, TaskActions, UpdateTask} from "./tasks";

function newTask (name: string) {
    return {
        created: new Date(),
        edited: new Date(),
        id: id++,
        name
    };
}

let id = 0;
let DB: Task[] = []

export const actions: TaskActions = {
    create({ commit }, name: string) {
        console.log(name)
        const task = newTask(name)
        DB.push(task)
        console.log(DB)
        commit('set', task)
    },

    delete({ commit }, ids: number[] | number) {
        if (!Array.isArray(ids))
            ids = [ids]
        let idarr: number[] = ids
        DB = DB.filter(task => task.id in idarr)
        commit('remove', idarr)
    },

    init({ commit }) {
        DB = [
            "Hello 1",
            "Hello 2",
            "Hello 3"
        ].map(newTask);
        commit('set', DB)
    },

    update({ commit }, update: UpdateTask) {
        const index = DB.findIndex(task => task.id === update.id)
        if (index < 0)
            return

        const oldTask = DB[index]
        const task = {
            ...oldTask,
            ...update
        }

        DB[index] = task
        commit('set', task)
    }

}
