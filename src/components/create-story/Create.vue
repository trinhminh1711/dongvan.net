<template>
    <el-form class="form-createstory mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item prop="storyName">
            <template #label>
                <span class="form-createstory__label">
                    Tên truyện
                </span>
            </template>
            <el-input placeholder="Viết hoa chữ đầu mỗi từ" size="large" v-model="ruleForm.storyName" />
        </el-form-item>
        <el-form-item prop="storyAuthor">
            <template #label>
                <span class="form-createstory__label">
                    Tác giả
                </span>
            </template>
            <el-input placeholder="Nhập tên tác giả" size="large" v-model="ruleForm.storyAuthor" />
        </el-form-item>
        <el-form-item prop="storyGenre">
            <template #label>
                <span class="form-createstory__label">
                    Thể loại
                </span>
            </template>
            <el-select-v2 size="large" v-model="ruleForm.storyGenre" placeholder="Chọn thể loại" :options="options" />
        </el-form-item>
        <el-form-item class="custom-textarea" prop="storyDesc">
            <template #label>
                <span class="form-createstory__label">
                    Giới thiệu
                </span>
            </template>
            <el-mention placeholder="Giới thiệu ngắn" v-model="ruleForm.storyDesc" type="textarea" />
        </el-form-item>
        <el-form-item class="list-imageupload">
            <template #label>
                <span class="form-createstory__label">
                    Ảnh bìa
                </span>
            </template>
            <div>
                <div class="d-flex">
                    <el-upload :on-change="handleFileChange" class="upload-demo" action="#" :limit="1"
                        :auto-upload="false" list-type="picture-card" accept=".jpg,.png" v-model:file-list="fileList">
                        <template #trigger>
                            <button v-if="fileList.length === 0" class="btn-selectfile" type="button">Chọn tệp</button>
                        </template>
                    </el-upload>
                    <p v-if="fileList.length === 0" class="ps-2">Chưa có tệp nào được chọn</p>
                    <img :src="dialogImageUrl" class="el-upload-list__item-thumbnail" alt="" />
                </div>
                <div>
                    <p class="mb-3">Hoặc chọn một poster dưới đây</p>
                    <div class="preset-images">
                        <el-carousel :autoplay="false" arrow="always">
                            <el-carousel-item v-for="(carosel, index) in presetImages" :key="index">
                                <img v-for="imgUrl in carosel" :src="imgUrl" class="preset-img mx-2"
                                    :class="{ active: selectedImage === imgUrl }" @click="selectPreset(imgUrl)" />
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                </div>
            </div>
        </el-form-item>
        <el-form-item prop="storyLinkForum">
            <template #label>
                <span class="form-createstory__label">
                    Link Forum
                </span>
            </template>
            <el-input size="large" placeholder="Link thảo luận forum (nếu có)" v-model="ruleForm.storyLinkForum" />
        </el-form-item>
    </el-form>
      <button style="display: block; margin-left: auto;" class="btn-alert my-4 fw-semibold">Đăng truyện</button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    storyName: string,
    storyGenre: string,
    storyAuthor: string,
    storyDesc: string,
    storyLinkForum: string
}
const fileList = ref([])
const dialogImageUrl = ref("")
const selectedImage = ref(null)
const presetImages = {
    slide1: [
        new URL('@/assets/image/image 16.png', import.meta.url).href,
        new URL('@/assets/image/image 17.png', import.meta.url).href,
        new URL('@/assets/image/image 18.png', import.meta.url).href,
        new URL('@/assets/image/image 19.png', import.meta.url).href,
        new URL('@/assets/image/image 23.png', import.meta.url).href,
        new URL('@/assets/image/image 22.png', import.meta.url).href,
    ],
    slide2: [
        new URL('@/assets/image/image 17.png', import.meta.url).href,
        new URL('@/assets/image/image 19.png', import.meta.url).href,
        new URL('@/assets/image/image 16.png', import.meta.url).href,
        new URL('@/assets/image/image 22.png', import.meta.url).href,
        new URL('@/assets/image/image 23.png', import.meta.url).href,
        new URL('@/assets/image/image 18.png', import.meta.url).href,
    ],
}
const options = [
    { label: 'Linh dị', value: 1 },
    { label: 'Trinh thám', value: 2 },
    { label: 'Lịch sử', value: 3 },
    { label: 'Ngôn tình', value: 4 },
    { label: 'Truyện ngắn', value: 5 },
    { label: 'Thơ', value: 6 },
    { label: 'Huyền ảo', value: 7 },
    { label: 'Viễn tưởng', value: 8 },
    { label: 'Cổ đại', value: 9 },
    { label: 'Hiện thực', value: 10 },
    { label: 'Tản văn', value: 11 },

]
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    storyName: '',
    storyGenre: '',
    storyAuthor: '',
    storyDesc: '',
    storyLinkForum: ''

})

const rules = reactive<FormRules<RuleForm>>({
    storyName: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    storyGenre: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
})
const handleFileChange = (file, fileList) => {
    // In ra đường dẫn file tạm
    console.log("Đã chọn file:", file)

}
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const selectPreset = (img) => {
    selectedImage.value = img
    fileList.value = [] // reset upload
    console.log("Chọn ảnh preset:", img)
}
</script>
<style>
.form-createstory .custom-textarea .el-textarea__inner {
    height: 100px;
    line-height: 20px;
    /* canh chữ giữa */
}

.form-createstory .el-form-item__label-wrap {
    text-align: left !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100px;
}

.form-createstory label::before {
    display: none;
}

.form-createstory .form-createstory__label {
    font-weight: 500;
    color: #344054;
}

.btn-selectfile {
    background: none;
    border: solid 1px #AEAEAE;
    border-radius: 20px;
    color: #344054;
    font-weight: 400;
    padding: 7px 17px
}

.form-createstory .el-upload--picture-card {
    border: none;
    background: none;
    height: unset;
    width: unset;
    justify-content: left;
}

.list-imageupload .el-form-item__content {
    width: 100%;
}

.list-imageupload .el-form-item__content>div {
    width: 100%;
}

.list-imageupload .el-carousel__item {
    display: flex;
}

.list-imageupload .el-carousel__item img {

    max-width: 15%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.preset-img.active {
    border: solid 6px #bf2c24;

}

.list-imageupload .el-carousel__arrow {
    background-color: white;
    color: black;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.12),
        /* 👇 cạnh dưới vừa phải */
        0 -2px 4px rgba(0, 0, 0, 0.02),
        /* 👆 trên siêu nhạt */
        2px 0 4px rgba(0, 0, 0, 0.02),
        /* 👉 phải siêu nhạt */
        -2px 0 4px rgba(0, 0, 0, 0.02);
}
</style>