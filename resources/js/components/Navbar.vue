<template>
    <div class="navbar">
        <ul>
            <div class="section start">
                <slot name="start"/>
                <slot/>
            </div>
            <div class="section end">
                <slot name="end"/>
            </div>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@import "../../sass/variables";

ul {
    list-style-type: none;
    padding: 0;
    height: $nav-height;
    justify-content: space-between;
    flex: 1;
    border-bottom-color: white;
    border-bottom-width: 1px;
    margin: 0 1ch 1px;
}

ul, .section {
    display: flex;
    flex-flow: row nowrap;
}

.section {
    flex: 1;
}

.section.start {
    /*justify-self: flex-start;*/
    justify-content: flex-start;
}

.section.end {
    /*justify-self: flex-end;*/
    justify-content: flex-end;
}

.navbar {
    position: sticky;
    background-color: $secondary;
}
</style>

