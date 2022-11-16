<template>
    <div class="revealable" :class="props.hidden? 'hidden': ''">
        <slot/>
    </div>
</template>

<script setup>
const props = defineProps({
    hidden: Boolean
})
</script>

<style scoped lang="scss">
.revealable {
    transition: visibility, max-height .2s ease;
    overflow: hidden;
    max-height: 300px;

    &.hidden {
        visibility: hidden;
        max-height: 0;
    }
}

</style>
