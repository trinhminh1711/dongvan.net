<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <h3 class="fw-bold mb-3">Danh mục</h3>
                <div v-for="(item, index) in items" :key="index"
                    class=" d-flex align-items-center menu-category__item gap-2 py-2">
                    <div>
                        <img :src="item.image" alt="Logo">
                    </div>
                    <div>
                        <p class="text-color_primary">{{ item.text }}</p>
                        <p class="text-color__tertiary">{{ item.number }} bài viết</p>
                    </div>

                </div>
            </div>
            <div class="col-9">
                <router-view></router-view>
                <!-- <CreatePostForum /> -->
                <!-- <PostDetail /> -->
                <!--  -->

            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>

import storyIcon from '@/assets/icon/category-completed1.png'
import vectorIcon2 from '@/assets/icon/category-completed2.png'
import vectorIcon3 from '@/assets/icon/category-completed3.png'
import vectorIcon4 from '@/assets/icon/category-completed4.png'
import vectorIcon5 from '@/assets/icon/category-completed5.png'
import vectorIcon6 from '@/assets/icon/category-completed6.png'
import vectorIcon7 from '@/assets/icon/category-completed7.png'
import vectorIcon8 from '@/assets/icon/category-completed8.png'
import vectorIcon9 from '@/assets/icon/category-completed9.png'
import vectorIcon10 from '@/assets/icon/category-completed10.png'
import PostCard from '@/components/forum-page/PostCard.vue'
import ListPost from '@/components/forum-page/ListPost.vue'
import PostDetail from '@/components/forum-page/PostDetail.vue'
import CreatePostForum from '@/components/forum-page/CreatePostForum.vue'

const items = [
    { image: storyIcon, text: 'Linh dị', number: '236460' },
    { image: vectorIcon2, text: 'Trinh thám', number: '43492' },
    { image: vectorIcon3, text: 'Lịch sử', number: '77225' },
    { image: vectorIcon4, text: 'Ngôn tình', number: '45378' },
    { image: vectorIcon5, text: 'Truyện ngắn', number: '236460' },
    { image: vectorIcon6, text: 'Đề cử và Review truyện', number: '43492' },
    { image: vectorIcon7, text: 'Nhập môn sáng tác', number: '77225' },
    { image: vectorIcon8, text: 'Tìm bạn đồng sáng tác', number: '45378' },
    { image: vectorIcon9, text: 'Tin tức và sự kiện', number: '45378' },
    { image: vectorIcon10, text: 'Hỏi đáp cùng tác giả', number: '77225' },
]

</script>

<style></style>