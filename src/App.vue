<script lang="ts" setup>
import Login from './pages/LoginPage.vue';
import Header from './components/view/Header.vue';
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import Footer from './components/view/Footer.vue';
import ArticleCategoryList from './components/article-category/ArticleCategoryList.vue';
import LibraryPage from './components/library-page/LibraryPage.vue';
import HomePage from './pages/HomePage.vue';

const dialogVisible = ref(false)
</script>
<template>
  <header class="py-3">
    <Header />
  </header>
  <main class="pb-8">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>
  <footer class="bg-footer border-top">
    <Footer />
  </footer>
</template>

<style scoped>
.bg-footer {
  background-color: #E7E7E7
}

.pb-8 {
  padding-bottom: 80px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
