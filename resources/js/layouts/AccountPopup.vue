<template>
    <div class="account-popup">
        <Revealer :hidden="hidden">
            <div class="grid">
                <input name="email" v-model="login.username" placeholder="email" type="email"/>
                <input name="password" v-model="login.password" placeholder="password" type="password"/>
                <button class="suggested login" @click="login">Login</button>
            </div>
        </Revealer>
    </div>
</template>

<script lang="ts">
import {Login} from "../model/user/user";
import UserStore from "../stores/UserStore";
import {mapMutations} from "vuex";

export default {
    name: "Navbar",
    props: ['hidden'],
    store: UserStore,
    data() {
        return {
            credentials: null as Login | null
        }
    },
    computed: {
        user: state => state.user
    },
    methods: {
        login() {
            this.$store.commit('login', )
        }
    }
}
</script>

<script setup lang="ts">
import Revealer from "../components/Revealer.vue";
</script>

<style scoped>
.grid {
    display: grid;
    margin: 2ch;
    row-gap: 1ch;
    column-gap: 1ch;
}

input {
    grid-column-start: 1;
    grid-column-end: 3;
}

button {
    margin-top: 1ch;
    grid-column-start: 2;
    grid-column-end: 3;
}
</style>
