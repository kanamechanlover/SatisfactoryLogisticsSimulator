<template>
    <div class="test-content" :style="{left: left, top: top}">
        <!--<content>default</content>-->
    </div>
</template>

<script>
export default {
    props: {
        x: Number,
        y: Number,
    },
    computed: {
        left() { return this.x + 'px' },
        top() { return this.y + 'px' }
    }
}
</script>

<style>
    .test-content {
        position: absolute;
    }
</style>