<template>
    <div class="container">
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-6">
                <img class="img-cover" :src="stories.urlImg" alt="">
                <div class="left-content">
                    <router-link  :to="{ name: 'story', params: { id: stories.story_id } }"><h4 class="text-color_primary fw-bold hover_link">{{ stories.title }}</h4></router-link>
                    <p class="color-red fst-italic">
                        <span class="text-md">
                            <span class="fw-bold">{{ stories.last_chap_number ?? 1  }}</span> chương</span></p>
                    <p class="text-md fw-semibold py-2"> Chương đang viết: [Chương {{  stories.last_chap_number ?? 1 }}] {{ stories.last_chapter_title }} </p>
                    <button @click="$router.push(`/create-story/new-chap/${stories.story_id}`)"
                        class="btn-alert my-4">Đăng chương</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getStory } from "@/api/stories"
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const stories = ref<any[]>([])
const loading = ref(false)
const currentPage = 1
const categoryList = ref([]);
onMounted(async () => {
    const res = await getStory(auth.userId)
    console.log(res);
    
    categoryList.value = res
})
function handlePageChange(page) {
    console.log('Trang mới:', page) // In ra số trang
}

</script>

<style scoped>
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

.img-cover {
    width: 150px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>