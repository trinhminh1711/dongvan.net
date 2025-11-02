<script lang="ts" setup>
import Login from './pages/LoginPage.vue';
import Header from './components/view/Header.vue';
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import Footer from './components/view/Footer.vue';
import ArticleCategoryList from './components/article-category/ArticleCategoryList.vue';
import LibraryPage from './components/library-page/LibraryPage.vue';
import HomePage from './pages/HomePage.vue';
import PaymentPage from './pages/PaymentPage.vue';
import InstructPage from './pages/InstructPage.vue';
import SupportPage from './pages/SupportPage.vue';
import CreateStory from './pages/CreateStory.vue';
import ForumPage from './pages/ForumPage.vue';
import StoryDetail from './pages/StoryDetail.vue';
import ReadStory from './pages/ReadStory.vue';
import { useLoginModal } from '@/stores/useLoginModal'
import LoginPage from '@/pages/LoginPage.vue'
const loginModal = useLoginModal()
import { useRoute } from "vue-router";
const route = useRoute();
const dialogVisible = ref(false)
</script>
<template>
  <div class="layout">
    <header v-if="route.name !== 'chap-detail'" class="pt-3">
      <Header />
    </header>
    <main class="mt-3 main">
      <RouterView />
    </main>
    <footer v-if="route.name !== 'chap-detail'" class="bg-footer border-top mt-4">
      <Footer />
    </footer>
  </div>
  <el-dialog v-model="loginModal.isVisible" width="400" destroy-on-close append-to-body>
    <LoginPage />
  </el-dialog>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* luôn chiếm toàn chiều cao màn hình */
}

.main {
  flex: 1;
  /* chiếm hết không gian còn lại giữa header và footer */
}

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
