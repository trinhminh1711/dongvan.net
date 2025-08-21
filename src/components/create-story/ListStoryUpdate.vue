<template>
    <div class="mt-5">
        <!-- Thanh tìm kiếm toàn bảng -->
        <div class="d-flex justify-content-between">
            <el-input v-model="search" placeholder="Tìm kiếm truyện" clearable
                style="width: 300px; margin-bottom: 15px"><template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-select v-model="filterStoryData" placeholder="Chọn một mục" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <el-table class="story-table" :data="filterTableData" style="width: 100%" :fit="true">
            <el-table-column prop="name">
                <template #header>
                    <span class="table-header">Tên truyện</span>
                </template>
                <template #default="scope">
                    <div class="d-flex align-items-center gap-2">
                        <img class="story-thumnail" :src="scope.row.thumnailImg" alt="">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="chapNumber">
                <template #header>
                    <span class="table-header">Số chương</span>
                </template>
                <template #default="scope">
                    {{ scope.row.chapNumber }} Chương
                </template>
            </el-table-column>
            <el-table-column label="Date" prop="createAt">
                <template #header>
                    <span class="table-header">Ngày tháng đăng</span>
                </template>
            </el-table-column>
            <el-table-column align="center">
                <template #default="scope">
                    <el-button @click="handleAdd(scope.$index, scope.row)">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-button>
                    <el-button @click="handleEdit(scope.$index, scope.row)"><el-icon>
                            <Finished />
                        </el-icon></el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)"><el-icon>
                            <Edit />
                        </el-icon></el-button>
                    <el-button @click="handleSupport(scope.$index, scope.row)"><el-icon>
                            <ChatLineRound />
                        </el-icon></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: center;" class="mt-4 d-flex">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
                :total="tableData.length" layout=" prev, pager, next" />
        </div>
        <el-dialog v-model="dialogVisible" width="500">
            <span class="text-color_primary fw-bold">Gửi yêu cầu hỗ trợ</span>
            <p class="text-sm mt-2">Trước khi gửi câu hỏi, vui lòng đọc hết mục Hướng dẫn, nếu bạn vẫn không tìm thấy
                câu trả
                lời,
                hãy gửi
                câu hỏi
                cho chúng tôi.</p>
            <el-form label-position="top" class="mt-3">
                <!-- Input 1: Text -->
                <el-form-item label="Liên quan đến truyện">
                    <el-input v-model="form.name" />
                </el-form-item>

                <!-- Input 2: Select -->
                <el-form-item label="Vấn đề cần hỗ trợ">
                    <el-select v-model="form.category" placeholder="Chọn danh mục" style="width: 100%;">
                        <el-option label="Yêu cầu quảng cáo truyện" value="1" />
                        <el-option label="Yêu cầu làm poster riêng cho truyện" value="2" />
                        <el-option label="Yêu cầu bật thu phí" value="3" />
                        <el-option label="Vấn đề khác" value="4" />
                    </el-select>
                </el-form-item>

                <!-- Input 3: Textarea -->
                <el-form-item label="Mô tả chi tiết">
                    <el-input type="textarea" v-model="form.description" placeholder="Nhập mô tả" :rows="4" />
                </el-form-item>
                <el-upload ref="upload" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                    :on-exceed="handleExceed" :auto-upload="false">
                    <template #trigger>
                        <p class="text-color_primary fw-bold"><el-icon>
                                <Paperclip />
                            </el-icon> Đính kèm tệp (tối đa 3)</p>
                    </template>
                </el-upload>
                <div v-if="form.category === '3'" class="note">
                    <p class="text-sm color-light-blue">Bạn chỉ đủ điều kiện bật thu phí cho truyện nếu:</p>
                    <ul class="text-sm color-light-blue">
                        <li>Tác phẩm đó phải có trên 15.000 chữ.</li>
                        <li>Đã đăng ít nhất 10 chương.</li>
                        <li>Đạt tối thiểu 1.000 lượt đọc hợp lệ.</li>
                    </ul>
                </div>
                <div class="mt-4">
                    <button style="border-radius: 5px; width: 100%;" class="btn-alert fw-bold py-3" type="button">Gửi
                        yêu
                        cầu</button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { genFileId } from 'element-plus'

import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()
interface Story {
    thumnailImg: String
    createAt: string
    name: string
    chapNumber: Number
}
const form = ref({
    name: '',
    category: '',
    description: '',
})
const options = [
    { value: '1', label: 'Tất cả' },
    { value: '2', label: 'Đang chờ duyệt' },
    { value: '3', label: 'Đã xuất bản' },
]
const dialogVisible = ref(false)
const filterStoryData = ref(options[0].value)
const search = ref('')
const currentPage = ref(1)
const pageSize = ref(5)

const tableData: Story[] = [
    { thumnailImg: new URL("@/assets/image/story-update1.png", import.meta.url).href, name: 'Hoà Lạc Thiên Không', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update2.png", import.meta.url).href, name: 'Thiên Hạ Vô Song', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update3.png", import.meta.url).href, name: 'Yêu Em Từ Cái Nhìn Đầu Tiên', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update4.png", import.meta.url).href, name: 'Hậu Cung Như Ý Truyện', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update5.png", import.meta.url).href, name: 'Phá Quân Tinh Ký', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update4.png", import.meta.url).href, name: 'Đấu La Đại Lục', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update3.png", import.meta.url).href, name: 'Sổ Tay Nuôi Dưỡng Hắc Liên Hoa', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update5.png", import.meta.url).href, name: 'Hoà Lạc Thiên Không', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update2.png", import.meta.url).href, name: 'Yêu Em Từ Cái Nhìn Đầu Tiê', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
    { thumnailImg: new URL("@/assets/image/story-update1.png", import.meta.url).href, name: 'Yêu Em Từ Cái Nhìn Đầu Tiê', chapNumber: 22, createAt: '22/03/2025 11:52:46' },
]


const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
}

const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

function handleAdd(index: number, row: Story) {
    console.log('Thêm:', index, row)
}

function handleEdit(index: number, row: Story) {
    console.log('Sửa:', index, row)
}

function handleDelete(index: number, row: Story) {
    console.log('Xóa:', index, row)
}

function handleSupport(index: number, row: Story) {
    dialogVisible.value = true;
    console.log(row.name);
    form.value.name = row.name

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
</style>
