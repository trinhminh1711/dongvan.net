<template>
    <div class="container">
        <el-form class="form-createstory mt-5" :model="newChapForm" :rules="rules" ref="ruleFormRef" label-width="auto">
            <el-form-item prop="chapNumber">
                <template #label><span class="form-createstory__label align-middle">Chương thứ
                        <el-tooltip :content="'Hiện tại đã xuất bản đến chương ' + (newChapForm.chapNumber - 1)"
                            placement="top">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </el-tooltip></span></template>
                <el-input v-model="newChapForm.chapNumber" size="large" disabled />
            </el-form-item>

            <el-form-item>
                <template #label><span class="form-createstory__label align-middle">Xác nhận
                        <el-tooltip :content="'Chọn để xác nhận đã đăng đến chương cuối'" placement="top">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </el-tooltip></span></template>
                <el-checkbox v-model="newChapForm.isfinal" :true-label="1" :false-label="0" class="ms-2">Chương
                    cuối</el-checkbox>
            </el-form-item>

            <el-form-item prop="chapName">
                <template #label><span class="form-createstory__label">Tên chương</span></template>
                <el-input v-model="newChapForm.chapName" size="large" placeholder="Tên chương" />
            </el-form-item>

            <el-form-item prop="isVip">
                <template #label><span class="form-createstory__label">Hình thức</span></template>
                <el-select-v2 @change="checkCondition" v-model="newChapForm.isVip" size="large"
                    placeholder="Chọn hình thức" :options="options" />
            </el-form-item>

            <el-form-item class="custom-textarea" prop="chapContent">
                <template #label><span class="form-createstory__label">Nội dung</span></template>
                <EditorUI v-model:content="newChapForm.chapContent" />
            </el-form-item>

            <el-form-item class="custom-textarea" prop="chapAdsContent">
                <template #label><span class="form-createstory__label">Quảng cáo</span></template>
                <el-input v-model="newChapForm.chapAdsContent" type="textarea" placeholder="Giới thiệu ngắn" />
            </el-form-item>
        </el-form>
        <!-- Button submit -->
        <div class="d-flex gap-4 justify-content-end">
            <button class="btn-outline-primary my-4 align-middle" @click="goBack">
                <el-icon>
                    <Back />
                </el-icon><span class="fw-semibold ms-1">Quay lại</span>
            </button>
            <button @click="submitForm" style="display: block;" class="btn-alert my-4 fw-semibold">
                Đăng chương
            </button>
        </div>
        <el-dialog v-model="isCreateChapVip" width="500">
            <template #title>
                <h3 class="text-color_primary fw-bold">Bạn chưa đủ điều kiện đăng chương VIP!</h3>
            </template>
            <div>
                <p>Bạn chỉ đủ điều kiện bật thu phí cho truyện nếu:</p>
                <ul class="lh-base mt-1">
                    <li>Tác phẩm đó phải có trên 15.000 chữ.</li>
                    <li>Đã đăng ít nhất 10 chương.</li>
                    <li>Đạt tối thiểu 1.000 lượt đọc hợp lệ.</li>
                </ul>
                <p @click="isCreateChapVip = false" class="btn-alert mt-3 lh-1 text-center">OK</p>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import EditorUI from '../text-editor/EditorUI.vue'
import { getLastChapter, postNewChapter } from "@/api/chapter"
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
const isCreateChapVip = ref(false)
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(["created-success"])
const router = useRouter();
const route = useRoute();
interface chapData {
    chapNumber: number,
    chapName: string,
    isVip: number,
    chapContent: String,
    chapAdsContent: String,
    story_id: number,
    countWords: number,
    price: number,
    isfinal: Number,
}
const newChapForm = reactive<chapData>({
    chapNumber: undefined,
    chapName: '',
    isVip: undefined,
    countWords: undefined,
    chapContent: '',
    chapAdsContent: '',
    story_id: undefined,
    price: 5,
    isfinal: 0

})
function goBack() {
    if (window.history.length > 1) {
        router.push({
            name: "create-story", // đúng route name của Component A
            query: { tab: "second" } // mở tab2
        });
    } else {
        router.push({ name: "home" });
    }
}
const options = [
    { label: 'Miễn phí', value: 1 },
    { label: 'Chương Vip', value: 2 },
]
const rules = reactive<FormRules<chapData>>({
    chapNumber: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    chapName: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    chapContent: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],

})
const checkCondition = (value) => {
    if (newChapForm.chapNumber < 10 && value != 1) {
        isCreateChapVip.value = true
        newChapForm.isVip = 1
    }

}
const submitForm = async () => {
    const toastAddChapter = toast.loading("Đang xử lý...");
    if (!ruleFormRef.value) return
    console.log(newChapForm);
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            newChapForm.story_id = Number(route.params.storyId)
            newChapForm.countWords = countWordsFromHtml(newChapForm.chapContent)
            const res = await postNewChapter(newChapForm);
            if (res.success) {
                toast.remove(toastAddChapter);
                toast.success("Thêm chương mới thành công");
                setTimeout(() => {
                    router.push({
                        name: "create-story", // đúng route name của Component A
                        query: { tab: "second" } // mở tab2
                    });
                }, 2000);
            }

        } else {
            console.log("❌ Lỗi validate:", fields)
        }
    })
}
function countWordsFromHtml(html) {
    const text = html.replace(/<[^>]+>/g, '').trim()
    if (!text) return 0
    return text.split(/\s+/).length
}

onMounted(async () => {
    const res = await getLastChapter(route.params.storyId)
    console.log(res);

    if (res.status == 404) {
        newChapForm.chapNumber = 1;
    }
    else {
        newChapForm.chapNumber = res.chap_number + 1
    }

})
</script>
<style></style>