<template>
    <div class="container">
        <div class="mt-2">
            <h2 class="mb-3">Quản lý truyện</h2>
            <!-- Thanh tìm kiếm toàn bảng -->
            <div class="d-flex justify-content-between">
                <el-input v-model="search" placeholder="Tìm kiếm truyện" clearable
                    style="width: 300px; margin-bottom: 15px"><template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>

            </div>
            <el-table class="story-table" :data="paginatedData" style="width: 100%" :fit="true">
                <el-table-column type="index" label="STT" width="80" />
                <el-table-column prop="title" width="300">
                    <template #header>
                        <span class="table-header">Tên truyện</span>
                    </template>
                    <template #default="scope">
                        <div @click="viewStoryDetail(scope.row)" class="d-flex align-items-center gap-2">
                            <img class="story-thumnail" :src="scope.row.urlImg" alt="">
                            {{ scope.row.title}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="last_chapter_id">
                    <template #header>
                        <span class="table-header">Số chương đã đăng</span>
                    </template>
                    <template #default="scope">
                        {{ scope.row.last_chap_number ?? 1 }} Chương
                    </template>
                </el-table-column>
                <el-table-column prop="last_chapter_id">
                    <template #header>
                        <span class="table-header">Tác giả</span>
                    </template>
                    <template #default="scope">
                        {{ scope.row.author_name }}
                    </template>
                </el-table-column>
                <el-table-column label="Date" prop="create_at">
                    <template #header>
                        <span class="table-header">Ngày tháng đăng</span>
                    </template>
                    <template #default="scope">
                        {{ formatDateVN(scope.row.create_at) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" width="250">
                    <template #header>
                        <span class="table-header">Trạng thái</span>
                    </template>
                    <template #default="scope">
                        <el-select :model-value="scope.row.status" placeholder="Chọn trạng thái" size="small"
                            style="width: 140px" @change="(newStatus) => handleStatusChange(scope.row, newStatus)">
                            <el-option label="Bản nháp" value="draft" />
                            <el-option label="Chờ duyệt" value="pending" />
                            <el-option label="Xuất bản" value="published" />
                            <el-option label="Xóa bài viết" value="denied" />
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex; justify-content: center;" class="mt-4 d-flex">
                <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="tableData.length"
                    v-model:current-page="currentPage" />
            </div>

        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="Xác nhận thay đổi" width="400px">
        <p>Bạn có chắc muốn đổi trạng thái truyện
            <strong>{{ storySelected?.title }}</strong>
            từ
            <strong>{{ storySelected?.status }}</strong>
            sang
            <strong>{{ statusSelected }}</strong>
            không?
        </p>

        <template #footer>
            <el-button @click="dialogVisible = false">Hủy</el-button>
            <el-button type="primary" @click="confirmChange">Xác nhận</el-button>
        </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from "vue-router"
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { getStory } from "@/api/stories"
import { getStoryFullInfo } from '@/api/stories'
import { updateStoryStatus } from '@/api/admin'
import { getAllPublishedStories } from '@/api/admin'
import { useAuthStore } from "@/stores/auth";
import { toast } from 'vue3-toastify';
const auth = useAuthStore();
const router = useRouter()
const tableData = ref<Story[]>([])
const upload = ref<UploadInstance>()
interface Story {
    story_id: Number,
    urlImg: String
    create_at: string
    title: string
    author: string
    last_chapter_id: Number
    total_word_count: Number
    total_view_count: Number

}
const form = ref({
    name: '',
    category: '',
    description: '',
})
const viewStory = ref(false)
const options = [
    { value: 1, label: 'Tất cả' },
    { value: 2, label: 'Đang chờ duyệt' },
    { value: 3, label: 'Đã xuất bản' },
]
const dialogVisible = ref(false)
const openDialogListChapter = ref(false)
const storySelected = ref(null)
const statusSelected = ref('')
const originalStatus = ref('')
const filterStoryData = ref(options[0].value)
const dataTableStoryChapter = ref([])
const search = ref('')
const currentPage = ref(1)
const pageSize = ref(10) // mỗi trang hiển thị 5 phần tử
function getStatusText(status) {
    switch (status) {
        case 'draft':
            return 'Bản nháp'
        case 'pending':
            return 'Chờ duyệt'
        case 'published':
            return 'Đã đăng'
        default:
            return 'Không xác định'
    }
}
function viewStoryDetail(story) {
    console.log(story);
    
}
function getStatusClass(status) {
    return {
        'status-draft': status === 'draft',
        'status-pending': status === 'pending',
        'status-published': status === 'published'
    }
}


// Khi người dùng chọn dropdown
function handleStatusChange(row, newStatus) {
    storySelected.value = row
    statusSelected.value = newStatus
    dialogVisible.value = true
}
async function confirmChange() {
    storySelected.value.status = statusSelected.value
    const res = await updateStoryStatus(storySelected.value.story_id, statusSelected.value)
    if (res.success) {
        toast.success(res.message)
    }
    else {
        toast.error(res.message)
    }
    dialogVisible.value = false
    fetchListStory()
}
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
}
async function fetchListStory() {
    const res = await getAllPublishedStories()
    const order = { published: 1, pending: 2, draft: 3 }
    tableData.value = res.data.sort((a, b) => {
        return (order[a.status] || 99) - (order[b.status] || 99)
    })

}
onMounted(async () => {
    fetchListStory()
})

function handleSelectStoryStatus() {
    currentPage.value = 1 // quay lại trang đầu mỗi khi đổi filter
}
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return tableData.value.slice(start, end)
})

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

</script>
<style>
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
<style scoped>
.status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 13px;
    text-transform: capitalize;
}

.status-draft {
    background-color: #FC5511;
    color: #fff;
}

.status-pending {
    background-color: #535cff;
    color: #fff;
}

.status-published {
    background-color: #009635;
    color: #fff
}
</style>
