import ArticleCategoryList from '@/components/article-category/ArticleCategoryList.vue'
import CreateNewTrapForm from '@/components/create-story/CreateNewTrapForm.vue'
import ListPost from '@/components/forum-page/ListPost.vue'
import PostCard from '@/components/forum-page/PostCard.vue'
import PostCategory from '@/components/forum-page/PostCategory.vue'
import PostComment from '@/components/forum-page/PostComment.vue'
import PostDetail from '@/components/forum-page/PostDetail.vue'
import LibraryPage from '@/components/library-page/LibraryPage.vue'
import CreateStory from '@/pages/CreateStory.vue'
import ForumPage from '@/pages/ForumPage.vue'
import HomePage from '@/pages/HomePage.vue'
import InstructPage from '@/pages/InstructPage.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import ReadStory from '@/pages/ReadStory.vue'
import StoryDetail from '@/pages/StoryDetail.vue'
import SupportPage from '@/pages/SupportPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import các page


const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/library-page', name: 'library', component: LibraryPage },
    { path: '/payment', name: 'payment', component: PaymentPage },
    {
        path: '/forum', name: 'forum', component: ForumPage, children: [
            {
                path: "list-post",
                component: ListPost
            },
            {
                path: "post/:id",
                component: PostDetail
            },
            {
                path: "post-card",
                component: PostCategory
            },
        ]
    },
    { path: '/instruct-page', name: 'instruct', component: InstructPage },
    { path: '/support', name: 'support', component: SupportPage },
    { path: '/story-detail/:id', name: 'story', component: StoryDetail },
     { path: '/story-detail/:id/chap', name: 'story', component: ReadStory },
    { path: '/create-story', name: 'create-story', component: CreateStory },
    { path: '/create-story/new-chap', name: 'create-newchap', component: CreateNewTrapForm },
    {
        path: '/article-page', name: 'article', component: ArticleCategoryList, children: [

        ]
    }
]

const router = createRouter({
    history: createWebHistory(), // dùng HTML5 history mode
    routes
})

export default router
