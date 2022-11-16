<template>
    <transition appear name="slide-fade" mode="out-in">
        <li>
            <div class="spacer"></div>
            <transition name="slide-fade" mode="out-in">
                <div v-if="!state.editMode">
                    <div class="name-section">
                        <h3>{{ task.name }}</h3>
                        <h5>Created {{ formatDate(task.created) }}</h5>
                        <h5>Edited {{ formatDate(task.edited) }}</h5>
                    </div>
                    <div class="spacer"></div>
                    <button @click="openEditMode">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                    <button class="destructive" @click="remove">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
                <div v-else>
                    <input v-model="state.newName">
                    <button class="suggested" @click="edit">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                </div>
            </transition>
            <div class="spacer"></div>
        </li>
    </transition>
</template>

<script setup lang="ts">
import {useStore} from "../stores/TaskStore";
import {computed, reactive} from "vue";
import TimeAgo from "javascript-time-ago";

const props = defineProps({
    id: Number
})

const state = reactive({
    editMode: false,
    newName: ""
})

const store = useStore()
const task = computed(() => store.state.tasks.get(props.id))

const timeAgo = new TimeAgo('en-GB')

function formatDate(date: Date) {
    return timeAgo.format(date)
}

function remove() {
    store.dispatch('delete', props.id)
}

function openEditMode() {
    state.newName = task.value.name
    state.editMode = true
}

function edit() {
    state.editMode = false
    store.dispatch('update', {
        id: props.id,
        name: state.newName
    })
}
</script>

<style scoped lang="scss">
@import "../../sass/_variables.scss";
@import "../../sass/transitions/slide_fade.scss";

li {
    padding: 12px 24px;
    transition: background-color 100ms;
    height: 60px;
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        align-items: center;
        transition: visibility 200ms;

        input {
            flex-grow: 1;
            overflow: auto;
            margin-right: 24px;
            font-size: 18px;
        }

        .name-section {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            h3, h5 {
                margin: 0;
            }

            h5 {
                color: gray;
            }
        }
    }

    &:hover {
        background-color: $secondary;
    }
}
</style>
