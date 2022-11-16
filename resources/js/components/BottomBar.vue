<template>
    <div>
        <input v-model="state.newTaskName"/>
        <button class="suggested" @click="create">
            <span class="material-symbols-outlined">
                add
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import {useStore} from "../stores/TaskStore";
import {reactive} from "vue";

const state = reactive({
    newTaskName: ""
})

const store = useStore()
function create() {
    console.log(state.newTaskName)
    store.dispatch('create', state.newTaskName)
}
</script>

<style scoped lang="scss">
@import "../../sass/_variables.scss";

div {
    justify-content: flex-end;
    bottom: 0;
    background-color: $secondary;
    padding: 12px;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    display: flex;
    align-content: space-between;
    gap: 12px;

    input {
        flex-grow: 4;
    }
}
</style>
