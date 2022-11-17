<template>

</template>

<script setup lang="ts">
import {useStore} from "../stores/UserStore"


function logout() {
    store.dispatch('logout')
}
</script>

<style scoped lang="scss">

</style>
