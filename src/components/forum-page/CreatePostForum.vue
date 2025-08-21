<template>
    <div>
        <h4 class="text-md fw-bold"> Đăng bài mới</h4>
        <p class="text-sm">Chia sẻ những câu chuyện thú vị và tương tác với các độc giả khác trên diễn đàn!</p>

        <div class="py-2">
            <p class="mb-1 fw-semibold text-md">Tiêu đề</p>
            <el-input v-model="text" placeholder="Nhập nội dung..." />
        </div>
        <div class="py-2">
            <p class="mb-1 fw-semibold text-md">Chuyên mục</p>
            <el-select v-model="selected" placeholder="Chọn loại chuyên mục bài đăng">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-2">
            <p class="mb-1 fw-semibold text-md">Nội dung</p>
            <QuillEditor v-model:content="content" contentType="html" :options="editorOptions" class="editor" />
        </div>
        <button style="width: 100%;" class="btn-alert mt-3"> Đăng bài </button>
    </div>
</template>


<script setup>
import { ref } from "vue";
const content = ref("");
const previewContent = ref("");
import { QuillEditor } from '@vueup/vue-quill'
import Quill from "quill";
const Size = Quill.import('formats/size');
Size.whitelist = [
    '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
];
Quill.register(Size, true);
// Cấu hình toolbar
const editorOptions = {
    theme: "snow",
    placeholder: "Mô tả về chủ đề bạn muốn thảo luận ở đây ...",
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'header': [1, 2, 3, 4, 5, 6] }],
            [{ size: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'] }],
            [{ 'color': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'align': [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],


        ],
    },
};
const text = ref("")
const selected = ref("")
const options = [
    { value: "1", label: "Lựa chọn 1" },
    { value: "2", label: "Lựa chọn 2" },
    { value: "3", label: "Lựa chọn 3" }
]
</script>

<style>
.editor-wrapper {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 100%;
    overflow: hidden;
}

.editor {
    min-height: 200px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="8px"]::before {
    content: "8";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
    content: "10";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
    content: "12";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
    content: "14";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: "16";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: "18";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: "20";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
    content: "24";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
    content: "28";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
    content: "32";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
    content: "36";
}

/* Ẩn nhãn Normal mặc định nếu vẫn còn */
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "Cỡ chữ" !important;
}
</style>