<template>
    <div class="d-flex align-items-center justify-content-between">
        <div>
            <h3 class="text-color_primary fw-bold">Diễn đàn truyện</h3>
            <p>Khám phá và chia sẻ những câu chuyện tuyệt vời!</p>
        </div>
        <div>
            <button @click="dialogVisible = true" class="btn-alert"><el-icon class="align-middle">
                    <Plus />
                </el-icon> <span class="align-middle py-2">Đăng bài mới</span></button>
        </div>
    </div>
    <el-table class="mt-4" :data="tableData" style="width: 100%">
        <!-- Cột 1: Tên -->
        <el-table-column label="Chủ đề" prop="name" width="450">
            <template #default="scope">
                <div class="post-info py-3">
                    <div class="imgAuthor">
                        <img :src="scope.row.avatarImg" alt="">
                    </div>
                    <div class="info">
                        <p> <span class="text-sm fw-semibold color-blue post-topic"><span class="dot"></span> Luận
                                truyện</span> <span class="text-md fw-bold color-blue">{{ scope.row.name }}</span></p>
                        <div class="d-flex gap-3 align-items-center">
                            <p class="d-flex gap-1 align-items-center">
                                <el-icon>
                                    <User />
                                </el-icon> {{ scope.row.author }}
                            </p>
                            <p class="d-flex gap-1 align-items-center">
                                <el-icon>
                                    <Calendar />
                                </el-icon> {{ scope.row.time }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </el-table-column>

        <!-- Cột 2: Số chương -->
        <el-table-column label="Lượt tương tác" prop="chapters">
            <template #default="scope">
                <p class="like-share d-flex gap-4 py-4">
                    <span><el-icon>
                            <View />
                        </el-icon> {{ scope.row.view }}</span>
                    <span><el-icon>
                            <ChatRound />
                        </el-icon>{{ scope.row.comment }}</span>
                </p>
            </template>
        </el-table-column>

        <!-- Cột 3: Ngày đăng -->
        <el-table-column label="Tương tác gần nhất" prop="publishDate">
            <template #default="scope">
                <div class="closest-interaction d-flex align-items-center gap-1">
                    <div>
                        <p class="text-md color-blue">{{ scope.row.closestInteraction.date }}</p>
                        <p class="text-sm">{{ scope.row.closestInteraction.name }}</p>
                    </div>
                    <img style="max-width: 40px; height: 40px;" :src="scope.row.closestInteraction.avatarImg" alt="">
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="500">
        <CreatePostForum />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreatePostForum from './CreatePostForum.vue';
const dialogVisible = ref(false)
interface Item {
    name: string
    author: string,
    time: string,
    view: number,
    comment: number,
    avatarImg: string,
    closestInteraction: object,
}

const tableData = ref<Item[]>([
    {
        avatarImg: new URL('@/assets/image/avatar-author-post2.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Lý Miêu Nị cùng Cửu Bảo Trân',
        author: "Đông Văn", time: '21 giờ trước', view: 12540, comment: 67,
        closestInteraction: { avatarImg: new URL('@/assets/image/avatar-author-post.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025' }
    },
    {
        avatarImg: new URL('@/assets/image/avatar-author-post3.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Miêu Nị',
        author: "Đông Văn", time: '21 giờ trước', view: 12540, comment: 67,
        closestInteraction: { avatarImg: new URL('@/assets/image/avatar-author-post2.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025' }
    },
    {
        avatarImg: new URL('@/assets/image/avatar-author-post4.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Miêu Nị',
        author: "Đông Văn", time: '21 giờ trước', view: 12540, comment: 67,
        closestInteraction: { avatarImg: new URL('@/assets/image/avatar-author-post5.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025' }
    },
    {
        avatarImg: new URL('@/assets/image/avatar-author-post5.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Miêu Nị',
        author: "Đông Văn", time: '21 giờ trước', view: 12540, comment: 67,
        closestInteraction: { avatarImg: new URL('@/assets/image/avatar-author-post3.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025' }
    },
    {
        avatarImg: new URL('@/assets/image/avatar-author-post6.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Miêu Nị',
        author: "Đông Văn", time: '21 giờ trước', view: 12540, comment: 67,
        closestInteraction: { avatarImg: new URL('@/assets/image/avatar-author-post6.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025' }
    },
    {
        avatarImg: new URL('@/assets/image/avatar-author-post2.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Miêu Nị',
        author: "Đông Văn", time: '21 giờ trước', view: 12540, comment: 67,
        closestInteraction: { avatarImg: new URL('@/assets/image/avatar-author-post.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025' }
    },

])
// Các hàm xử lý
const handleAdd = (row: Item) => {
    console.log('Thêm:', row)
}
const handleEdit = (row: Item) => {
    console.log('Sửa:', row)
}
const handleDelete = (row: Item) => {
    console.log('Xóa:', row)
}
const handleSupport = (row: Item) => {
    console.log('Hỗ trợ:', row)
}
</script>
<style scoped>
.like-share span {
    display: flex;
    align-items: center;
    gap: 5px
}

.like-share span svg {
    width: 17px;
}

.post-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.dot {
    height: 5px;
    /* kích thước chấm */
    width: 5px;
    background-color: #0060bf;
    border-radius: 50%;
    /* bo tròn thành hình tròn */
    display: inline-block;
    /* hiển thị inline */
}

.post-topic {
    border: solid 1px #b0d5f4;
    border-radius: 10px;
    padding: 2px 10px;
}
</style>
