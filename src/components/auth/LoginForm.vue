<template>
    <el-form ref="ruleFormRef" style="max-width: 800px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="Email" type="text" autocomplete="off">
                <template #prefix>
                    <el-icon style="color:black">
                        <User />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="Mật khẩu" type="password" autocomplete="off">
                <template #prefix>
                    <el-icon style="color:black">
                        <Key />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="d-block" prop="type">
            <el-row justify="space-between" align="middle">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox value="Online activities" name="type">
                        Nhớ tài khoản
                    </el-checkbox>
                </el-checkbox-group>
                <el-link type="primary" :underline="false">Quên mật khẩu</el-link>
            </el-row>
        </el-form-item>
        <el-button class="btn-login" type="primary" @click="submitForm(ruleFormRef)">
            Đăng nhập
        </el-button>
        <el-button class="btn-login-google" @click="handleGoogleLogin">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google"
                style="width: 20px; margin-right: 8px;">
            Đăng nhập với Google
        </el-button>

    </el-form>
</template>

<script lang="ts" setup>
declare const google: any;
import { reactive, ref } from 'vue'
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify"
import type { FormInstance, FormRules } from 'element-plus'
import authService from "@/api/authService";
const ruleFormRef = ref<FormInstance>()
const router = useRouter();
const auth = useAuthStore();

const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập tên đăng nhập'))
    }
    callback()

}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập mật khẩu'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    email: '',
    password: '',
})
const handleGoogleLogin = () => {
    /* global google */
    google.accounts.id.initialize({
        client_id: "1048571701439-un9b90ipid7e36p1nl4vc15pk5aeo6kg.apps.googleusercontent.com", // 🔹 Thay bằng client ID bạn lấy ở Google Cloud
        callback: handleCredentialResponse,
        ux_mode: "popup"
    });

    google.accounts.id.prompt(); // hiển thị popup chọn tài khoản Google
};

const handleCredentialResponse = async (response: any) => {
     console.log("Google response:", response); 
    try {
        // response.credential là token JWT của Google
        const res = await authService.loginGoogle({ credential: response.credential });

        auth.setAuth(res.data.token, res.data.user.user_id);
        await auth.fetchProfile();

        toast.success("Đăng nhập bằng Google thành công!");
        router.push({ name: "Home" });
    } catch (error) {
        toast.error("Đăng nhập Google thất bại!");
    }
};
const rules = reactive<FormRules<typeof ruleForm>>({
    email: [
        { required: true, message: 'Email không được để trống', trigger: 'blur' },
        {
            type: 'email',
            message: 'Email không hợp lệ',
            trigger: ['blur', 'change']
        }
    ],
    password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            handleLogin()
        } else {
            console.log('error submit!')
        }
    })
}
const handleLogin = async () => {
    try {
        const res = await authService.login(
            {
                email: ruleForm.email,
                password: ruleForm.password
            })

        // Lưu token + userId vào store (và localStorage)
        auth.setAuth(res.data.token, res.data.user.user_id);
        // fetch lại user info
        await auth.fetchProfile();
        toast.loading("Đang xử lý...");
        setTimeout(() => {
            router.push({ name: "Home" }).then(() => {
                window.location.reload(); // reload sau khi điều hướng
            });
        }, 2000); // đợi toast chạy xong
    } catch (err) {
        toast.error(err.response.data.error);

    }
};
</script>
<style>
.btn-login {
    background-color: red;
    width: 100%;
}

.d-block {
    display: block;
}

.d-block .el-form-item__content {
    display: block;
}
</style>