<template>
    <el-form ref="ruleFormRef" style="max-width: 800px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="Tên tài khoản" type="password" autocomplete="off">
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
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

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
    userName: '',
    type: [],
    pass: '',
    password: '',
    age: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    userName: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
    })
}

</script>
<style>
.btn-login {
    background-color: red;
    width: 100%;
}
.d-block
{
    display: block;
}
.d-block .el-form-item__content
{
    display: block;
}

</style>