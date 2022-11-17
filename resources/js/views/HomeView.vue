<template>
    <TasksView v-if="isLoggedIn"/>
    <LoginView v-else/>
</template>

<script setup lang="ts">
import TasksView from "./TasksView.vue";
import {useStore} from "../stores/UserStore";
import {computed, onMounted} from "vue";
import Login from "../layouts/Login.vue";
import LoginView from "./LoginView.vue";

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn)
onMounted(() => store.dispatch('updateProfile'))
</script>

<style scoped lang="scss">

</style>
