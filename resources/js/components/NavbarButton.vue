<template>
    <li :class="(props.href || props.clickable)? 'enabled': 'disabled'">
        <a class="contents" :href="props.href" v-if="props.href">
            <slot/>
        </a>
        <button class="contents" @click="$emit('click')" v-else-if="props.clickable">
            <slot/>
        </button>
        <div class="contents" v-else>
            <slot/>
        </div>
    </li>
</template>

<script setup>
defineEmits(['click'])
let props = defineProps({
    href: String,
    clickable: Boolean
})
</script>

<style scoped lang="scss">
@import "../../sass/variables";

$button-height: (($nav-height - 24px)/2);

li {
    transition: ease-in-out;
    transition-duration: 200ms;
    display: flex;
    flex-flow: column;
    align-items: center;
    align-content: center;
    color: white;
    height: $button-height;

    .contents {
        padding: $button-height 1ch;
        flex: 1;
        text-align: center;
        color: white;
        text-decoration: none;
        font-weight: bold;
    }

    button.contents {
        border-radius: 0;
        font-size: 16px;
    }

    button.contents:hover {
        background: transparent !important;
    }
}

li.enabled:hover {
    background-color: $accent;
    height: $button-height + 40px;
}
</style>
