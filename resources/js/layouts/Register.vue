<template>
    <div class="flexbox">
        <h1>...Or Register!</h1>

        <input name="email" v-model="state.email" placeholder="email" type="email"/>
        <input name="username" v-model="state.name" placeholder="username"/>
        <input name="password" v-model="state.password" placeholder="password" type="password"/>
        <input name="password" v-model="state.passwordConf" placeholder="password" type="password"/>
        <button
            :disabled="!formIsValid"
            class="suggested login"
            @click="register"
        >Register</button>
    </div>
</template>

<script setup lang="ts">

import {computed, reactive} from "vue";
import {useStore} from "../stores/UserStore";

let state = reactive({
    email: "",
    name: "",
    password: "",
    passwordConf: ""
})

let formIsValid = computed(() =>
    state.passwordConf === state.password &&
    state.password !== "" &&
    state.email !== "" &&
    state.name !== "")

let store = useStore()

function register() {
    if (!formIsValid.value)
        return;

    store.dispatch('register', {
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConf
    })
}

</script>

<style scoped lang="scss">
@import "../../sass/account_layout_flexbox";
</style>
