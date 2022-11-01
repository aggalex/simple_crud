<template>
    <AccountPopup title="login" :hidden="state.hidden"/>
    <Navbar>
        <template #start>
            <NavbarButton href="#">Home</NavbarButton>
            <NavbarButton href="#">About</NavbarButton>
            <NavbarButton>Disabled</NavbarButton>
        </template>
        <template #end>
            <AccountButton @click="showAccount"/>
        </template>
    </Navbar>
</template>

<script setup>
import NavbarButton from "../components/NavbarButton.vue";
import Navbar from "../components/Navbar.vue";
import AccountButton from "../components/AccountButton.vue";
import {defineState} from "../utils";

let state = defineState({
    hidden: true
})

function showAccount() {
    state.hidden = !state.hidden;
}
</script>
