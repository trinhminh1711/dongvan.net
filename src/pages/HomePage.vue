<template>
  <Banner />
  <div class="container py-3 text-center">
    <div class="row align-items-start justify-content-between">
      <div class="row col-3 px-0 d-flex align-items-center">
        <ListStory />
      </div>
      <div class="col-6 el-menu-story">
        <h3 class="text-color_primary fw-bold text-start border-b pb-2">Biên tập viên đề cử</h3>
        <div class="container text-center border-bottom pt-3 pb-5">
          <SliderCenter />
        </div>
        <div class="container text-center pt-2">
          <div class="row align-items-center gap-10">
            <div v-for="(item, index) in dataPropose" :key="index" class="col-4 px-2 mb-2">
              <p @click="goToStory(item.story_id)" class="text-start text-md fw-bold mt-1 text-capitalize text-nowrap hover-link">{{ item.title }}</p>
              <p class="text-start color-alert text-md mt-1">
                <span class="fw-bold">{{ item.numberChapter }} </span> Chương
              </p>
              <p style="text-align:justify" class="text-color__tertiary text-sm mt-1 two-line-ellipsis">{{ item.desc
              }}
              </p>
            </div>
          </div>
        </div>
        <div class="container text-center mt-3">
          <div class="row align-items-center gap-3 flex-nowrap">
            <div @click="goToStory(28)" class="col-6 px-2 mb-2 d-flex story-card__horizontal color-layout hover-link">
              <div>
                <h4 class="color-yellow fw-semibold">Tiêu Sơn Tráng Sĩ</h4>
                <p class="text-color_primary text-sm">[cao định hai mươi ngàn, tinh phẩm bảo đảm ] Tỉnh dậy, Lục </p>
              </div>
              <div class="story-card__img">
                <img src="@/assets/image/tieusontrangsi.png" alt="">
              </div>
            </div>
            <div class="col-6 px-2 mb-2 d-flex story-card__horizontal color-layout">
              <div>
                <h4 @click="goToStory(29)" class="color-blue fw-semibold hover-link">Việt Nam Sử Lược</h4>
                <p class="text-color_primary text-sm">Cảnh Huyên xuyên qua đến một cái chư quốc loạn chiến, rung </p>
              </div>
              <div class="story-card__img">
                <img src="@/assets/image/vietnamsuluoc.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 p-0">
        <ReviewStory />
      </div>
    </div>
    <div id="ranking" class="row align-items-start mt-5 justify-content-between">
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #F3FAFF 0%, #F3FAFF 55%, #FCFEFF 100%);"
        class="row py-4 col-3 px-0 d-flex align-items-center">
        <RankingList :items="topUserReadersRecoment">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Người đọc đề cử</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div
        style="border-radius: 10px; background: linear-gradient(to bottom, #FFF7EC 0%, #FFF7EC 55%, #FFFDF9 70%, #FFFDF9 100%);"
        class="row col-3 px-0 py-4 d-flex align-items-center">
        <RankingList :items="topStoryRead">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Đọc nhiều trong tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div
        style="border-radius: 10px; background: linear-gradient(to bottom, #FFF7EC 0%, #FFF7EC 55%, #FFFDF9 70%, #FFFDF9 100%);"
        class="row col-3 px-0 py-4 d-flex align-items-center">
        <RankingList :items="topStoryMonthRead">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 style="color:#EAAE00 ;" class="topvote-title color-light-blue">Đọc nhiều trong tháng </h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #F3FAFF 0%, #F3FAFF 55%, #FCFEFF 100%);"
        class="row py-4  col-3 px-0 d-flex align-items-center">
        <RankingListUser :items="topAuthorWeek">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Top tác giả của tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingListUser>

      </div>
    </div>
    <div class="row align-items-start mt-5 justify-content-between">
      <div class="col-3 px-3">
        <TopListUser v-if="topUserReadersStory && topUserReadersStory.length > 0" :items="topUserReadersStory">
          <template #author-top3>
            <div class="d-flex justify-content-between author-card__img">
              <div class="d-flex flex-column">
                <span class="bg-red text-white fw-bold p-1 text-sm align-self-start">NO.1</span>
                <p @click="goToProfile(topUserReadersStory[0].user_id)" class="my-1 hover-link">{{
                  topUserReadersStory[0].username }}</p>
                <p class="text-start color-alert text-md">
                  <span class="color-red fw-bold">{{ topUserReadersStory[0].total_reads }}</span> <span
                    class="fst-italic color-red ">Chương</span>
                </p>
              </div>
              <div>
                <img style="width: 50px; height: 100%;" :src="topUserReadersStory[0].link_thumbnail" alt="">
              </div>
            </div>
          </template>
        </TopListUser>
      </div>
      <div class="col-6 px-3">
        <TopListUpdate :items="topStoryUpdatedNew" :content="'Truyện mới cập nhật'" />
      </div>
      <div class="col-3 px-3">
        <TopListUserSpending v-if="topSpendingUsers" :items = "topSpendingUsers" :content="'Top đại gia'">
          <template #author-top3>
            <div class="d-flex justify-content-between author-card__img">
              <div class="d-flex flex-column">
                <span class="bg-red text-white fw-bold p-1 text-sm align-self-start">NO.1</span>
                   <p @click="goToProfile(topSpendingUsers[0].user_id)" class="my-1 hover-link text-start">{{
                  topSpendingUsers[0].username }}</p>
                <p class="text-start color-alert text-md">
                  <span class="color-red fw-bold">{{    topSpendingUsers[0].total_spent % 1 === 0 ? parseInt( topSpendingUsers[0].total_spent) : topSpendingUsers[0].total_spent }}</span> <span class="fst-italic color-red ">Tang Diệp</span>
                </p>
              </div>
              <div>
                <img style="width: 50px; height: 100%;" :src="topSpendingUsers[0].link_thumbnail" alt="">
              </div>
            </div>
          </template>
        </TopListUserSpending>
      </div>
    </div>
    <div class="row align-items-start mt-5">
      <TopAuthorWeek />
    </div>
  </div>
  <div class="container-fluid my-5">
    <img style="max-width: 100%;" src="@/assets/image/img-bottom.jpg" alt="">
  </div>
  <div class="container">
    <StoryCompleted />
  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue'
import Banner from '@/components/view/Banner.vue'
import type { TabsPaneContext } from 'element-plus'
import ListStory from '@/components/homepage/ListStory.vue'
import SliderCenter from '@/components/homepage/SliderCenter.vue'
import RankingList from '@/components/homepage/RankingList.vue'
import TopListUser from '@/components/homepage/TopListUser.vue'
import RankingListUser from '@/components/homepage/RankingListUser.vue'
import TopListUpdate from '@/components/homepage/TopListUpdate.vue'
import ReviewStory from '@/components/homepage/ReviewStory.vue'
import TopAuthorWeek from '@/components/homepage/TopAuthorWeek.vue'
import TopListUserSpending from '@/components/homepage/TopListUserSpending.vue'
import StoryCompleted from '@/components/homepage/StoryCompleted.vue'
import { getTopUserRead } from '../api/chapter'
import { getTopStoryReaded, getTopStoryReadedMonth, getTopAuthorWeek, getTopUserReaders, getListStoryUpdatedNew, getTopStoryRecomment , getTopUserSpending } from '../api/stories'
const activeName = ref('first')
import { useRouter } from 'vue-router'
const topUserRead = ref()
const topStoryRead = ref()
const topAuthorWeek = ref()
const topUserReadersStory = ref()
const topSpendingUsers = ref()
const topUserReadersRecoment = ref()
const topStoryMonthRead = ref()
const storyNewUpdated = ref()
const topStoryUpdatedNew = ref()
const items = ref([
  { title: "mock", text: "mock text" }
]);
const router = useRouter()
function goToStory(post_id) {
  router.push({
    name: 'story',   // Tên route bạn đã định nghĩa trong router/index.js
    params: { id: post_id }       // Truyền param id
  })
}
function goToProfile(params) {
  router.push({ name: 'user', params: { id: params } })
}
const handleClick = (tab: TabsPaneContext, event: Event) => {

};
async function getTopStoryMonth() {
  topStoryMonthRead.value = await getTopStoryReadedMonth(10)
}
async function getTopStory() {
  topStoryRead.value = await getTopStoryReaded(10);
}
async function getTopAuthor() {
  topAuthorWeek.value = await getTopAuthorWeek(10);;


}
async function getTopUserReader() {
  topUserReadersStory.value = await getTopUserReaders(10);
}
async function getTopStoryUpdate() {
  topStoryUpdatedNew.value = await getListStoryUpdatedNew(24);
}
async function getTopRecomment() {
  topUserReadersRecoment.value = await getTopStoryRecomment();
}
async function getTopSpendingUsers() {
  topSpendingUsers.value = await getTopUserSpending();
  
}
onMounted(async () => {
  await getTopStory()
  await getTopStoryMonth()
  await getTopAuthor()
  await getTopUserReader()
  await getTopStoryUpdate()
  await getTopRecomment()
  await getTopSpendingUsers()
})
const reviewTitle = "Review Tác phẩm";
const dataReview = [
  { title: "Số Đỏ", text: "Nhật Ánh" },
  { title: "Lan Nhược Tiên Du", text: "Huy Thiệp" },
  { title: "Trận Vấn Trường", text: "Anh Thái" }
];
const dataPropose = [
  { title: "Số đỏ",  story_id: 24,  numberChapter: "20", desc: "“Số đỏ” là một trong những tiểu thuyết nổi tiếng của Vũ Trọng Phụng" },
  { title: "Sống mòn", story_id: 56, numberChapter: "20", desc: "Tác phẩm Sống mòn là một trong những tiểu thuyết đặc sắc nhất của Nam Cao" },
  { title: "Tắt đèn", story_id: 58, numberChapter: "27", desc: "Tắt đèn là tiểu thuyết hiện thực xuất sắc của Ngô Tất Tố, được viết vào năm 1939, phản ánh sâu sắc cuộc sống cơ cực của người nông dân Việt Nam dưới ách bóc lột tàn bạo của chế độ thực dân – phong kiến"  },
  { title: "Vỡ đê", story_id: 27, numberChapter: "2", desc: "Tác phẩm phản ánh tình cảnh khốn khổ của người dân lao động trong nạn đói và lũ lụt, đồng thời phơi bày bộ mặt giả dối, vô cảm của tầng lớp thống trị và quan lại đương thời" },
  { title: "Nửa chừng Xuân", story_id: 48, numberChapter: "18", desc: "Câu chuyện xoay quanh mối tình éo le giữa Lộc và Mai, hai con người trẻ tuổi chân thành nhưng bị ngăn trở bởi định kiến xã hội và lễ giáo gia đình" },
  { title: "Phan Đình Phùng", story_id: 43, numberChapter: "21", desc: "Tác phẩm “Phan Đình Phùng” của Đào Trinh Nhất là một trong những cuốn tiểu sử – khảo cứu lịch sử tiêu biểu về nhân vật anh hùng yêu nước cuối thế kỷ XIX" },

]
</script>

<style>
.topvote-title {
  font-weight: bold;
}

.demo-tabs>.el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.two-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-card__horizontal {
  text-align: left;
  padding: 10px 0;
  gap: 10px;
}

.story-card__img {
  width: 40%;
}

.story-card__img img {
  max-width: 100%;
}
</style>