<template>
    <div class="container bank-info">
        <el-form label-position="top">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <el-form-item label="Ngân hàng">
                        <el-input class="w-80" v-model="form.name" disabled>
                            <template #suffix>
                                <el-icon :size="25">
                                    <CopyDocument />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="col-md-6 mb-3">
                    <el-form-item label="Số tài khoản">
                        <el-input class="w-80" v-model="form.email" disabled>
                            <template #suffix>
                                <el-icon :size="25">
                                    <CopyDocument />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <el-form-item label="Chủ tài khoản">
                        <el-input class="w-80" v-model="form.phone" disabled>
                            <template #suffix>
                                <el-icon :size="25">
                                    <CopyDocument />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="col-md-6 mb-3">
                    <el-form-item label="Nội dugn chuyển khoản">
                        <el-input class="w-80" v-model="form.address" disabled></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
    <p style="color: #1877F2; font-weight: bold;">Lưu ý quan trọng</p>
    <ul class="payment-note mt-3">

        <li>Vui lòng chuyển khoản đúng nội dung để được xử lý tự động</li>
        <li>Thay [ID_USER] bằng ID tài khoản của bạn (Xem ID ở trang cá nhân hoặc ấn vào avatar
            ở trên cùng bên
            phải)</li>
        <li>Tang Diệp sẽ được cộng vào tài khoản sau 1-5 phút</li>

    </ul>
</template>

<script setup>
import { sendMail } from "@/api/mail";
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";  
const auth = useAuthStore();

const form = reactive({
  name: "Vietcombank",
  email: "123456789",
  phone: "DOAN VAN DUC",
  address: `NAPTIEN [USER${auth.userId}]`
});

const handleSend = async () => {
  try {
    await sendMail({
      to: "mvhdongminhtanvan@gmail.com",
      subject: "Thông báo từ hệ thống",
      text: "Email test",
    });
    alert("Gửi email thành công!");
  } catch (err) {
    console.error(err);
    alert("Gửi email thất bại!");
  }
};
</script>
<style>
.bank-info .el-input__inner {
    font-weight: 700;
    /* đậm chữ */
    font-size: 16px;
    /* có thể chỉnh thêm size */
    color: #344054;
    /* màu chữ */
}

.w-80 .el-input__inner {
    height: 60px;
    /* cố định chiều cao */
}
</style>
<style scoped>
::v-deep(.el-form-item__label) {

    font-size: 16px;
    color: #344054;
}

.payment-note {
    color: #1877F2;
    line-height: 2;
}
</style>