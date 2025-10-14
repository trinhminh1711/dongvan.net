<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-between mt-4">
            <h2>Quản lý người dùng
            </h2>
        </div>
        <div class="mt-4">
            <el-table v-if="tableData.length" :data="tableData" style="width: 100%">
                <el-table-column prop="user_id" label="ID" width="100" />
                <el-table-column prop="created_at" label="Ngày tạo tài khoản" width="180">
                    <template #default="{ row }">
                        {{ formatDate(row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="Bút danh" width="150">
                    <template #default="{ row }">
                        <span>{{ row.username }} </span>
                    </template>
                </el-table-column>

                <!-- Cột direction dùng template -->
                <el-table-column label="Email đăng nhập" width="250">
                    <template #default="{ row }">
                        <span> {{ row.email }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="Số điện thoại" width="180">
                    <template #default="{ row }">
                        <span>{{ row.phone_number ? row.phone_number : 'Chưa đăng ký' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Trạng thái" width="180">
                    <template #default="{ row }">
                        <el-button :type="row.status === 'active' ? 'success' : 'danger'" size="small" plain
                            @click="handleStatusClick(row)">
                            <el-icon style="margin-right: 4px;">
                                <component :is="row.status === 'active' ? 'Unlock' : 'Lock'" />
                            </el-icon>
                            {{ row.status === 'active' ? 'Đang hoạt động' : 'Bị khóa' }}
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div v-if="!tableData.length">
                <img style="display: block; margin: 0 auto;" src="@/assets/icon/nodata.png" />
                <p style="text-align: center;">Không có dữ liệu</p>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px">
            <p>{{ dialogMessage }}</p>

            <template #footer>
                <el-button @click="dialogVisible = false">Hủy</el-button>
                <el-button type="primary" @click="confirmAction">Xác nhận</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
const dialogVisible = ref(false);
const selectedUser = ref(null);
const dialogTitle = ref("");
const dialogMessage = ref("");
import { ref, onMounted } from 'vue'
import { getTransactions, approveTransaction } from '@/api/mail';
import { useAuthStore } from "@/stores/auth";
import { getAllUsers } from '@/api/admin';
import { toast } from 'vue3-toastify';
const currentPage = ref(1);
const unlockUserDialog = ref(0)
const dateRange = ref();
const selectedId = ref()
const auth = useAuthStore();
const tableData = ref([])
const listUser = async () => {
    const res = await getAllUsers();
    console.log(res);

    tableData.value = res

}
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
const handleStatusClick = (row) => {
    selectedUser.value = row;

    if (row.status === "active") {
        dialogTitle.value = "Khóa người dùng";
        dialogMessage.value = `Bạn có chắc muốn khóa tài khoản của ${row.username}?`;
    } else {
        dialogTitle.value = "Mở khóa người dùng";
        dialogMessage.value = `Bạn có chắc muốn mở khóa tài khoản của ${row.username}?`;
    }

    dialogVisible.value = true;
};
const confirmAction = async () => {
    const newStatus = selectedUser.value.status === "active" ? "locked" : "active";

    // Gọi API cập nhật trạng thái
    // await axios.put(`/api/admin/users/${selectedUser.value.user_id}/status`, { status: newStatus });

    // Cập nhật tạm thời trong UI
    selectedUser.value.status = newStatus;

    dialogVisible.value = false;
};
onMounted(() => {
    listUser()
})
</script>

<style scoped></style>
