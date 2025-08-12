<script lang="ts" setup>
import HomePage from './pages/HomePage.vue';
import Login from './pages/LoginPage.vue';
import Header from './components/view/Header.vue';
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import Footer from './components/view/Footer.vue';

const dialogVisible = ref(false)
</script>
<template>
  <header class="py-3">
    <Header />
  </header>
  <main class="pb-8">
    <HomePage />
  </main>
  <footer class="bg-footer border-top">
    <Footer />
  </footer>
</template>

<style scoped>
.bg-footer{
  background-color: #E7E7E7
}
.pb-8
{
  padding-bottom: 80px;
}
</style>
