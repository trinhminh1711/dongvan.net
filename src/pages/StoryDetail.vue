<template>
    <div class="container py-4">
        <div class="row">
            <div v-if="loading">
                <p>Đang tải dữ liệu...</p>
            </div>
            <!-- Cột ảnh bìa -->
            <div v-if="!loading" class="col-md-4 text-center">
                <img :src="storyData.urlImg" fit="cover" style="width: 70%; border-radius: 12px;" />
            </div>

            <!-- Cột nội dung -->
            <div v-if="!loading" class="col-md-8">
                <!-- Tiêu đề + rating -->
                <h3 class="fw-bold">{{ storyData.story_title }}</h3>
                <div class="d-flex align-items-center mb-3">
                    <el-rate v-model="rating" disabled show-score text-color="#ff9900" />
                    <span class="ms-3 text-muted">0 đánh giá</span>
                </div>

                <!-- Tag -->
                <div class="mb-3">
                    <el-tag class="top-view" type="danger"><span>#2</span><span>Top đọc nhiều trong
                            tháng</span></el-tag>
                </div>

                <!-- Thông tin khác -->
                <div class="el-descriptions-storyinfo">
                    <el-descriptions label-width="150px" :column="4" direction="vertical" size="small" class="mb-3">
                        <el-descriptions-item label="Tác giả"><span class="fw-bold">{{ storyData.author_name
                                }}</span></el-descriptions-item>
                        <el-descriptions-item label="Thể loại"><span class="fw-bold">Ngôn
                                tình</span></el-descriptions-item>
                        <el-descriptions-item label="Trạng thái"><span class="fw-bold">Hoàn
                                thành</span></el-descriptions-item>
                        <el-descriptions-item label="Gói cước"><span class="fw-bold">Miễn
                                phí</span></el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="el-descriptions-storyinfo border-top border-bottom border-opacity-50 pt-3">
                    <el-descriptions label-width="120px" :column="4" direction="vertical" size="small" class="mb-3">
                        <el-descriptions-item><span class="fw-bold">{{ fullStoryData.data.length }}
                                chương</span></el-descriptions-item>
                        <el-descriptions-item><span class="fw-bold">{{ storyData.total_view }} lượt
                                đọc</span></el-descriptions-item>
                        <el-descriptions-item><span class="fw-bold">357 đề cử</span></el-descriptions-item>
                    </el-descriptions>
                </div>
                <!-- Nút hành động -->
                <div class="my-4 d-flex gap-3">
                    <div class="btn-option d-flex align-items-center gap-2">
                        <img src="@/assets/icon/coin2.png" alt="">Đề cử
                    </div>
                    <div class="btn-option d-flex align-items-center gap-2">
                        <img src="@/assets/icon/hearth.png" alt="">
                        Yêu thích
                    </div>
                    <div class="btn-option d-flex align-items-center gap-2"><img src="@/assets/icon/start.png"
                            alt="">Đánh giá</div>
                    <div class="btn-option d-flex align-items-center gap-2"><img src="@/assets/icon/present.png"
                            alt="">Tặng quà</div>
                </div>
                <div>
                    <button @click="goReadChap(1)" class="btn-alert  d-flex align-items-center"> <img
                            src="@/assets/icon/book.png" alt=""><span class="fw-bold"> Đọc truyện ngay</span></button>
                </div>
                <!-- Mô tả -->
                <p class="text-secondary mt-5">{{ storyData.description }}
                    <el-link type="primary">Xem thêm</el-link>
                </p>
                <div class="mt-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="fw-bold">Danh sách chương ( {{ fullStoryData.data.length }})</h3>
                        <el-select v-model="sort" placeholder="Sắp xếp" size="small" style="width: 150px">
                            <el-option label="Mới nhất" value="desc" />
                            <el-option label="Cũ nhất" value="asc" />
                        </el-select>
                    </div>
                    <div>
                        <el-table :data="chapters" style="width: 100%">
                            <el-table-column min-width="200">
                                <template #default="scope">
                                    <p><span class="fw-semibold">Chương {{ scope.row.chap_number }}</span> : {{
                                        scope.row.chapter_title }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="100">
                                <template #default="scope">
                                    <p class="fw-semibold">{{ scope.row.word_count }} chữ</p>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template  #default="scope">
                                    <button @click="goReadChap(scope.row.chap_number)" style="padding: 10px 15px;"
                                        class="btn-alert d-flex align-items-center fw-bold"> Đọc ngay</button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="d-flex justify-content-end mt-3"> <el-pagination layout="prev, pager, next"
                                :total="50" /></div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <div class="container">
        <h3 class="fw-bold">Độc giả nói gì về “Âm mưu tình yêu của tôi”</h3>
        <el-tabs class="mt-3" v-model="activeName">
            <el-tab-pane label="User" name="first">
                <template #label>
                    <span class="custom-tab">
                        <i class="el-icon-star-on"></i>
                        Bình luận
                    </span>
                </template>
                <Comment :story_id="route.params.id" />
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">
                <template #label>
                    <span class="custom-tab">
                        <i class="el-icon-star-on"></i>
                        Đánh giá & nhận xét
                    </span>
                </template>
                <ReviewStory />
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script setup>
import Comment from "@/components/story-detail/Comment.vue"
import ReviewStory from "@/components/story-detail/ReviewStory.vue"
import { ref, onMounted } from "vue"
import { getStoryFullInfo } from "@/api/stories";
import { useRoute, useRouter } from "vue-router";
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const storyData = ref(null);
const fullStoryData = ref(null);
const rating = ref(4.6)
const sort = ref("desc")
const activeName = "first"
const chapters = ref([
    { title: "Tập 46 - Chương 24: Ngoại truyện", words: "839 chữ" },
    { title: "Tập 46 - Chương 23: Ngoại truyện", words: "819 chữ" },
    { title: "Tập 46 - Chương 22: Ngoại truyện", words: "750 chữ" },
    { title: "Tập 46 - Chương 21: Ngoại truyện", words: "740 chữ" },
    { title: "Tập 46 - Chương 20: Ngoại truyện", words: "833 chữ" }
])
function goReadChap(chapNumber) {
    router.push({
        name: "chap-detail",
        params: {
            id: route.params.id,
            chapId: chapNumber
        }
    });
}
async function getData() {
    const id = route.params.id; // lấy id từ param
    try {
        const res = await getStoryFullInfo(id);
        fullStoryData.value = res
        storyData.value = res.data[0]
        chapters.value = (fullStoryData.value.data);

        loading.value = false;

    } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
    }
}
onMounted(async () => {
    await getData();
});
</script>
<style>
.el-descriptions-storyinfo .el-descriptions__table {
    width: auto;
}
</style>
<style scoped>
.btn-option {
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: 700;
    font-size: 12px;
    border: solid 1px #e7e9eb;
}

.btn-option img {
    max-width: 20px;
}

.el-tag {
    border-radius: 20px;
    font-weight: bold;
}

.top-view span {
    font-weight: 600;
}

.top-view span:first-child {
    color: #fff;
    border-radius: 15px;
    background: #E60000;
    padding: 5px 10px;
    margin-right: 20px;

}

.top-view {
    border: none;
    padding: 20px;
    color: #BF2C24;
}
</style>
