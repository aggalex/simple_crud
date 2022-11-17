<template>
    <div class="outer-box">
        <h1> Your Daily TaskList</h1>
        <div class="inner-box">
            <Login/>
            <hr>
            <Register/>
        </div>
    </div>
</template>

<script setup lang="ts">

import Login from "../layouts/Login.vue";
import Register from "../layouts/Register.vue";
</script>

<style scoped lang="scss">
@import "../../sass/_variables.scss";

.outer-box {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;

    h1 {
        padding: 9vh;
        text-align: center;
        background: #00324D;
    }

    .inner-box {
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        justify-content: center;

        hr {
            width: 1px;
            height: 40vh;
            border: 0;
            border-left: 1px solid $accent;
            margin: 10vh;
        }
    }
}
</style>
