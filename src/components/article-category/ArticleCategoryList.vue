<template>
    <div v-if="categoryList" class="container">
        <h2 class="text-color_primary fw-bold">Truyện {{ categoryList[0]?.genre_name }}</h2>
        <p style="background-color: rgba(24, 119, 242, 0.1); border-radius: 5px;" class="color-blue  px-3 py-2 mt-2">
            <span class="fw-bold">Mô tả thể loại:</span> {{ categoryList[0]?.genre_description }}
        </p>
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-6 mt-3">
                <img style="max-width: 150px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* bóng mờ nhẹ */ border-radius: 8px;" :src="stories.urlImg" alt="">
                <div class="left-content px-4">
                    <h4 class="text-color_primary fw-bold hover_link">{{ stories.title }}</h4>
                    <p class="left-content__author text-color__tertiary">{{ stories.author }}</p>
                    <p><img src="@/assets/icon/quote.png" alt="">
                        <desc class="left-content__desc text-sm">
                            {{ stories.description }}
                        </desc>
                    </p>
                    <button @click="goToStory(stories.story_id)" class="btn-alert mt-3">Đọc tiếp</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute();
const currentPage = 1
const categoryList = ref(null);
import { getStoryByCategory } from '@/api/stories'
onMounted(async () => {
    const getData = await getStoryByCategory(route.params.id)
    console.log(getData);

    categoryList.value = getData.data

});

function handlePageChange(page) {
    console.log('Trang mới:', page) // In ra số trang
}
function goToStory(post_id) {
    router.push({
    name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
    params: { id:post_id }       // Truyền param id
  })
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
</style>