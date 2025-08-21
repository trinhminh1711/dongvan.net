<template>
  <div>
    <InputComment />
  </div>
   <PostComment v-for="value in listComment" :user="value.user" :comment="value.comment" :date="value.date" />
</template>

<script lang="ts" setup>
import InputComment from '../forum-page/InputComment.vue';
import PostComment from '../forum-page/PostComment.vue';

const listComment = [
    {
        user: "An Nhiên",
        comment: "Đến chương cuối mà vẫn không dám tin chuyện đã hết. Tình tiết nhẹ nhàng, ấm áp nhưng sâu lắng. Một trong những truyện chữa lành hay nhất mình từng đọc.",
        date: "2 tháng trước",
        isActive: true
    },
    {
        user: "Quang Vũ Đức",
        comment: "Tác giả xây dựng nhân vật quá đỉnh, đặc biệt là nữ chính — vừa thông minh lại không bánh bèo. Càng đọc càng cuốn, mong có thêm ngoại truyện! Lúc đầu thấy motip cũ, định bỏ giữa chừng, ai ngờ về sau plot twist liên tục, đọc liền 50 chương không dứt ra được!",
        date: "2 tháng trước",
        isActive: true
    },
    {
        user: "An Nhiên",
        comment: "Chấm điểm 8/10. Diễn biến logic, lời thoại tự nhiên, nhưng đoạn cao trào hơi nhanh. Nếu tác giả khai thác tâm lý nhân vật nhiều hơn nữa thì sẽ hoàn hảo!",
        date: "3 tháng trước",
        isActive: true
    },
]
</script>

<style>

</style>