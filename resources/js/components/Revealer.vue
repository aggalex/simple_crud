<template>
    <div class="revealable" :class="hidden? 'hidden': ''">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "Revealer",
    props: {
        hidden: Boolean
    }
}
</script>

<style scoped lang="scss">
.revealable {
    transition: visibility, max-height .2s ease;
    overflow: hidden;
    max-height: 20vh;

    &.hidden {
        visibility: hidden;
        max-height: 0;
    }
}

</style>
