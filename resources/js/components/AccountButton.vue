<template>
    <NavbarButton clickable @click="$emit('click')">
        <div class="avatar-section">
            <span class="material-symbols-outlined avatar">
                account_circle
            </span>
            <slot>
                Login
            </slot>
        </div>
    </NavbarButton>
</template>

<script>
export default {
    name: "AccountButton",
    emits: ['click']
}
</script>

<script setup>
import NavbarButton from "./NavbarButton.vue";
</script>

<style scoped>
.avatar-section {
    display: flex;
}

.avatar {
    margin-right: 10px;
}
</style>
