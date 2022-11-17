<template>
    <input v-model="username"/>
    <input v-model="email" type="email"/>
    <input class="{{state.passwordClass}}" v-model="password" type="password"/>
    <input v-model="passwordConf" type="password"/>

    <button @click="submit">Register Now!</button>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useStore} from "../stores/UserStore";

let state = reactive({
    passwordClass: "",
    name: "",
    email: "",
    password: "",
    passwordConf: ""
});

let store = useStore()

function submit() {
    if (state.password != state.passwordConf) {
        state.passwordClass = "wrong";
        return;
    }

    store.dispatch('register', {
        name: state.name,
        email: state.email,
        password: state.password,
    })
}

</script>

<style scoped>

</style>
