<template>
    <Navbar/>
    <div class="padding"></div>
    <router-view class="router-view"/>
</template>

<script setup lang="ts">
import Navbar from "./layouts/Navbar.vue";
import AccountPopup from './layouts/AccountPopup.vue';
import {useStore} from "./stores/UserStore";

</script>

<style scoped lang="scss">
@import "../sass/_variables.scss";

.padding {
    height: $nav-height;
}
</style>
