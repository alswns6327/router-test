<template>
    <div>Members {{ currentRoute }}</div>
</template>

<script setup>
    import {useRoute} from 'vue-router'
    const currentRoute = useRoute();
</script>

<style scoped></style>