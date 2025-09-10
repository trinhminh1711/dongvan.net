<template>
    <div class="editor-wrapper">
        <QuillEditor v-model:content="content" contentType="html" :options="editorOptions" class="editor" />
    </div>
</template>

<script setup>
import { ref , watch } from "vue";
const content = defineModel('content');
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
    placeholder: "Nội dung (Tối đa 50.000 ký tự).",
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'header': [1, 2, 3, 4, 5, 6] }],
            [{ size: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'] }],
            [{ 'font': [] }],
            [{ 'color': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'align': [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

        ],
    },
};
</script>

<style>

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