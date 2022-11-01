import {ref} from "vue";

export function defineState<U extends {[key: string|number|symbol]: any}>(data: U): U {
    let props = Object.keys(data).reduce((props: PropertyDescriptorMap, key) => {
        let r = ref(data[key]);
        return {
            [key]: {
                get: () => r.value,
                set: (value) => r.value = value,
                configurable: false
            }
        }
    }, {});

    let out = {};
    Object.defineProperties(out, props);
    return out as U;
}

export function abstract() {
    throw new Error("Invocation of unimplemented abstract method");
}
