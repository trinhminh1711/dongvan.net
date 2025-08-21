<template>
    <div class="container">
        <el-form class="form-createstory mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
            <el-form-item prop="categoryStt">
                <template #label>
                    <span class="form-createstory__label">
                        STT
                    </span>
                </template>
                <el-input placeholder="VD: 31" size="large" v-model="ruleForm.categoryStt" />
            </el-form-item>
            <el-form-item prop="categoryNumber">
                <template #label>
                    <span class="form-createstory__label">
                        Chương thứ
                    </span>
                </template>
                <el-input placeholder="VD: 31" size="large" v-model="ruleForm.categoryNumber" />
            </el-form-item>

            <el-form-item prop="categoryNumberBook">
                <template #label>
                    <span class="form-createstory__label">
                        Quyển số
                    </span>
                </template>
                <el-input size="large" placeholder="VD: 1" v-model="ruleForm.categoryNumberBook" />
            </el-form-item>
            <el-form-item prop="categoryNameBook">
                <template #label>
                    <span class="form-createstory__label">
                        Tên quyển
                    </span>
                </template>
                <el-input size="large" placeholder="Link thảo luận forum (nếu có)" v-model="ruleForm.categoryName" />
            </el-form-item>
            <el-form-item prop="categoryName">
                <template #label>
                    <span class="form-createstory__label">
                        Tên chương
                    </span>
                </template>
                <el-input size="large" placeholder="Link thảo luận forum (nếu có)" v-model="ruleForm.categoryName" />
            </el-form-item>
            <el-form-item prop="categoryType">
                <template #label>
                    <span class="form-createstory__label">
                        Hình thức
                    </span>
                </template>
                <el-select-v2 size="large" v-model="ruleForm.categoryType" placeholder="Chọn thể loại"
                    :options="options" />
            </el-form-item>
            <el-form-item class="custom-textarea" prop="categoryDesc">
                <template #label>
                    <span class="form-createstory__label">
                        Nội dung
                    </span>
                </template>
                <EditorUI />
            </el-form-item>
            <el-form-item class="custom-textarea" prop="categoryDesc">
                <template #label>
                    <span class="form-createstory__label">
                        Quảng cáo
                    </span>
                </template>
                <el-mention placeholder="Giới thiệu ngắn" v-model="ruleForm.categoryDesc" type="textarea" />
            </el-form-item>

        </el-form>
        <button style="display: block; margin-left: auto;" class="btn-alert my-4 fw-semibold">Đăng chương</button>
    </div>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import EditorUI from '../text-editor/EditorUI.vue'

interface RuleForm {
    storyName: string,
    storyAuthor: string,
    storyDesc: string,
    storyLinkForum: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    storyName: '',
    storyAuthor: '',
    storyDesc: '',
    storyLinkForum: ''

})
const options = [
    { label: 'Miễn phí', value: 1 },
    { label: 'Chương Vip', value: 2 },
]
const rules = reactive<FormRules<RuleForm>>({
    storyName: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    storyGenre: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
})

</script>
<style></style>