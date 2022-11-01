<template>
    <input v-model="username"/>
    <input v-model="email" type="email"/>
    <input class="{{state.passwordClass}}" v-model="password" type="password"/>
    <input v-model="passwordConf" type="password"/>

    <button @click="submit">Register Now!</button>
</template>

<script setup lang="ts">
import {defineState} from "../utils";

let username: string;
let email: string;
let password: string;
let passwordConf: string;

let state = defineState({
    passwordClass: ""
});

function submit() {
    if (password != passwordConf) {
        state.passwordClass = "wrong";
        return;
    }

    console.log("Registering");
}

</script>

<style scoped>

</style>
