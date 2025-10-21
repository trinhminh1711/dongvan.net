<template>
  <div class="container">
    <div class="mt-2">
      <h2 class="mb-3">Quản lý bài viết</h2>
      <!-- Thanh tìm kiếm toàn bảng -->
      <el-table ref="tableRef" :data="paginatedData" style="width: 100%">
        <el-table-column prop="post_id" label="ID" width="50" />
        <el-table-column prop="title" label="Tiêu đề" width="350" />
        <el-table-column prop="topic_title" label="Chủ đề" width="140" />
        <el-table-column prop="username" label="Tác giả" width="150" />
        <el-table-column prop="created_at" label="Ngày tạo" width="150">
          <template #default="scope">
            {{
              formatDateVN(scope.row.created_at)
            }}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="Trạng thái" width="130" :filters="[
          { text: 'Đã duyệt', value: 'published' },
          { text: 'Lưu nháp', value: 'draft' },
        ]" :filter-method="filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'published' ? 'primary' : 'success'" disable-transitions>
              {{ scope.row.status
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <span class="table-header">Trạng thái</span>
          </template>
          <template #default="scope">
            <el-select :model-value="scope.row.status" placeholder="Chọn trạng thái" size="small" style="width: 100px"
              @change="(newStatus) => handleStatusChange(scope.row, newStatus)">
              <el-option label="Duyệt bài" value="published" />
              <el-option label="Lưu nháp" value="draft" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :page-size="pageSize"
          v-model:current-page="currentPage" />
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" width="800px">
    <div class="px-3">
      <h2 class="fw-bold">Xác nhận thay đổi</h2>
      <p>Bạn có chắc muốn đổi trạng thái bài viết
        <strong>{{ postSelected?.title }}</strong>
        từ
        <strong>{{ postSelected?.status }}</strong>
        sang
        <strong>{{ statusSelected }}</strong>
        không?
      </p>
      <p class="mt-4">Nội dung bài viết:</p>
      <p class="scroll-box" v-html="postSelected?.content" style="line-height: 2;"></p>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">Hủy</el-button>
      <el-button type="primary" @click="confirmChangre">Xác nhận</el-button>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { genFileId } from 'element-plus'
import { updateStoryStatus } from '@/api/admin'
import { getAllPublishedStories } from '@/api/admin'
import { updatePostStatus } from '@/api/forum'
import { toast } from 'vue3-toastify';
import { getAllPostAdmin } from '@/api/forum';
interface Post {
  post_id: number
  username: string
  title: string
  topic_title: string
  content: string
  status: string
  created_at: string
}
const currentPage = ref(1);
const pageSize = ref(10); // số phần tử mỗi trang
const tableData = ref<Post[]>([])
const search = ref()
const postSelected = ref()
const statusSelected = ref()
const dialogVisible = ref(false)
const filterTag = (value: string, row: Post) => {
  return row.status === value
}
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});
async function fetchData() {
  const res = await getAllPostAdmin();
  tableData.value = res.data
  console.log(tableData.value);
}
function handleStatusChange(row, newStatus) {
  postSelected.value = row
  statusSelected.value = newStatus
  dialogVisible.value = true
}
async function confirmChangre() {
  const res = await updatePostStatus(postSelected.value.post_id, statusSelected.value);
  if (res.success) {
    toast.success(res.message)
  }
  else {
    toast.error(res.message)
  }
  dialogVisible.value = false
  fetchData()

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
  fetchData()
})


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
.scroll-box {
  max-height: 300px;
  /* chiều cao tối đa */
  overflow-y: auto;
  /* cho phép cuộn dọc */
  overflow-x: hidden;
  /* ẩn cuộn ngang nếu có */
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

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
