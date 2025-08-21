<template>
    <div>

        <PostCard v-for="(post, index) in postData" :key="index" :title="post.title" :comment="post.comment"
            :content="post.content" :is-active="post.isActive" :like="post.like" :time="post.time" :view="post.view"
            :topic="post.topic" />

    </div>
    <el-dialog v-model="dialogVisible" width="500">
        <CreatePostForum />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import CreatePostForum from './CreatePostForum.vue';
import PostCard from './PostCard.vue';
const dialogVisible = ref(false)
const postData = [
    {
        title: "Tu Tiên Nông Dân - Hành trình từ phàm nhân",
        user: "Đông Văn",
        time: "2 giờ trước",
        like: 345,
        view: 12540,
        comment: 67,
        topic: 'Linh dị',
        content: "Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương. Tình yêu của Dĩ Thâm dành cho Mặc Sênh giống như ánh mặt trời – lặng lẽ nhưng không bao giờ tắt.",
        hashtag: ['#tu tiên'],
        isActive: true
    },
    {
        title: "Tu Tiên Nông Dân - Hành trình từ phàm nhân",
        user: "Đông Văn",
        time: "2 giờ trước",
        like: 345,
        view: 12540,
        comment: 67,
        topic: 'Ngôn tình',
        content: "Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương. Tình yêu của Dĩ Thâm dành cho Mặc Sênh giống như ánh mặt trời – lặng lẽ nhưng không bao giờ tắt.",
        hashtag: ['#tu tiên'],
        isActive: false
    },
    {
        title: "Tu Tiên Nông Dân - Hành trình từ phàm nhân",
        user: "Đông Văn",
        time: "2 giờ trước",
        like: 345,
        view: 12540,
        comment: 67,
        topic: 'Lịch sử',
        content: "Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương. Tình yêu của Dĩ Thâm dành cho Mặc Sênh giống như ánh mặt trời – lặng lẽ nhưng không bao giờ tắt.",
        hashtag: ['#tu tiên'],
        isActive: true
    }
]
</script>

<style></style>