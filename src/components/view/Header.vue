<template>
    <div class="container pb-3 text-center">
        <div class="row align-items-start align-items-center justify-content-between">
            <div class="col d-flex justify-content-start">
                <router-link to="/"><img class="header-logo" src="@/assets/logo.png" /></router-link>
            </div>
            <div class="col">
                <el-autocomplete class="search-bar" v-model="state" :fetch-suggestions="querySearch"
                    popper-class="my-autocomplete" placeholder="Tìm kiếm tên truyện" @select="handleSelect">
                    <template #suffix>
                        <el-icon style="color: black;" class="el-input__icon" @click="handleIconClick">
                            <Search />
                        </el-icon>
                    </template>
                    <template #default="{ item }">
                        <div class="value">{{ item.value }}</div>
                        <span class="link">{{ item.link }}</span>
                    </template>
                </el-autocomplete>
            </div>
            <div class="col">
                <div v-if="!auth.isAuthenticated" @click="dialogVisible = true" class="d-flex justify-content-end">
                    <button type="button" class="btn btn-danger">Tài khoản</button>
                </div>
                <div v-if="auth.isAuthenticated" class="user-login_icon">
                    <el-popover style="display: flex;" v-if="listNotifi" class="px-2 d-flex align-items-center"
                        placement="left-start" :width="400" trigger="click">
                        <div>
                            <p class="d-flex justify-content-between mb-4 pt-2"><span
                                    class="text-lg fw-bold text-color_primary">Thông
                                    báo</span>
                                <span class="color-blue">Đánh dấu tất cả đã
                                    đọc</span>
                            </p>
                            <div v-for="value in listNotifi" class="d-flex align-items-start gap-3 pb-4">
                                <div>
                                    <img src="@/assets/icon/notification-bell-icon.svg" alt=""></img>
                                </div>
                                <div>
                                    <p style="font-size: 12px;">{{ timeAgo(value.created_at) }}</p>
                                    <p @click="goToNoti(value.post_id)" class="fw-bold text-color_primary hover_link">
                                        {{
                                            value.title }}</p>
                                    <p class="text-scroll" styl v-html="value.content"
                                        style="line-height: 1.5; font-size: 13px; color: #606266;"></p>
                                </div>
                            </div>
                        </div>
                        <template #reference>
                            <el-badge :value="notiNumber" class="item">
                                <img src="@/assets/icon/bell-02.svg" alt="">
                            </el-badge>
                        </template>
                    </el-popover>
                    <router-link to="/library-page" class="d-flex align-items-center">
                        <img src="@/assets/icon/books-stack-of-three 1.svg" alt="">
                    </router-link>
                    <el-popover class="px-2" placement="bottom-start" :width="200" trigger="click">
                        <div>
                            <div class="pb-3 d-flex align-items-center gap-2 "
                                style="border: none;border-bottom: 1px solid #ccc;">
                                <img style="width: 50px; border-radius: 50%; height: 50px;"
                                    :src="auth.user.link_thumbnail" alt="">
                                <div>
                                    <p class="fw-bold text-color_primary">{{ auth.user.username }}</p>
                                    <p>ID: {{ auth.user.user_id }}</p>
                                </div>
                            </div>
                            <div class="drop-menu">
                                <ul class="px-0" style="list-style: none;">
                                    <li @click=" goToPage('profile')">
                                        <img src="@/assets/icon/icon-user.png" alt="">
                                        <span class="hover_link">Thông tin cá nhân</span>
                                    </li>
                                    <li @click=" goToPage('my-post')">
                                        <img src="@/assets/icon/icon-book-stores.png" alt="">
                                        <span class="hover_link">Truyện của tôi</span>
                                    </li>
                                    <li @click="goToPage('payment')">
                                        <img src="@/assets/icon/icon-buy.png" alt="">
                                        <span class="hover_link">Nạp Tang Diệp</span>
                                    </li>
                                    <li>
                                        <img src="@/assets/icon/icon-pay.png" alt="">
                                        <span class="hover_link">Lịch sử giao dịch</span>
                                    </li>
                                    <li @click="goToPage('support')"><img src="@/assets/icon/icon-support.png" alt="">
                                        <span class="hover_link">Liên hệ hỗ trợ</span>
                                    </li>
                                    <hr style="  border: none;border-top: 1px solid #ccc;">
                                    <li @click="logout()"><img src="@/assets/icon/icon-logout.png" alt="">
                                        <span class="hover_link"> Đăng xuất</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <template #reference>
                            <img src="@/assets/icon/user-icon.svg" alt="">
                        </template>
                    </el-popover>
                </div>
            </div>
        </div>
    </div>
    <div class="menu-bar">
        <div class="container text-center">
            <div class="row align-items-start align-items-center justify-content-between">
                <div class="col-3 d-flex align-items-center">
                    <el-popover :disabled="route.name == 'Home'" popper-class="my-popover" placement="bottom-start" :width="300" trigger="hover">
                        <div class="row col-12  d-flex align-items-center menu-category">
                            <div @click="goToCategory(item)" v-for="(item, index) in items" :key="index"
                                class="col-6 d-flex align-items-center menu-category__item">
                                <span>
                                    <img :src="item.image" alt="Logo">
                                </span>
                                <span>
                                    <p class="text-color_primary">{{ item.text }}</p>
                                    <p class="text-color__tertiary">{{ item.number }}</p>
                                </span>
                            </div>
                        </div>
                        <template #reference>
                            <div class="d-flex hover_link">
                                <div class="d-flex align-items-center">
                                    <el-icon :size="20" style="color: aliceblue;">
                                        <Fold />
                                    </el-icon>
                                </div>
                                <div class="text-white ms-1">
                                    Thể loại
                                </div>
                            </div>
                        </template>
                    </el-popover>

                </div>
                <div class="col-5">
                    <div class="menu-item d-flex justify-content-center">
                        <el-menu class="el-menu-top " background-color="rgb(42, 41, 41)" back mode="horizontal"
                            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                            <div style="display: flex;">
                                <router-link :to="{ name: 'forum' }"><el-menu-item index="1">Diễn
                                        đàn</el-menu-item></router-link>
                                <router-link :to="{ name: 'forum' }"><el-menu-item index="2">Bảng xếp
                                        hạng</el-menu-item></router-link>
                                <router-link :to="{ name: 'support' }"><el-menu-item index="3">Hỗ
                                        trợ</el-menu-item></router-link>
                            </div>
                        </el-menu>
                    </div>
                </div>
                <div class="col-4">
                    <div class="d-flex justify-content-end">
                        <router-link :to="{ name: 'instruct' }">
                            <p class="text-white px-4 d-flex align-items-center gap-2">
                                <img src="@/assets/icon/huong-dan.svg" alt=""> Hướng dẫn
                            </p>
                        </router-link>
                        <router-link :to="{ name: 'create-story' }">
                            <p class="text-white px-4 d-flex align-items-center gap-2">
                                <img src="@/assets/icon/dang-truyen.svg" alt=""> Đăng truyện
                            </p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" width="300">
        <LoginPage />
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from "@/stores/auth";
import { getPostForumByTopic } from '@/api/forum';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router"
import storyIcon from '@/assets/icon/StoryIcon.png'
import vectorIcon2 from '@/assets/icon/Vector (2).svg'
import vectorIcon3 from '@/assets/icon/Vector (3).svg'
import vectorIcon4 from '@/assets/icon/Vector (4).svg'
import vectorIcon5 from '@/assets/icon/Vector (5).svg'
import vectorIcon6 from '@/assets/icon/open-book-2 1.svg'
import vectorIcon7 from '@/assets/icon/Vector (6).svg'
import vectorIcon8 from '@/assets/icon/Vector (7).svg'
import vectorIcon9 from '@/assets/icon/helmet 1.svg'
import vectorIcon10 from '@/assets/icon/building 1.svg'
import vectorIcon11 from '@/assets/icon/poem 1.svg'
import vectorIcon12 from '@/assets/icon/Vector (8).svg'
const router = useRouter();
const route = useRoute()
const auth = useAuthStore();
const dialogVisible = ref(false)
import { toast } from "vue3-toastify";
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
interface LinkItem {
    value: string
    link: string
}
const state = ref('')
const links = ref<LinkItem[]>([])
const notiNumber = ref()
const querySearch = (queryString: string, cb) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value
    // call callback function to return suggestion objects
    cb(results)
}
const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const loadAll = () => {
    return [
        { value: 'Truyện mới' },
        { value: 'Hướng dẫn đăng truyện' },
        { value: 'Nạp tam điệp' },
        { value: 'Sống Sót Trong Trò' },
        { value: 'Đọc nhiều trong tuần' },

    ]
}
const listNotifi = ref([])
const handleSelect = (item: Record<string, any>) => {
    console.log(item)
}

const handleIconClick = (ev: Event) => {
    console.log(ev)
}
async function getNotification() {
    const res = await getPostForumByTopic(1);
    listNotifi.value = getPostsToday(res.data)
    notiNumber.value = listNotifi.value.length

}
function logout() {
    toast.loading("Đang đăng xuất...");
    setTimeout(() => {
        auth.logout();
        router.push({ name: "Home" }).then(() => {
            window.location.reload();
        });
    }, 2000);
}
function goToCategory(item) {
    router.push({
        name: "article",
        params: { id: item.id },
    });
}
function goToNoti(id) {
    router.push({
        name: "post-detail",
        params: { id: id }
    });

}
function timeAgo(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - inputDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) {
        return `${diffSec} giây trước`;
    } else if (diffMin < 60) {
        return `${diffMin} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays <= 30) {
        return `${diffDays} ngày trước`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} tháng trước`;
    }
}
const items = [
    { image: storyIcon, text: 'Linh dị', number: '236460', id: 1 },
    { image: vectorIcon2, text: 'Trinh thám', number: '43492', id: 2 },
    { image: vectorIcon3, text: 'Lịch sử', number: '77225', id: 3 },
    { image: vectorIcon4, text: 'Ngôn tình', number: '45378', id: 4 },
    { image: vectorIcon5, text: 'Truyện ngắn', number: '236460', id: 5 },
    { image: vectorIcon6, text: 'Thơ', number: '43492', id: 6 },
    { image: vectorIcon7, text: 'Huyền ảo', number: '77225', id: 7 },
    { image: vectorIcon8, text: 'Viễn tưởng', number: '45378', id: 8 },
    { image: vectorIcon9, text: 'Cổ đại', number: '45378', id: 9 },
    { image: vectorIcon10, text: 'Hiện thực', number: '77225', id: 10 },
    { image: vectorIcon11, text: 'Tản văn', number: '77225', id: 11 },
    { image: vectorIcon12, text: 'Tất cả', number: '77225', id: 12 },
]
function getPostsToday(posts) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return posts.filter(post => {
        const created = new Date(post.created_at);
        return created >= startOfDay && created < endOfDay;
    });
}
function goToPage(name) {
    if (name == 'my-post') {
        router.push({
            name: "create-story", // đúng route name của Component A
            query: { tab: "second" } // mở tab2
        });
    }
    else {
        const options = { name: name };
        router.push(options);
    }
}
onMounted(async () => {
    await getNotification();
    console.log(auth.user);

})
</script>

<style>
.my-popover {
    display: flex;
    justify-content: center;
}

.menu-bar {
    background-color: rgb(42, 41, 41);
}

.menu-item .el-menu-item {
    max-height: 100%;
    padding: 0 30px;
    transition: all ease-in-out 1s;
}


.menu-item .el-menu a {
    padding: 0;
}

.menu-item .el-menu-item:hover {
    background: linear-gradient(#E60000, #FF6114) !important;
    color: #fff !important;
    transition: all ease-in-out 1s;
}

.search-bar .el-input__inner {
    height: 40px;
}

.search-bar .el-input__wrapper {
    border-radius: 50px;
}

.demo-tabs>.el-tabs__content {
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-menu--horizontal {
    border: none !important;
    display: flex;
    width: 100%;
}

.user-login_icon .el-tooltip__trigger {
    display: flex;
    align-items: center;
}

.header-logo {
    width: 150px;
    height: auto;
}

.el-menu-top {
    max-height: 40px;
}

.btn-danger {
    padding: 5px 20px;
    border-radius: 40px;
    border: solid 1px;
    color: #fff;
    background: red;
}

.user-login_icon {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: end
}

.user-login_icon img {
    max-width: 24px;
}

.text-scroll {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* số dòng tối đa */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<style scoped>
.drop-menu li {
    padding: 10px 0;
    font-weight: 500;
    vertical-align: middle;
    display: flex;
    align-items: center;
    color: #344054;
}

.drop-menu li img {
    padding: 0 5px;
}
</style>
<style scoped>
.menu-category span {
    text-align: left;
}

.menu-category p {
    font-size: 12px;
    line-height: 1.5;
}

.menu-category img {
    padding: 10px;
}

.menu-category__item {
    padding: 7px 0;
}

.menu-category div:nth-child(4n+3),
.menu-category div:nth-child(4n+4) {
    background: #F7F6F2
}

.banner-tabs .el-menu-item {
    font-size: 12px;
}

.el-menu {
    max-height: 40px;
    display: flex;
    justify-content: space-between;
}

.banner-tabs .el-menu-item {
    height: auto !important;
    padding: 0 10px;
}

.el-menu-story .el-tab-pane img {
    max-width: 33%;
}

.banner-newfeeds img {
    width: 100%;
    height: 150px;
}

.topic-item {
    font-size: 12px;
    line-height: 3;
}

.topic-item .text-black {
    white-space: nowrap;
}

.topic-item .text-color__tertiary {
    margin-left: 2px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.topic-item:hover span {
    cursor: pointer;
    color: #ff6114;
}

.new-feed_title img {
    max-width: 20px;
    height: auto;
    margin-right: 4px;
}

.menu-category>div:hover {
    cursor: pointer;
    background-color: #f7f6f2;
    transition: all .2s ease-in;
}
</style>