<template>
    <div>
        <LoadingSpiner :show="loading" />
    </div>
    <div :style="{backgroundColor: backgroundColor, color: textColor, transition: 'all 0.3s ease'}"  v-if="!loading">
        <div class="tab-bar">
            <button class="hover_link" @click="goBack"><el-icon style="color: white; font-size: 24px;">
                    <ArrowLeft />
                </el-icon>
            </button>
            <h4 class="text-white fw-bold text-md">{{ chapterData.story_title }}</h4>
            <div class="button-function">
                <button @click="drawer = true, showOption = true"><img style="max-width: 40px;"
                        src="@/assets/icon/bookmark-add.png" alt=""></img></button>
                <button @click="drawer = true, showOption = true"><img style="max-width: 40px;"
                        src="@/assets/icon/icon-list.png" alt=""></img></button>
                <button @click="drawer = true, showOption = false"><img style="max-width: 40px;"
                        src="@/assets/icon/icon-fontsize.png" alt=""></img></button>
                <button><img style="max-width: 40px;" src="@/assets/icon/icon-maximize.png" alt=""></img></button>
            </div>
        </div>
        <div class="container mt-3">
            <div class="story">
                <div :style="{ fontFamily: fontFamily, fontSize: fontSize + 'px', marginTop: '20px' }" v-html="chapterData.content"></div>
            </div>

        </div>
        <el-drawer v-model="drawer" direction="rtl" size="400px">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <!-- <h3 class="text-lg fw-bold">Danh sách</h3> -->
                </div>
            </template>
            <MenuBar :storyId="Number(route.params.id)" :chapterId="Number(route.params.chapId)" v-if="showOption" />
            <MenuEditUI  @change-font="handleFontChange" @changeTheme="handleTheme"  @changeFontSize="handleFontSize" v-if="!showOption" />
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import MenuBar from '@/components/read-story/MenuBar.vue';
import MenuEditUI from '@/components/read-story/MenuEditUI.vue';
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'
import { getChapterWithId } from '@/api/chapter';
import LoadingSpiner from '@/components/loadding/LoadingSpiner.vue';
const route = useRoute();
const drawer = ref(false);
const chapterData = ref(null)
const loading = ref(true);
const backgroundColor = ref("white");
const textColor = ref("black");
const showOption = ref(false)
const fontFamily = ref("");
const fontSize = ref(18); // px
async function fetchChapter() {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const storyId = route.params.id;
        const chapterId = route.params.chapId;
        const res = await getChapterWithId(storyId, chapterId)
        chapterData.value = res
    } catch (err) {
        console.error("Lỗi API:", err);
    } finally {
        loading.value = false;
    }

}function handleFontSize(action) {
  if(action === "increase" && fontSize.value < 40) fontSize.value += 2;
  if(action === "decrease" && fontSize.value > 6) fontSize.value -= 2;
}
function handleFontChange(font) {
  fontFamily.value = font;
}
function handleTheme(theme) {
  backgroundColor.value = theme.background;
  textColor.value = theme.text;
}
const router = useRouter()

function goBack() {
  router.back()       // quay lại 1 bước trong history
  // hoặc: router.go(-1)
}
watch(
    () => route.params,
    () => {
        fetchChapter();
    },
    { immediate: true }
);
onMounted(async () => {
    fetchChapter();
});
</script>

<style>
.story {
    line-height: 2;
}

.tab-bar {
    background-color: #3E3D43;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 50px
}

.button-function {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tab-bar button {
    background: none;
    border: none;
}

.el-drawer__header {
    margin: 0;
}
</style>