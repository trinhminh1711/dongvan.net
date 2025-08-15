import ArticleCategoryList from '@/components/article-category/ArticleCategoryList.vue'
import LibraryPage from '@/components/library-page/LibraryPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import các page


const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/library-page', name: 'library', component: LibraryPage },
    { path: '/article-page', name: 'article', component: ArticleCategoryList }
]

const router = createRouter({
    history: createWebHistory(), // dùng HTML5 history mode
    routes
})

export default router
