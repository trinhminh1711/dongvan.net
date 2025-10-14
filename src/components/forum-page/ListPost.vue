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
        <el-table-column label="Chủ đề" prop="name" width="500">
            <template #default="scope">
                <div class="post-info py-3">
                    <div class="imgAuthor">
                        <img style="width: 70px; height: 70px; border-radius: 50%;" :src="scope.row.avatarImg" alt="">
                    </div>
                    <div class="info">
                        <p> <span class="text-sm fw-semibold color-blue post-topic"><span class="dot"></span>
                                {{ scope.row.topicTitle }}
                            </span> <span @click="goToPost(scope.row.postId)" class="text-md fw-bold color-blue hover_link">{{
                                scope.row.name }}</span></p>
                        <div class="d-flex gap-3 align-items-center mt-2">
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
                        </el-icon> {{ scope.row.like }}</span>
                    <span><el-icon>
                            <ChatRound />
                        </el-icon>{{ scope.row.comment }}</span>
                </p>
            </template>
        </el-table-column>

        <!-- Cột 3: Ngày đăng -->
        <el-table-column label="Tương tác gần nhất" prop="publishDate">
            <template #default="scope">
                <div class="closest-interaction justify-content-between d-flex align-items-center gap-1">
                    <div>
                        <p class="text-md color-blue">{{ scope.row.closestInteraction.date }}</p>
                        <p class="text-sm">{{ scope.row.closestInteraction.name }}</p>
                    </div>
                    <el-tooltip popper-class="custom-tooltip" placement="left-start">
                        <template #content>
                            <UserInfoCard :idUserComment="scope.row.closestInteraction.user_id" />
                        </template>
                        <img style="max-width: 40px; height: 40px;" :src="scope.row.closestInteraction.avatarImg"
                            alt="">
                    </el-tooltip>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="500">
        <CreatePostForum />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CreatePostForum from './CreatePostForum.vue';
import { getPostForumByTopic } from '@/api/forum';
import UserInfoCard from './UserInfoCard.vue';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const dialogVisible = ref(false)
const listPostTopic = ref([])
interface Item {
    topicTitle: string,
    postId: number,
    name: string
    author: string,
    time: string,
    like: number,
    comment: number,
    avatarImg: string,
    closestInteraction: object,
}

const tableData = ref<Item[]>([
    {
        topicTitle: null,
        postId: null,
        avatarImg: new URL('@/assets/image/avatar-author-post2.png', import.meta.url).href,
        name: 'Đại Đạo Triều Thiên - Lý Miêu Nị cùng Cửu Bảo Trân',
        author: "Đông Văn",
        time: '21 giờ trước',
        like: null,
        comment: 67,
        closestInteraction:
            { avatarImg: new URL('@/assets/image/avatar-author-post.png', import.meta.url).href, name: 'khanhbao3tt', date: '22/03/2025', user_id: null }
    },

])
async function getAllPostByTopic() {
    const res = await getPostForumByTopic(route.params.id);
    listPostTopic.value = res.data;
    tableData.value = listPostTopic.value.map(post => ({
        topicTitle: post.topic_title,
        postId: post.post_id,
        avatarImg: post.link_thumbnail, // tạm thời fix cứng, hoặc lấy từ user table
        name: post.title,
        author: post.username,  // chỗ này có thể thay bằng username nếu backend trả về
        time: "21 giờ trước", // cần xử lý từ created_at nếu backend có
        like: post.total_likes, // nếu backend có trường view thì gán trực tiếp
        comment: post.total_comments, // hoặc số comment thực tế nếu có
        closestInteraction: {
            avatarImg: post.latest_comment ? convertJsonData(post.latest_comment).link_thumbnail : null,
            name: post.latest_comment ? convertJsonData(post.latest_comment).username : "Chưa có tương tác",
            date: post.latest_comment ? convertJsonData(post.latest_comment).created_at.split(" ")[0] : null,
            user_id: post.latest_comment ? convertJsonData(post.latest_comment).user_id : null,
        }
    }));
}
onMounted(async () => {
    await getAllPostByTopic();
})
function goToPost(postId) {
    router.push({
        name: "post-detail",  // name của route đã định nghĩa trong router/index.js
        params: { id: postId }
    });


}
function convertJsonData(data) {
    return JSON.parse(data)
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
<style>
.custom-tooltip {
    font-size: 13px;
    border-radius: 8px !important;
    border: none !important;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-tooltip .el-popper__arrow::before {
    background: #f7f6f2 !important;
    border: solid 1px #f7f6f2 !important;
}
.hover_link:hover
{
    cursor: pointer;
    color: #ff6114;
}
</style>