<template>
    <div class="form-container">
        <h3 class="text-xlg color-alert fw-bold"><img  style="width: 20px; margin-right: 10px;" src="@/assets/icon/user.png" alt="">Gửi yêu cầu hỗ trợ</h3>
        <p class="mb-4 mt-2">Vui lòng mô tả chi tiết vấn đề bạn gặp phải để chúng tôi hỗ trợ tốt nhất.</p>
        <el-form class="contact-form" :rules="rules" label-position="top" ref="formRef">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Họ tên" prop="name">
                        <el-input v-model="form.name" placeholder="Nhập họ tên"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="form.email" placeholder="Nhập email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tiêu đề" prop="title">
                        <el-input v-model="form.title" placeholder="Nhập tiêu đề"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="Loại vấn đề" prop="issue">
                        <el-select v-model="form.issue" placeholder="Chọn loại vấn đề">
                            <el-option label="Yêu cầu quảng cáo truyện" value="tech" />
                            <el-option label="Yêu cầu làm poster riêng cho truyện" value="payment" />
                            <el-option label="Yêu cầu bật thu phí cho truyện" value="payment" />
                            <el-option label="Khác" value="other" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="Mô tả chi tiết" prop="description">
                <el-input v-model="form.description" type="textarea" :rows="4" placeholder="Nhập mô tả chi tiết" />
            </el-form-item>
            <div class="upload-file my-3">
                <div class=" d-flex gap-2">
                    <el-upload class="upload-demo" action="#" :limit="1" :auto-upload="false" accept=".jpg,.png,.pdf"
                        v-model:file-list="fileList">
                        <button type="primary">Chọn tệp</button>
                    </el-upload>
                    <!-- Text khi chưa có file -->
                    <p v-if="fileList.length === 0" style="margin-top:8px; color:#888;">
                        Chưa có tệp nào được chọn
                    </p>
                </div>
                <p>Hỗ trợ định dạng: <span class="border rounded-2 p-1">.jpg, .png, .pdf</span> tối đa 5MB</p>
            </div>
            <button type="button" style="width: 100%;"
                class="btn-alert mt-5 py-3 font-lg d-flex align-items-center justify-content-center gap-2"
                @click="submitForm">
                <img style="width: 20px;" src="@/assets/icon/send.png" alt=""></img> <span
                    class="text-md fw-semiboldr">Gửi
                    yêu cầu hỗ trợ</span>
            </button>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from "vue"

const formRef = ref()
const form = ref({
    name: "",
    email: "",
    title: "",
    issue: "",
    description: "",
})
const fileList = ref([])

const rules = {
    name: [{ required: true, message: "Vui lòng nhập họ tên", trigger: "blur" }],
    email: [
        { required: true, message: "Vui lòng nhập email", trigger: "blur" },
        { type: "email", message: "Email không hợp lệ", trigger: "blur" },
    ],
    title: [{ required: true, message: "Vui lòng nhập tiêu đề", trigger: "blur" }],
    issue: [{ required: true, message: "Vui lòng chọn loại vấn đề", trigger: "change" }],
    description: [{ required: true, message: "Vui lòng nhập mô tả", trigger: "blur" }],
}

const submitForm = () => {
    console.log("abc");
    
    formRef.value.validate((valid) => {
        if (valid) {
            alert("Form hợp lệ, gửi thành công!")
            console.log("Dữ liệu form:", form.value)
        } else {
            console.log("Form chưa hợp lệ")
            return false
        }
    })
}
</script>
<style>
.contact-form .el-form-item--label-top .el-form-item__label {
    font-weight: bold;
    color: #344054;
    margin: 0 0 5px 0;
}

.upload-file button {
    background: none;
    border: solid 1px #AEAEAE;
    border-radius: 20px;
    color: #344054;
    font-weight: 700;
    padding: 7px 17px
}

</style>