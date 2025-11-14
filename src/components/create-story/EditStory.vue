<template>
    <div class="container">
        <el-form class="form-createstory mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
            <!-- Tên truyện -->
            <el-form-item prop="storyName">
                <template #label>
                    <span class="form-createstory__label">Tên truyện</span>
                    <el-tooltip :content="'Liên hệ admin để đổi tên truyện '" placement="top">
                        <el-icon>
                            <InfoFilled />
                        </el-icon>
                    </el-tooltip>
                </template>
                <el-input disabled placeholder="Viết hoa chữ đầu mỗi từ" size="large" v-model="ruleForm.storyName" />
            </el-form-item>

            <!-- Tác giả (disabled) -->
            <el-form-item prop="storyAuthor">
                <template #label>
                    <span class="form-createstory__label">Tác giả</span>
                </template>
                <el-input size="large" :value="auth.user.username" disabled />
            </el-form-item>

            <!-- Thể loại -->
            <el-form-item prop="storyGenre">
                <template #label>
                    <span class="form-createstory__label">Thể loại</span>
                </template>
                <el-select-v2 size="large" v-model="ruleForm.storyGenre" placeholder="Chọn thể loại"
                    :options="options" />
            </el-form-item>

            <!-- Giới thiệu -->
            <el-form-item class="custom-textarea" prop="storyDesc">
                <template #label>
                    <span class="form-createstory__label">Giới thiệu</span>
                </template>
                <el-mention
                    placeholder="Phần giới thiệu truyện là ấn tượng đầu tiên mà bạn tạo ra với người đọc – hãy tận dụng cơ hội này để truyền tải nội dung cốt lõi, điểm hấp dẫn và phong cách riêng của bạn. Giới thiệu càng rõ ràng, mạch lạc và thu hút thì càng có nhiều người muốn theo dõi truyện!"
                    v-model="ruleForm.storyDesc" type="textarea" />
            </el-form-item>

            <!-- Ảnh bìa -->
            <el-form-item class="list-imageupload">
                <template #label>
                    <span class="form-createstory__label">Ảnh bìa</span>
                </template>
                <div>
                    <div class="d-flex align-items-end gap-2">
                        <img v-if="fileList.length === 0 && dialogImageUrl" :src="dialogImageUrl"
                            class="el-upload-list__item-thumbnail" alt="" />
                        <el-upload :on-change="handleFileChange" class="upload-demo" action="#" :limit="1"
                            :auto-upload="false" list-type="picture-card" accept=".jpg,.png"
                            v-model:file-list="fileList">
                            <template #trigger>
                                <div>
                                    <button v-if="fileList.length === 0" class="btn-selectfile" type="button">
                                        Chọn tệp
                                    </button>
                                    <p v-if="fileList.length === 0" class="ps-2">
                                        Chọn để thay ảnh bìa khác
                                    </p>
                                </div>
                            </template>
                        </el-upload>
                    </div>

                    <div>
                        <p class="my-3">Hoặc chọn một poster dưới đây</p>
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

            <!-- Link forum -->
            <el-form-item prop="storyLinkForum">
                <template #label>
                    <span class="form-createstory__label">Link Forum</span>
                </template>
                <el-input size="large" placeholder="Link thảo luận forum (nếu có)" v-model="ruleForm.storyLinkForum" />
            </el-form-item>
        </el-form>

        <button type="button" @click="submitForm()" style="display: block; margin-left: auto;"
            class="btn-alert my-4 fw-semibold">
            Cập nhật truyện
        </button>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { toast } from "vue3-toastify"
import { getStoryById, updateStory } from "@/api/stories"
import type { UploadRawFile, UploadFile } from "element-plus"
import { genFileId } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const storyId = Number(route.params.id)

// form setup
interface RuleForm {
    storyName: string
    storyGenre: number | null
    storyAuthor: number | null
    storyDesc: string
    storyLinkForum: string
    cover: UploadRawFile | null
}

const ruleFormRef = ref<FormInstance>()
const fileList = ref<UploadFile[]>([])
const dialogImageUrl = ref("")
const selectedImage = ref<string | null>(null)

const ruleForm = reactive<RuleForm>({
    storyName: "",
    storyGenre: null,
    storyAuthor: Number(auth.userId) || null,
    storyDesc: "",
    storyLinkForum: "",
    cover: null,
})

const rules = reactive<FormRules<RuleForm>>({
    storyName: [{ required: true, message: "Thông tin là bắt buộc", trigger: "blur" }],
    storyGenre: [{ required: true, message: "Thông tin là bắt buộc", trigger: "blur" }],
})

// preset images + options thể loại (giữ nguyên từ CreateStory)
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
    { label: "Linh dị", value: 1 },
    { label: "Trinh thám", value: 2 },
    { label: "Lịch sử", value: 3 },
    { label: "Ngôn tình", value: 4 },
    { label: "Truyện ngắn", value: 5 },
    { label: "Thơ", value: 6 },
    { label: "Huyền ảo", value: 7 },
    { label: "Viễn tưởng", value: 8 },
    { label: "Cổ đại", value: 9 },
    { label: "Hiện thực", value: 10 },
    { label: "Tản văn", value: 11 },
]

// --- Load dữ liệu cũ ---
onMounted(async () => {
    if (storyId) {
        const res = await getStoryById(storyId)
        if (res) {
            const data = res[0]
            dialogImageUrl.value = data.urlImg
            ruleForm.storyName = data.title
            ruleForm.storyDesc = data.description
            ruleForm.storyGenre = data.genres_id
            ruleForm.storyAuthor = data.author_id
            ruleForm.storyLinkForum = data.link_forum
        }
    }
})

// --- handle file ---
const handleFileChange = (file: UploadFile) => {
    if (file.raw) {
        ruleForm.cover = file.raw as UploadRawFile
    }
}

// --- select preset image ---
const selectPreset = async (imgUrl: string) => {
    selectedImage.value = imgUrl
    fileList.value = []
    ruleForm.cover = null
    dialogImageUrl.value = imgUrl
    const res = await fetch(imgUrl)
    const blob = await res.blob()
    const file = Object.assign(
        new File([blob], "preset-image.png", { type: blob.type }),
        { uid: genFileId() }
    ) as UploadRawFile
    ruleForm.cover = file
}

// --- submit form ---
const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid) => {
        if (!valid) {
            toast.error("Thông tin truyện không hợp lệ")
            return
        }
        const toastId = toast.loading("Đang xử lý...")
        const res = await updateStory(ruleForm, storyId)
        toast.remove(toastId)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message || "Lỗi server")
        }
    })
}
</script>

<style>
/* Giữ nguyên style của CreateStory */
.form-createstory .custom-textarea .el-textarea__inner {
    height: 100px;
    line-height: 20px;
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
    padding: 7px 17px;
}

.el-upload-list__item-thumbnail {
    width: 150px;
}

.preset-img.active {
    border: solid 6px #bf2c24;
}
</style>
