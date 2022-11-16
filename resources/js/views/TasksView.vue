<template>
    <div class="flexbox">
        <div class="contents">
            <ul class="taskList">
                <Task v-for="id in tasks" :key="id" :id="id"/>
            </ul>
            <div class="spacer"></div>
            <BottomBar/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {useStore} from "../stores/TaskStore";
import Task from "../components/Task.vue";
import BottomBar from "../components/BottomBar.vue";

const store = useStore()
onMounted(() => store.dispatch('init'))
const tasks = computed(() => store.getters.ids)
</script>

<style scoped lang="scss">
@import "../../sass/_variables.scss";

.flexbox {
    display: flex;
    align-items: center;
    justify-content: center;
}

.contents {
    border: $accent solid 1px;
    border-radius: $border-radius;
    height: 80vh;
    width: min(80vw, 400px);
    display: flex;
    align-content: space-between;
    justify-content: center;
    flex-direction: column;

    ul {
        overflow: scroll;
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

}

</style>
