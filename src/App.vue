<script lang="ts" setup>
import HomePage from './pages/HomePage.vue';
import Login from './pages/LoginPage.vue';
import Header from './components/view/Header.vue';
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
</script>
<template>
  <header class="py-3">
    <Header />
  </header>
  <main>
    <HomePage />
  </main>
</template>

<style scoped></style>
