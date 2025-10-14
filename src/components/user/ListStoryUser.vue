<template>
    <div class="container">
        <div v-if="categoryList.length" class="row">
            <div v-for="(stories, index) in categoryList" :key="index" class="box-left__content col-md-6">
                <div class="book-card col-4">
                    <img style="max-width: 100%;" class="d-block" :src="stories.urlImg" alt=""></img>
                </div>
                <div class="left-content col-8">
                    <p class="text-color_primary fw-bold text-lg">{{ stories.title }}</p>
                    <p class="color-red fst-italic"><span class="fw-bold text-md">{{ stories.last_chap_number > 0 ? stories.last_chap_number : "Chưa có" }}</span>
                        <span class="text-md">
                            chương</span>
                    </p>
                    <button @click="readOnBook(stories.story_id)" class="btn-alert my-3">Đọc
                        ngay</button>
                </div>
            </div>
        </div>
        <div v-if="!categoryList.length">
            <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
            <p style="text-align: center;">Không có dữ liệu</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { getListUserReading } from '@/api/stories';
import { getStory } from '@/api/stories';
import { useRouter } from "vue-router";
const router = useRouter();
const currentPage = 1
const categoryList = ref([]);
const props = defineProps({
    userId: {
        type: Number,
        required: true
    },
})
function handlePageChange(page) {
    console.log('Trang mới:', page) // In ra số trang
}
async function getListReading() {
    const res = await getStory(props.userId)
    console.log(res);
    categoryList.value = res
    console.log(categoryList.value);
}

function readOnBook(storyId) {
    router.push({
        name: "story",
        params: { id: storyId }
    });
}
onMounted(async () => {
    await getListReading()
})
</script>

<style scoped>
.book-card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.ribbon {
    position: absolute;
    top: 12px;
    left: -35px;
    /* dịch ra để canh chéo */
    width: 120px;
    text-align: center;
    background: #16a34a;
    /* xanh lá */
    color: #fff;
    font-weight: bold;
    transform: rotate(-45deg);
    padding: 4px 0;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.ribbon-vip {
    position: absolute;
    top: 12px;
    left: -35px;
    /* dịch ra để canh chéo */
    width: 120px;
    text-align: center;
    background: red;
    /* xanh lá */
    color: #fff;
    font-weight: bold;
    transform: rotate(-45deg);
    padding: 4px 0;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.box-left__content {
    display: flex;
    padding: 10px;
}

.box-left__content .left-content {
    padding: 10px 15px;
}

.left-content__desc {
    display: -webkit-box;
    /* cần cho multi-line clamp */
    -webkit-line-clamp: 4;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    /* hướng hộp */
    overflow: hidden;
}

.box-left__content h4 {
    font-size: 22px;
}

.fw-semibold {
    font-weight: 500 !important;
}
</style>