<template>
    <div class="account-popup">
        <Revealer :hidden="hidden">
            <div class="contents">
                <div>
                    <div class="menu">
                        <button @click="logout">Log out</button>
                        <button>Manage Account</button>
                    </div>
                </div>
            </div>
        </Revealer>
    </div>
</template>

<script setup lang="ts">
import "vue";
import Revealer from "../components/Revealer.vue";
import Login from "./Login.vue";
import Register from "./Register.vue";
import AccountMenu from "./AccountMenu.vue";
import {reactive} from "vue";
import {useStore} from "../stores/UserStore";

let props = defineProps({
    hidden: Boolean,
})

let store = useStore()

function logout() {
    store.dispatch('logout')
}
</script>

<style scoped>
.contents {
    margin: 2ch;
}
</style>
