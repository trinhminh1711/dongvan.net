<template>
    <div>
        <LoadingSpiner :show="loading" />
    </div>
    <div style="margin-top: -15px;"
        :style="{ backgroundColor: backgroundColor, color: textColor, transition: 'all 0.3s ease' }" v-if="!loading">
        <div class="tab-bar">
            <button class="hover_link" @click="goBack"><el-icon style="color: white; font-size: 24px;">
                    <ArrowLeft />
                </el-icon>
            </button>
            <h4 @click="gotoStory(chapterData?.story_id)" class="text-white fw-bold text-md hover-link">{{
                chapterData?.story_title }}</h4>
            <div class="button-function">
                <button @click="drawer = true, showOption = true"><img style="max-width: 40px;"
                        src="@/assets/icon/bookmark-add.png" alt=""></img></button>
                <button @click="drawer = true, showOption = true"><img style="max-width: 40px;"
                        src="@/assets/icon/icon-list.png" alt=""></img></button>
                <button @click="drawer = true, showOption = false"><img style="max-width: 40px;"
                        src="@/assets/icon/icon-fontsize.png" alt=""></img></button>
                <button @click="toggleFullScreen"><img style="max-width: 40px;" src="@/assets/icon/icon-maximize.png"
                        alt=""></img></button>
            </div>
        </div>
        <div style="padding-bottom: 140px;" class="container mt-3">
            <div class="story story-content" :class="['story-content', { 'two-column': isTwoColumn }]">
                <div :style="{ fontFamily: fontFamily, fontSize: fontSize + 'px', marginTop: '20px' }"
                    v-html="chapterData?.content"></div>
            </div>
            <div v-if="!IsPurchased">
                <div class="unlock-chapter">
                    <img src="@/assets/icon/lock.png" alt="">
                </div>
                <p class="text-center fw-semibold mt-2">Cần <strong class="fw-semibold"
                        style="font-size: 26px; color: red;">5 Tang Diệp</strong> để mở khóa chương</p>
                <div class="unlock-span">
                    <span @click="unlockChapter()"><svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.5 8V6C4.5 3.23858 6.73858 1 9.5 1C11.5503 1 13.3124 2.2341 14.084 4M9.5 12.5V14.5M6.3 19H12.7C14.3802 19 15.2202 19 15.862 18.673C16.4265 18.3854 16.8854 17.9265 17.173 17.362C17.5 16.7202 17.5 15.8802 17.5 14.2V12.8C17.5 11.1198 17.5 10.2798 17.173 9.63803C16.8854 9.07354 16.4265 8.6146 15.862 8.32698C15.2202 8 14.3802 8 12.7 8H6.3C4.61984 8 3.77976 8 3.13803 8.32698C2.57354 8.6146 2.1146 9.07354 1.82698 9.63803C1.5 10.2798 1.5 11.1198 1.5 12.8V14.2C1.5 15.8802 1.5 16.7202 1.82698 17.362C2.1146 17.9265 2.57354 18.3854 3.13803 18.673C3.77976 19 4.61984 19 6.3 19Z"
                                stroke="#5ABD20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>Mở khóa chương</span>
                    <span @click="unlockFullChapter()">
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.5 8H8.51M14.5 14H14.51M15.5 7L7.5 15M6.83377 2.8187C7.6376 2.75455 8.40071 2.43846 9.01447 1.91542C10.4467 0.69486 12.5533 0.69486 13.9855 1.91542C14.5993 2.43846 15.3624 2.75455 16.1662 2.8187C18.0421 2.96839 19.5316 4.45794 19.6813 6.33377C19.7455 7.1376 20.0615 7.90071 20.5846 8.51447C21.8051 9.94672 21.8051 12.0533 20.5846 13.4855C20.0615 14.0993 19.7455 14.8624 19.6813 15.6662C19.5316 17.5421 18.0421 19.0316 16.1662 19.1813C15.3624 19.2455 14.5993 19.5615 13.9855 20.0846C12.5533 21.3051 10.4467 21.3051 9.01447 20.0846C8.40071 19.5615 7.6376 19.2455 6.83377 19.1813C4.95794 19.0316 3.46839 17.5421 3.3187 15.6662C3.25455 14.8624 2.93846 14.0993 2.41542 13.4855C1.19486 12.0533 1.19486 9.94672 2.41542 8.51447C2.93846 7.90071 3.25455 7.1376 3.3187 6.33377C3.46839 4.45794 4.95794 2.96839 6.83377 2.8187ZM9 8C9 8.27614 8.77614 8.5 8.5 8.5C8.22386 8.5 8 8.27614 8 8C8 7.72386 8.22386 7.5 8.5 7.5C8.77614 7.5 9 7.72386 9 8ZM15 14C15 14.2761 14.7761 14.5 14.5 14.5C14.2239 14.5 14 14.2761 14 14C14 13.7239 14.2239 13.5 14.5 13.5C14.7761 13.5 15 13.7239 15 14Z"
                                stroke="#1877F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Mở combo/full</span>
                    <span @click="$router.push({ name: 'payment' })">
                        <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.4999 1L1.59332 11.6879C1.24451 12.1064 1.07011 12.3157 1.06744 12.4925C1.06512 12.6461 1.13359 12.7923 1.25312 12.8889C1.39061 13 1.66304 13 2.2079 13H9.49986L8.49986 21L17.4064 10.3121C17.7552 9.89358 17.9296 9.68429 17.9323 9.50754C17.9346 9.35388 17.8661 9.2077 17.7466 9.11111C17.6091 9 17.3367 9 16.7918 9H9.49986L10.4999 1Z"
                                stroke="#BF2C24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>Nạp Tang Diệp</span>
                </div>
            </div>
        </div>

        <div class="bottom-bar">
            <div class="d-flex justify-content-center align-items-center">
                <input :style="{
                    background: `linear-gradient(to right, #d6cbcb 0%, #d6cbcb ${scrollPercent}%, #a3a2a2 ${scrollPercent}%, #a3a2a2 100%)`
                }" type="range" min="0" max="100" step="0.1" v-model="scrollPercent" @input="onSeek"
                    class="seek-bar" />
                <span style="color: #d6cbcb;" class="percent-label">{{ scrollPercentLabel }}%</span>
            </div>
            <div class="bottom-bar__nextslide">
                <div>
                    <button @click="gotoChap(prevChap)" class="cursor-pointer" :disabled="!prevChap"
                        :class="{ 'active-chap': prevChap }">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon> Chương trước
                    </button>
                </div>
                <div>
                    <button @click="gotoChap(nextChap)" class="cursor-pointer" :disabled="!nextChap"
                        :class="{ 'active-chap': nextChap }">
                        Chương sau <el-icon>
                            <ArrowRight />
                        </el-icon>
                    </button>
                </div>
            </div>
        </div>
        <el-drawer v-model="drawer" direction="rtl" size="400px">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <!-- <h3 class="text-lg fw-bold">Danh sách</h3> -->
                </div>
            </template>
            <MenuBar :storyId="Number(route.params.id)" :chapterId="Number(route.params.chapId)" v-if="showOption" />
            <MenuEditUI @set-layout="setLayout" :isTwoColumn="isTwoColumn" @change-font="handleFontChange"
                @changeTheme="handleTheme" @changeFontSize="handleFontSize" v-if="!showOption" />
        </el-drawer>
        <el-dialog v-model="unlockChapterDialog" title="Mở khóa chương" width="300">
            <p class="mt-2">Chương sẽ mở: <strong style="color: #344054;">Chương {{ route.params.chapId }}</strong></p>
            <p class="mt-2">Giá để mở: <strong style="color: #344054;">5 Tang diệp</strong></p>
            <p class="mt-2">Tang Diệp hiện có: <strong style="color: #344054;">{{ cointUser }}</strong></p>
            <template #footer>
                <div class="dialog-footer d-flex">
                    <el-button style="width: 50%; font-size: 12px;" @click="unlockChapterDialog = false">Quay
                        lại</el-button>
                    <el-button @click="unlockChap(route.params.chapId)"
                        style="width: 50%; background-color: #FF6114; font-size: 12px; color: #fff; font-weight: 900;">
                        Xác nhận
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-if="chapterNumber" v-model="unlockFullChapterDialog" title="Mở khóa combo ưu đãi" width="300">
            <p class="mt-2">Số chương sẽ mở: <strong style="color: #344054;">{{ chapterNumber.length }} chương <br>
                    </br> (Từ chương {{ chapterNumber[0].chap_number }} đến chương {{
                        chapterNumber[chapterNumber.length - 1].chap_number }})</strong></p>
            <p class="mt-2">Giá ban đầu: <strong style="color: #344054;">{{ 5 * chapterNumber.length }} Tang
                    diệp</strong></p>
            <p class="mt-2">Giá đã giảm: <strong style="color: #344054;">{{ chapterNumber.length > 1 ? 4 *
                chapterNumber.length
                : 5 *
                chapterNumber.length }} Tang diệp</strong></p>
            <p class="mt-2">Số Tang diệp hiện có: <strong style="color: #344054;">{{ cointUser }}</strong></p>
            <template #footer>
                <div class="dialog-footer d-flex">
                    <el-button style="width: 50%; font-size: 12px;" @click="unlockFullChapterDialog = false">Quay
                        lại</el-button>
                    <el-button @click="unlockFullChapter()"
                        style="width: 50%; background-color: #FF6114; font-size: 12px; color: #fff; font-weight: 900;">
                        Xác nhận
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import MenuBar from '@/components/read-story/MenuBar.vue';
import MenuEditUI from '@/components/read-story/MenuEditUI.vue';
import { ref, onMounted, watch, onBeforeUnmount, onUnmounted, computed } from "vue";
import { useRoute, onBeforeRouteLeave, useRouter } from "vue-router";
import { getChapterWithId, updateMarkReadChapter } from '@/api/chapter';
import { updateUserReadingBook, getNumberChapterStory, getNumberChapterNotPurchaseStory, unlockChapters, getStoryFullInfo } from '@/api/stories';
import { useAuthStore } from "@/stores/auth";
import { getUserInfo } from '@/api/users';
import { toast } from "vue3-toastify";
import { } from '@/api/stories';
const auth = useAuthStore();
import LoadingSpiner from '@/components/loadding/LoadingSpiner.vue';
const route = useRoute();
const content = ref(null);
const router = useRouter()
const drawer = ref(false);
const cointUser = ref();
const chapterData = ref(null)
const IsPurchased = ref(false)
const loading = ref(true);
const chapterNumber = ref();
const unlockChapterDialog = ref(false)
const unlockFullChapterDialog = ref(false)
const backgroundColor = ref("white");
const textColor = ref("black");
const showOption = ref(false)
const fontFamily = ref("");
const fontSize = ref(18); // px
const liveTimeReadStory = ref();
const startTime = ref(null)
const required_time_seconds = ref();
const storyFullInfo = ref
const isTwoColumn = ref(false);
const scrollPercent = ref(0);
const prevChap = ref(null);
const nextChap = ref(null);
const currentChap = ref(Number(route.params.chapId));
async function fetchChapter() {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const storyId = route.params.id;
        const chapterId = route.params.chapId;
        const res = await getChapterWithId(storyId, chapterId, auth.userId)
        chapterData.value = res.data
        IsPurchased.value = res.IsPurchased
        required_time_seconds.value = (res.data.word_count / 1000) * 2
    } catch (err) {
        console.error("Lỗi API:", err);
    } finally {
        loading.value = false;
    }

}

async function getChaptersAround() {
    const res = await getStoryFullInfo(route.params.id)
    if (res.data.length === 0) {
        prevChap.value = null;
        nextChap.value = null;
        return;
    }
    const maxChap = Math.max(...res.data.map(ch => ch.chap_number));
    const minChap = Math.min(...res.data.map(ch => ch.chap_number));
    prevChap.value = currentChap.value > minChap ? currentChap.value - 1 : null;

    // next: nếu < max thì tăng 1, nếu là chương cuối thì null
    nextChap.value = currentChap.value < maxChap ? currentChap.value + 1 : null;
    console.log(prevChap.value, nextChap.value, currentChap.value);

}
async function unlockChapter() {
    unlockChapterDialog.value = true

}
const scrollPercentLabel = computed(() => scrollPercent.value.toFixed(0));
function setLayout(value) {
    isTwoColumn.value = value;
}
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

async function unlockChap(chapter) {

    const listChap = [chapter]
    const res = await unlockChapters(route.params.id, auth.userId, listChap)
    if (res.status == 201) {
        toast.success("Mở khóa chương thành công");
        window.location.reload();
    }
    else {
        toast.error(res.message, {
            toastId: "unlock-error"
        });
    }

}
async function unlockFullChapter() {
    unlockFullChapterDialog.value = true
    const res = await getNumberChapterNotPurchaseStory(route.params.id, auth.userId)
    const newArr = res.map(item => item.chap_number);
    const unlockChap = await unlockChapters(route.params.id, auth.userId, newArr)
    console.log(res);

}
function handleFontSize(action) {
    if (action === "increase" && fontSize.value < 40) fontSize.value += 2;
    if (action === "decrease" && fontSize.value > 6) fontSize.value -= 2;
}
function handleFontChange(font) {
    fontFamily.value = font;
}
function handleTheme(theme) {
    backgroundColor.value = theme.background;
    textColor.value = theme.text;
}
onBeforeRouteLeave((to, from, next) => {
    handleExit()
    next()
})
function initReadingTracker() {
    startTime.value = Date.now()
    window.addEventListener("beforeunload", handleExit)
}
function cleanupReadingTracker() {
    window.removeEventListener("beforeunload", handleExit)
}
async function handleExit() {
    if (canCountAsRead(startTime.value, required_time_seconds.value)) {
        await updateMarkReadChapter(route.params.id, route.params.chapId, auth.userId)
    }
}

function canCountAsRead(start, required) {
    const duration = (Date.now() - start) / 1000

    return duration >= required
}
function goBack() {
    router.back()       // quay lại 1 bước trong history
    // hoặc: router.go(-1)
}
async function gotoChap(id) {
    await getChaptersAround()
    router.push({
        name: "chap-detail",
        params: {
            id: route.params.id,
            chapId: id
        }
    });

}
async function gotoStory(id) {
    router.push({
        name: "story",
        params: { id },
    });

}
async function updateReadingUser() {
    const storyId = route.params.id;
    const chapterId = route.params.chapId;
    const userId = auth.userId;
    const res = await updateUserReadingBook(userId, storyId, chapterId);

}
function updateScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
}

// Khi kéo seek bar
function onSeek() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (scrollPercent.value / 100) * docHeight;
    window.scrollTo({ top: scrollTo, behavior: "auto" }); // có thể dùng "smooth"
}
watch(
    () => route.params,
    () => {
        fetchChapter();
        initReadingTracker()
    },
    { immediate: true }
);
onMounted(async () => {
    await updateReadingUser()
    await fetchChapter();
    await getChaptersAround()
    const res = await getUserInfo(auth.userId);
    cointUser.value = res.coin_balance
    window.addEventListener("scroll", updateScroll);
});
onUnmounted(() => window.removeEventListener("scroll", updateScroll));
onBeforeUnmount(() => {
    cleanupReadingTracker()
})
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

.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #3E3D43;
    z-index: 9999;
}

.bottom-bar__nextslide {
    background-color: #3E3D43;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 50px 20px 50px;
    gap: 20px;
}

.bottom-bar button {
    background-color: #49484E;
    color: #AEAEAE;
    border: none;
    padding: 12px 30px;
    border-radius: 20px;
    display: flex;
    align-items: center;
}

.button-function {
    display: flex;
    align-items: center;
    gap: 10px;
}

.scroll-progress {
    width: 80%;
    height: 5px;
    margin-top: 20px;
    background-color: #e5e5e5;
    z-index: 9999;
}

.scroll-progress .progress-bar {
    height: 5px;
    width: 0%;
    background-color: #4f46e5;
    transition: width 0.1s linear;
}

.tab-bar button {
    background: none;
    border: none;
}

.el-drawer__header {
    margin: 0;
}

.unlock-chapter {
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 50px;
}

.unlock-chapter img {
    position: relative;
    z-index: 10;
    background-color: #AEAEAE;
    padding: 10px;
    border-radius: 50%;
    width: 50px;

}

.unlock-chapter::after {
    z-index: 2;
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: 50%;
    background-color: #AEAEAE;
}

.unlock-span {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.unlock-span span:hover {
    cursor: pointer;
}

.unlock-span span {
    margin: 0 20px;
    border: solid 1px #AEAEAE;
    padding: 5px 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 10px
}

.dialog-footer button span {
    font-weight: 900;
}

.story-content {
    column-count: 1;
    /* Mặc định 1 cột */
    column-gap: 40px;
    line-height: 1.8;
    text-align: justify;

}

.story-content.two-column {
    column-count: 2;
    /* Khi bật chế độ 2 cột */
}

.active-chap {
    color: #FFFFFF !important;
    background-color: #5B5A5D !important;
}

.seek-bar {
    width: 80%;
    /* tương tự thanh progress trước */
    margin: 16px 5px;
    display: block;
    height: 8px;
    -webkit-appearance: none;
    border-radius: 3px;
    background: #e5e5e5;
    outline: none;
}

.seek-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #d6cbcb;
    cursor: pointer;
    border: none;
    margin-top: 0px;
}

.seek-bar::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #4f46e5;
    cursor: pointer;
    border: none;
}
</style>