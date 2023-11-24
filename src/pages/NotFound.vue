<template>
    <div class="card card-body">
        <h2>404 Not Found</h2>
        <p>존재하지 않는 요청 경로 : {{ route.fullPath }}</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

    const route = useRoute();
    console.log(route.params);
</script>

<style scoped>

</style>