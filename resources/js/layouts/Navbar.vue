<template>
    <AccountPopup title="login" :hidden="state.hidden" :page="page"/>
    <Navbar>
        <template #start>
            <NavbarButton href="#">Home</NavbarButton>
            <NavbarButton href="#">About</NavbarButton>
            <NavbarButton>Disabled</NavbarButton>
        </template>
        <template #end>
            <AccountButton @click="login"/>
            <NavbarButton clickable @click="register" v-if="!isLoggedIn">Register</NavbarButton>
        </template>
    </Navbar>
</template>

<script setup lang="ts">
import NavbarButton from "../components/NavbarButton.vue";
import Navbar from "../components/Navbar.vue";
import AccountButton from "../components/AccountButton.vue";
import {computed, reactive} from "vue";
import {useStore} from "../stores/UserStore";

let state = reactive({
    hidden: true,
    register: false
})

let store = useStore()
let isLoggedIn = computed(() => store.getters.isLoggedIn)
let page = computed(() => {
    if (isLoggedIn.value) {
        return "account menu"
    } else if (state.register) {
        return "register"
    } else {
        return "login"
    }
})

function login() {
    state.hidden = !state.hidden && !state.register;
    state.register = false;
}

function register() {
    state.hidden = !state.hidden && state.register;
    state.register = true;
}
</script>
