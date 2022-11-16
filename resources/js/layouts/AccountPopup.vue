<template>
    <div class="account-popup">
        <Revealer :hidden="hidden">
            <div class="contents">
                <Login v-if="page === 'login'"/>
                <Register v-else-if="page === 'register'"/>
                <AccountMenu v-else/>
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

let props = defineProps({
    hidden: Boolean,
    page: String,
})
</script>

<style scoped>
.contents {
    margin: 2ch;
}
</style>
