<template>
    <div>
        <div class="menu">
            <button @click="logout">Log out</button>
            <button>Manage Account</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useStore} from "../stores/UserStore"

let store = useStore()

function logout() {
    store.dispatch('logout')
}
</script>

<style scoped lang="scss">
@import "../../sass/account_popup_grid.scss";

</style>
