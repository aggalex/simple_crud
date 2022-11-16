<template>
    <div class="grid">
        <input name="email" v-model="state.email" placeholder="email" type="email"/>
        <input name="password" v-model="state.password" placeholder="password" type="password"/>
        <button
            :disabled="!formIsValid"
            class="suggested login"
            @click="login"
        >Log in</button>
    </div>
</template>

<script setup>

import {computed, reactive} from "vue";
import {useStore} from "../stores/UserStore";

let state = reactive({
    email: "",
    password: ""
})

let formIsValid = computed(() =>
    state.password !== "" &&
    state.email !== "")

let store = useStore()

function login() {
    store.dispatch('login', {
        email: state.email,
        password: state.password
    })
}

</script>

<style scoped lang="scss">
@import "../../sass/account_popup_grid.scss";

</style>
