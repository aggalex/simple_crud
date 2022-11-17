<template>
    <AccountPopup title="login" :hidden="state.hidden"/>
    <Navbar>
        <template #start>
            <NavbarButton href="/">Home</NavbarButton>
            <NavbarButton href="/view/about">About</NavbarButton>
        </template>
        <template #end>
            <AccountButton v-if="isLoggedIn" @click="showPopup"/>
        </template>
    </Navbar>
</template>

<script setup lang="ts">
import NavbarButton from "../components/NavbarButton.vue";
import Navbar from "../components/Navbar.vue";
import AccountButton from "../components/AccountButton.vue";
import {computed, reactive} from "vue";
import {useStore} from "../stores/UserStore";

const state = reactive({
    hidden: true
})

let store = useStore()
let isLoggedIn = computed(() => store.getters.isLoggedIn)

store.subscribe(() => state.hidden = true)

function showPopup () {
    state.hidden = !state.hidden
}

</script>
