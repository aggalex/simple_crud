import {ref} from "vue";
import {Obj} from "@popperjs/core";
import {debounce} from "ts-debounce";

export function abstract() {
    throw new Error("Invocation of unimplemented abstract method");
}

interface ObjectOf<T> {
    [key: string]: T
}

function collectObject<T>(keys: string[], values: (key: string) => T): ObjectOf<T> {
    return keys.reduce((obj, key) => {
        obj[key] = values(key)
        return obj
    }, {})
}

export class ObjectMapper<T> {

    constructor(private obj: ObjectOf<T>) {
    }

    map<R>(pred: (key: string, obj: T) => R): ObjectMapper<R> {
        return new ObjectMapper(collectObject(
            Object.keys(this.obj),
            key => pred(key, this.obj[key])
        ))
    }

    filter(pred: (key: string, obj: T) => boolean): ObjectMapper<T> {
        let keys = Object.keys(this.obj)
            .filter(key => pred(key, this.obj[key]))
        return new ObjectMapper(collectObject(keys, (key) => this.obj[key]))
    }

    get collect(): ObjectOf<T> {
        return this.obj
    }
}

export class Event<T> {
    subscribers: ((T) => void)[]

    subscribe(pred: (T) => void) {
        this.subscribers.push(pred);
    }

    call(data: T) {
        this.subscribers.forEach(f => f(data))
    }
}

export interface Factory {
    events?: {
        [key: string]: Event<any>
    }
}

export type FactoryPipelines<F extends Factory> = Omit<F, keyof Factory>

const _request = debounce(fetch, 500)

export async function request (url: RequestInfo | URL, init?: RequestInit) {
    init.headers = init.headers || {}
    init.headers['X-CSRF-TOKEN'] = (document.head
        .querySelector("meta[name = 'csrf-token']") as HTMLMetaElement)
        .content
    return _request(url, init)
        .then(res => res)
}

export async function getResponseOk(response: Response): Promise<void> {
    if (response.ok) {
        return
    }
    return Promise.reject(response)
}

export async function getResponseJSON(response: Response): Promise<any> {
    return getResponseOk(response)
        .then(() => response.json())
}

export function sideEffect<T>(predicate: { (arg: T): any }): { (arg: T): T } {
    return (i: T) => {
        predicate(i);
        return i
    }
}
