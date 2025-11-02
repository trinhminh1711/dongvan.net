<template>
    <div class="mt-4">
        <div v-if="dataTableStoryChapter">
            <el-table v-if="(dataTableStoryChapter[0]?.chap_number)" class="story-table" :data="dataTableStoryChapter" style="width: 100%" :fit="true">
                <el-table-column type="index" label="STT" width="80">
                </el-table-column>
                <el-table-column prop="title" width="450">
                    <template #header>
                        <span class="table-header">Tên chương</span>
                    </template>
                    <template #default="scope">
                        <div class="d-flex align-items-center gap-2">
                            {{ scope.row.chapter_title }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Date" prop="create_at">
                    <template #header>
                        <span class="table-header">Thời gian đăng</span>
                    </template>
                    <template #default="scope">
                        {{ formatDateVN(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="last_chapter_id">
                    <template #header>
                        <span class="table-header">Số từ</span>
                    </template>
                    <template #default="scope">
                        {{ scope.row.word_count }}
                    </template>
                </el-table-column>
                <el-table-column prop="last_chapter_id">
                    <template #header>
                        <span class="table-header">Lượt đọc</span>
                    </template>
                    <template #default="scope">
                        {{ scope.row.total_reads }}
                    </template>
                </el-table-column>
            </el-table>

            <div v-if="!(dataTableStoryChapter[0]?.chap_number)">
                <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                <p style="text-align: center;">{{ 'Không có dữ liệu' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { getStoryFullInfo } from '@/api/stories'
import { useRoute } from 'vue-router';

const route = useRoute();

// Lấy giá trị param
const storyId = route.params.id;
const dataTableStoryChapter = ref([])
interface Story {
    story_id: Number,
    urlImg: String
    create_at: string
    title: string
    last_chapter_id: Number
    total_word_count: Number
    total_view_count: Number
}
async function handleOpenListChapter() {
    const res = await getStoryFullInfo(storyId)
    dataTableStoryChapter.value = res.data
}
function formatDateVN(isoString) {
    const date = new Date(isoString)
    const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000)
    const day = String(vnTime.getDate()).padStart(2, "0")
    const month = String(vnTime.getMonth() + 1).padStart(2, "0")
    const year = vnTime.getFullYear()
    const hours = String(vnTime.getHours()).padStart(2, "0")
    const minutes = String(vnTime.getMinutes()).padStart(2, "0")
    const seconds = String(vnTime.getSeconds()).padStart(2, "0")
    const formatted = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(date)
    return formatted
}
onMounted(() => {
    handleOpenListChapter()
})

</script>

<style scoped>
.story-table .table-header {
    font-weight: 500;
    color: #344054;
}

.story-table .story-thumnail {
    max-width: 50px
}

.story-table {
    border: solid 1px #cfd0d0;
    border-radius: 10px;
    padding-top: 10px;
}

.story-table .el-button,
.el-button.is-round {
    padding: 0;
    border: none;
}

.story-table .el-button span,
.story-table .el-button.is-round span {
    font-weight: bold;
    color: #344054;
    padding: 0 2px;
    font-size: 18px;

}
</style>