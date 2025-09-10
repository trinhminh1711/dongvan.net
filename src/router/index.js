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
import ProfilePage from '@/pages/ProfilePage.vue'
import ReadStory from '@/pages/ReadStory.vue'
import StoryDetail from '@/pages/StoryDetail.vue'
import requireAuth from "@/middleware/auth";
import SupportPage from '@/pages/SupportPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EditStory from '@/components/create-story/EditStory.vue'
import NotFound from '@/pages/NotFound.vue'
// Import các page


const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/library-page', name: 'library', component: LibraryPage },
    { path: '/payment', name: 'payment', component: PaymentPage },
    {
        path: '/forum', name: 'forum', component: ForumPage, children: [
            {
                path: "list-post/:id",
                name:"list-post",
                component: ListPost
            },
            {
                path: "post-detail/:id",
                name:"post-detail",
                component: PostDetail
            },
            {
                path: "post-card",
                name: "post-card",
                component: PostCategory
            },
        ]
    },

    { path: '/instruct-page', name: 'instruct', component: InstructPage },
    { path: '/support', name: 'support', component: SupportPage },
    { path: '/story-detail/:id', name: 'story', component: StoryDetail },
    { path: '/story-detail/:id/chap/:chapId', name: 'chap-detail', component: ReadStory },
    { path: '/create-story', name: 'create-story', component: CreateStory },
    { path: '/profile', name: 'profile', component: ProfilePage, beforeEnter: requireAuth },
    { path: '/create-story/new-chap/:storyId', name: 'create-newchap', component: CreateNewTrapForm },
    { path: '/edit-story/:id', name: 'edit-story', component: EditStory },
    {
        path: '/article-page/:id', name: 'article', component: ArticleCategoryList, children: [

        ]
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
]

const router = createRouter({
    history: createWebHistory(), // dùng HTML5 history mode
    routes
})

export default router
