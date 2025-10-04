<template>
    <div class="profile-page container">
        <!-- Header banner -->
        <div class="profile-banner" style="position: relative;">
            <img src="@/assets/image/profile-cover-photo.png" class="w-100 rounded"
                style="height: 200px; object-fit: cover;">
            <!-- Avatar -->
            <div class="d-flex infomation">
                <div class="d-flex infomation_avatar">
                    <div>
                        <img :src="user.link_thumbnail" alt="" srcset="">
                    </div>
                    <div>
                        <h2 class="fw-bold text-color_primary mt-2">{{ user.username }}</h2>
                        <p class="text-secondary">2025{{ user.id }}</p>
                    </div>
                </div>
                <div class="mt-2 pe-3">
                    <button class="btn-outline me-3">Hủy</button>
                    <button class="btn-alert">Lưu thay đổi</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-8">
                <div class="profile-info">
                    <!-- Tabs -->
                    <el-tabs class="tab-diable__line" v-model="activeTab">
                        <el-tab-pane label="Thông tin cá nhân" name="personal">
                            <div class="mt-3">
                                <el-form class="form-infomation" :model="user" label-width="200px">
                                    <el-form-item label="Tên tài khoản">
                                        <el-input v-model="user.username"></el-input>
                                    </el-form-item>

                                    <el-form-item label="Giới tính">
                                        <el-select v-model="user.gender" placeholder="Chọn giới tính">
                                            <el-option label="Nam" value="male"></el-option>
                                            <el-option label="Nữ" value="female"></el-option>
                                            <el-option label="Khác" value="other"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="Ảnh đại diện">
                                        <div class="d-flex edit-avatar">
                                            <img :src="user.link_thumbnail" alt="" srcset="">
                                            <div class="ml-3">
                                                <el-button type="text" @click="changeAvatar">Thay đổi</el-button>
                                                <el-button type="text" @click="removeAvatar">Xóa</el-button>
                                            </div>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="Tiểu sử">
                                        <el-input class="user-description" type="textarea"
                                            v-model="user.user_description"
                                            placeholder="Mô tả một chút về bản thân bạn nhé!" :maxlength="1000"
                                            show-word-limit>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="Cấp độ" name="level">
                            <el-descriptions :column="1" label-width="200px">
                                <el-descriptions-item>
                                    <template #label>
                                        <p class="d-flex align-items-center gap-1 fw-bold">
                                            Cấp độ
                                            <el-icon>
                                                <InfoFilled />
                                            </el-icon>
                                        </p>
                                    </template>
                                    Cấp 1 (Độc giả mới)</el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <p class="d-flex align-items-center gap-1 fw-bold">
                                            Cấp độ tác giả
                                            <el-icon>
                                                <InfoFilled />
                                            </el-icon>
                                        </p>
                                    </template>Chưa có</el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <p class="d-flex align-items-center gap-1 fw-bold">
                                            Số Tang Diệp đang có
                                            <el-icon>
                                                <InfoFilled />
                                            </el-icon>
                                        </p>
                                    </template><span>
                                        {{ user.coin_balance }} <img src="@/assets/icon/tamdiep-icon.png">
                                    </span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-tab-pane>

                        <el-tab-pane label="Tài khoản & Bảo mật" name="account">
                            <el-form :model="otherInfo" label-position="left" label-width="200px"
                                class="form-infomation">
                                <el-form-item label="Email">
                                    <el-input v-model="otherInfo.email" placeholder="Nhập email"></el-input>
                                </el-form-item>

                                <el-form-item label="Số điện thoại">
                                    <el-input v-model="otherInfo.phone" placeholder="Nhập số điện thoại"></el-input>
                                </el-form-item>

                                <el-form-item label="Mật khẩu">
                                    <el-input v-model="otherInfo.password" type="password" show-password
                                        placeholder="Nhập mật khẩu">
                                    </el-input>
                                </el-form-item>
                                <div v-if="changPasswordOpen">
                                    <el-form-item label="Mật khẩu mới">
                                        <el-input v-model="otherInfo.newPassword" type="password" show-password
                                            placeholder="Nhập mật khẩu mới">
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item label="Xác nhận mật khẩu">
                                        <el-input v-model="otherInfo.confirmPassword" type="password" show-password
                                            placeholder="Xác nhận mật khẩu">
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <span @click="changPasswordOpen = !changPasswordOpen" class="text-link">
                                    {{ changPasswordOpen ? "Hủy bỏ" : "Đổi mật khẩu" }}
                                </span>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <!-- User info -->

    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { ElAvatar, ElButton, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus';
import Infomation from '@/components/profile/Infomation.vue';
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const activeTab = ref('personal');
const changPasswordOpen = ref(false)
const user = reactive({
    id: 727457,
    username: "Ngọc Bảo Phạm",
    gender: 'male',
    link_thumbnail: "https://cdn-icons-png.freepik.com/512/3607/3607444.png",
    user_description: ''
});
const otherInfo = reactive({
    email: "admin@gmail.com",
    phone: '0972183635',
    password: '05111993',
    newPassword: '',
    confirmPassword: ''
})
const changeAvatar = () => {
    alert('Chức năng thay đổi avatar');
};

const removeAvatar = () => {
    user.link_thumbnail = '';
};
watch(
    () => auth.user,
    (newUser) => {
        if (newUser) {
            user.id = newUser.user_id;
            user.username = newUser.username;
            user.gender = newUser.gender;
            user.link_thumbnail = newUser.link_thumbnail;
            user.user_description = newUser.user_description;
            user.coin_balance = newUser.coin_balance;
            otherInfo.email = newUser.email,
                otherInfo.phone = newUser.phone_number
        }
    },
    { immediate: true } // chạy luôn lần đầu
);
</script>
<style>
.form-infomation .el-form-item--label-right .el-form-item__label {
    justify-content: flex-start !important;
}

.form-infomation .el-form-item__label {
    font-weight: bold !important;
    color: #344054;

}

.user-description .el-textarea__inner {
    height: 150px;
}

.tab-diable__line .el-tabs__nav-wrap:after,
.tab-diable__line .el-tabs__active-bar {
    display: none !important;
}

.tab-diable__line .el-tabs__item {
    font-weight: 400;
    font-size: 16px;
}

.tab-diable__line .el-tabs__item.is-active {
    color: #BF2C24;
}

.tab-diable__line .el-tabs__item.is-active,
.el-tabs__item:hover {
    color: #BF2C24;
}
</style>
<style scoped>
.profile-info {
    margin-top: -30px;
}

.infomation {
    display: flex;
    justify-content: space-between;
}

.infomation_avatar {
    padding: 0 50px;
    gap: 10px;
}

.edit-avatar {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.edit-avatar img {
    max-width: 70px;
    border-radius: 50%;
}

.infomation_avatar img {
    max-width: 150px;
    border: solid 3px #fff;
    border-radius: 50%;
    position: relative;
    top: -50px;

}
</style>
