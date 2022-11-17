import {Task, TaskActions, taskFromBackend, UpdateTask} from "./tasks";
import {getResponseJSON, getResponseOk, request, sideEffect} from "../../utils/utils";
import {SERVER} from "../../constants";

const ENDPOINT = SERVER + "/tasks"
console.log(ENDPOINT)

export const actions: TaskActions = {
    create({ commit }, task: string) {
        request(ENDPOINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(getResponseJSON)
            .then((res: any[]) => res.map(taskFromBackend))
            .then((res: Task[]) => commit('set', res))
            .catch(err => console.error(err))
    },

    delete({ commit }, ids: number[] | number) {
        if (!Array.isArray(ids)) {
            ids = [ids]
        }
        request(ENDPOINT, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(getResponseOk)
            .then(() => commit('remove', ids))
            .catch(err => console.error(err))
    },

    init({ commit }) {
        request(ENDPOINT, {
            method: "GET"
        })
            .then(getResponseJSON)
            .then((res: any[]) => res.map(taskFromBackend))
            .then((res: Task[]) => commit('set', res))
            .catch(err => console.error(err))
    },

    update({ commit }, task: UpdateTask) {
        request(ENDPOINT, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([task])
        })
            .then(getResponseJSON)
            .then(res => {console.log(res); return res})
            .then((res: any[]) => res.map(taskFromBackend))
            .then((res: Task[]) => commit('set', res))
            .catch(err => console.error(err))
    }

}
