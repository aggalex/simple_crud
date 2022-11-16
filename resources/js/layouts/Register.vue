<template>
    <div class="grid">
        <input name="email" v-model="state.email" placeholder="email" type="email"/>
        <input name="email" v-model="state.username" placeholder="username"/>
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
    username: "",
    password: "",
    passwordConf: ""
})

let formIsValid = computed(() =>
    state.passwordConf === state.password &&
    state.password !== "" &&
    state.email !== "" &&
    state.username !== "")

let store = useStore()

function register() {
    if (!formIsValid.value)
        return;

    store.dispatch('register', {
        email: state.email,
        username: state.username,
        password: state.password
    })
}

</script>

<style scoped lang="scss">
@import "../../sass/account_popup_grid.scss";

</style>
