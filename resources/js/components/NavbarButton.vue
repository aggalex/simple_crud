<template>
    <li :class="(href || clickable)? 'enabled': 'disabled'">
        <a class="contents" :href="href" v-if="href">
            <slot/>
        </a>
        <button class="contents" @click="$emit('click')" v-else-if="clickable">
            <slot/>
        </button>
        <div class="contents" v-else>
            <slot/>
        </div>
    </li>
</template>

<script>
export default {
    name: "TitlebarButton",
    props: {
        href: String,
        clickable: Boolean
    },
    emits: ['click']
}
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
