<template>
    <NavbarButton clickable @click="$emit('click')">
        <div class="avatar-section">
            <span class="material-symbols-outlined avatar">
                account_circle
            </span>
            <slot>
                <span v-if="user">
                    {{ user }}
                </span>
                <span v-else>
                    Login
                </span>
            </slot>
        </div>
    </NavbarButton>
</template>

<script setup>
import NavbarButton from "./NavbarButton.vue";
import {computed} from "vue";
import {useStore} from "../stores/UserStore";

let store = useStore();
let user = computed(() => store.state.username);
defineEmits(['click']);
</script>

<style scoped>
.avatar-section {
    display: flex;
}

.avatar {
    margin-right: 10px;
}
</style>
