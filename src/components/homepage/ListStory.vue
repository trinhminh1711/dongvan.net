<template>
    <h3 class="list-title text-color_primary">{{ content }}</h3>
    <div class="list-container">
        <div v-for="(item, index) in items" :key="index" class="list-item">
            <span>{{ item.title }}</span>
            <span class="text-color__tertiary">{{ item.text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [
                { title: "Trận Vấn Trường", text: "Chương 1" },
                { title: "Cẩu Tại Sơ Thánh", text: "Chương 1" },
                { title: "Ngã Tại Tu Tiên gia", text: "Chương 1" },
                { title: "Huyền Trần Đạo Đồ", text: "Chương 1" },
                { title: "Cửu Vực Phàm Tiên", text: "Chương 1" }
            ]
        },
        content: {
            type: String,
            default: "Chương mới cập nhật"
        },
    }
}
</script>

<style scoped>
.list-title {
    font-weight: bold;
    text-align: left;
}

.list-item {
    text-align: left;
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: solid 1px #E4E7EC;
}
</style>
