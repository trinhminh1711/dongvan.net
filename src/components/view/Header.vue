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
                     <router-link to="/profile"><img src="@/assets/icon/bell-02.svg" alt=""></router-link>
                    <router-link to="/create-story"><img src="@/assets/icon/books-stack-of-three 1.svg" alt=""></router-link> 
                    <router-link to="/profile"><img src="@/assets/icon/user-icon.svg" alt=""></router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="menu-bar">
        <div class="container text-center">
            <div class="row align-items-start align-items-center justify-content-between">
                <div class="col-3 d-flex align-items-center">
                    <div class="d-flex align-items-center">
                        <el-icon style="color: aliceblue;">
                            <Fold />
                        </el-icon>
                    </div>
                    <div class="text-white">
                        Thể loại
                    </div>
                </div>
                <div class="col">
                    <div class="menu-item">
                        <el-menu class="el-menu-top" mode="horizontal" background-color="#545c64" text-color="#fff"
                            active-text-color="#ffd04b" @select="handleSelect">
                           <router-link :to="{ name: 'forum' }"><el-menu-item index="1">Diễn đàn</el-menu-item></router-link>
                             <router-link :to="{ name: 'forum' }"><el-menu-item index="2">Bảng xếp hạng</el-menu-item></router-link>
                            <router-link :to="{ name: 'support' }"><el-menu-item index="3">Hỗ trợ</el-menu-item></router-link>
                        </el-menu>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex justify-content-end">
                        <router-link to="/library-page"><span class="text-white px-4">
                                Tủ truyện
                            </span></router-link>
                        <router-link to="/article-page/1"><span class="text-white">
                                Danh mục</span>
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
const auth = useAuthStore();
const dialogVisible = ref(false)

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
const handleSelect = (item: Record<string, any>) => {
    console.log(item)
}

const handleIconClick = (ev: Event) => {
    console.log(ev)
}

onMounted(() => {
    links.value = loadAll()
})
</script>

<style>
.menu-bar {
    background-color: rgb(42, 41, 41);
}
.menu-item .el-menu-item
{
    max-height: 100%;
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
.el-menu--horizontal
{
    border: none !important;
    display: flex;
    width: 100%;
}
.el-menu-item
{
 
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
</style>