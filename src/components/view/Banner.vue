<template>
    <div class="container py-3 text-center">
        <div class="row align-items-start  justify-content-between">
            <div class="row col-3 col d-flex align-items-center menu-category">
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
            <div class="col-6 el-menu-story">
                <img style="width: 100%; height: 250px;"
                    src="https://www.quehuong.org.vn/wp-content/uploads/2018/07/dung-noi-chuyen-voi-co-ay.jpg" alt=""
                    srcset="">
                <div class="banner-tabs">
                    <el-tabs v-model="activeTabs" class="tabs-category">
                        <el-tab-pane label="TTV Translate" name="first">
                            <div class="d-flex">
                                <img src="@/assets/image/img-cateory1.png" />
                                <img src="@/assets/image/img-cateory2.png" />
                                <img src="@/assets/image/img-cateory3.png" />
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Lâm Uyên Hành" name="second">
                            <div class="d-flex">
                                <img src="@/assets/image/img-cateory3.png" />
                                <img src="@/assets/image/img-cateory1.png" />
                                <img src="@/assets/image/img-cateory2.png" />

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Vạn Cổ Tối Cường" name="third">
                            <div class="d-flex">
                                <img src="@/assets/image/img-cateory3.png" />
                                <img src="@/assets/image/img-cateory2.png" />
                                <img src="@/assets/image/img-cateory1.png" />

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Quỷ Bí Chi Chủ" name="fourth">
                            <div class="d-flex">
                                <img src="@/assets/image/img-cateory2.png" />
                                <img src="@/assets/image/img-cateory1.png" />
                                <img src="@/assets/image/img-cateory3.png" />

                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="col-3 p-0 banner-newfeeds">
                <h3 class="text-start new-feed_title d-flex align-items-center text-color_primary fw-bold">
                    <img src="@/assets/icon/newfeed.png" alt=""> Tin tức mới
                </h3>
                <ul class="m-0 p-0">
                    <li @click="goToPost(item.link)" v-for="(item, index) in newFeeds" :key="index"
                        class="d-flex align-items-center topic-item hover_link">
                        <span class="text-black">[{{ item.topic }}]</span>
                        <span class="text-color__tertiary">{{ item.text }}</span>
                    </li>
                </ul>
                <img src="@/assets/image/image-banner2.png" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { spaceProps } from 'element-plus'
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
import { useRouter } from "vue-router";
import { getPost } from '@/api/forum'
const router = useRouter();
const activeTabs = ref('first')
interface LinkItem {
    value: string
    link: string
}
function goToCategory(item) {
    router.push({
        name: "article",
        params: { id: item.id }
    });
}
function goToPost(id) {
    router.push({
        name: "post-detail",
        params: { id: id }
    });
}
async function getNotification() {
    const res = await getPost()
    newFeeds.value = res.data.map(b => ({
        topic: b.topic_title,
        text: b.title,
        link: b.post_id
    }));
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
const newFeeds = ref([])
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
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
    ]
}
const handleSelect = (item: Record<string, any>) => {
    console.log(item)
}

const handleIconClick = (ev: Event) => {
    console.log(ev)
}
onMounted(async () => {
    links.value = loadAll();
    await getNotification();

})
</script>
<style>
.tabs-category .el-tabs__item {
    font-size: 12px;
    width: 25%;
    text-align: center;
    padding: 0 !important;
}

.tabs-category .el-tabs__item.is-active {
    background-color: #FF6114;
    color: #fff;
}

.tabs-category .el-tabs__active-bar,
.tabs-category .el-tabs__nav-wrap:after {
    display: none;
}

.tabs-category .el-tabs__nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.banner-tabs {
    position: relative;
    top: -46px;
}

.banner-tabs .el-tabs__header {
    background-color: rgba(0, 0, 0, 0.4);
}

.banner-tabs .el-tabs__header .el-tabs__item {
    color: #fff;
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