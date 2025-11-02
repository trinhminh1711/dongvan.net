<template>
    <div class="">
        <!-- Menu chức năng -->
        <div class="d-flex gap-3">
            <!-- Nút đổi màu nền -->
            <div class="edit-background">
                <p class="fw-bold">Nền</p>
                <div class="d-flex gap-2 mt-3">
                    <button @click="selectTheme('white', 'black')"
                        style="background-color: white; border: solid 1px;"></button>
                    <button @click="selectTheme('black', 'white')" style="background-color: black"></button>
                    <button @click="selectTheme('#1e1e1e', '#f5f5f5')" style="background-color: #E0E0E0"></button>
                    <button @click="selectTheme('#fffae6', '#333')" style="background-color: #FFF3D3"></button>
                </div>
            </div>
        </div>

        <div class="edit-ui mt-5">
            <p class="fw-bold">Dàn trang</p>
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <div @click="emit('set-layout', false)" class="ui-dantrang">
                    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9H25M1 1H25M1 17H25" stroke="#344054" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <div @click="emit('set-layout', true)" class="ui-dantrang">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16H14M2 8H14M2 24H14" stroke="#344054" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M18 16H30M18 8H30M18 24H30" stroke="#344054" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="edit-font__style mt-5">
            <p class="fw-bold mb-3">Cỡ và kiểu chữ</p>
            <div class="edit-fontsize d-flex gap-3 mb-3">
                <button @click="adjustFontSize('decrease')" class="fw-bold">A-</button>
                <button @click="adjustFontSize('increase')" class="fw-bold">A+</button>
            </div>
            <button @click="selectFont('')">Mặc định</button>
            <button style="font-family: 'Times New Roman', Times, serif;"
                @click="selectFont('Times New Roman, serif')">Times New Roman</button>
            <button style="font-family: Arial, Helvetica, sans-serif;"
                @click="selectFont('Arial, sans-serif')">Arial</button>
            <button style="font-family: Georgia, 'Times New Roman', Times, serif;"
                @click="selectFont('Georgia, Times New Roman, serif')">Georgia</button>
            <button style="font-family: 'Courier New', Courier, monospace;"
                @click="selectFont('Courier New, Courier, monospace')">Courier</button>
            <button @click="selectFont('Playfair Display, serif')">Playfair Display</button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["changeFont", "changeFontSize", "changeTheme", "set-layout"]);
const backgroundColor = ref("white");
const fontSize = ref("16px");
const fontFamily = ref("Arial");
const value1 = ref(false)
function handleChange(val) {
  // val = true nếu bật, false nếu tắt
  emit('set-layout', val)
}
const changeBackground = (color) => {
    backgroundColor.value = color;
};
function selectFont(font) {
    emit("changeFont", font);
}
function adjustFontSize(action) {
    emit("changeFontSize", action); // action = "increase" hoặc "decrease"
}
function selectTheme(bg, color) {
    emit("changeTheme", { background: bg, text: color });
}
// Đổi kích thước chữ (toggle nhỏ ↔ to)
const toggleFontSize = () => {
    fontSize.value = fontSize.value === "16px" ? "22px" : "16px";
};
</script>
<style scoped>
.edit-fontsize button {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
}

.edit-background button {
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 20px;
}

.edit-font__style {
    display: flex;
    flex-direction: column;
}

.edit-font__style button {
    background: none;
    border: solid 1px rgb(231, 229, 229);
    padding: 15px 20px;
    border-radius: 20px;
    text-align: left;
    font-weight: bold;
    color: #344054;
    margin: 5px 0;
}
.ui-dantrang
{
    width: 50%;
    display: flex;
    margin-top: 20px;
    border: solid 1px #E4E7EC;
    border-radius: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
}
</style>
