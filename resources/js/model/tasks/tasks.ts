import {ActionTree} from "vuex";
import {User} from "../user/user";
import {Update} from "vite";

export interface UpdateTask {
    id: number,
    name: string
}

export interface Task {
    id: number
    name: string
    created: Date
    edited: Date
}

export function taskFromBackend(task: any): Task {
    return {
        name: task.name,
        id: task.id,
        created: new Date(task.created_at),
        edited: new Date(task.updated_at)
    }
}

interface VuexState {
    commit: Function
}

export interface TaskActions extends ActionTree<any, any> {
    init(state: VuexState);
    create(state: VuexState, task: string);
    update(state: VuexState, task: UpdateTask)
    delete(state: VuexState, ids: number[] | number);
}
