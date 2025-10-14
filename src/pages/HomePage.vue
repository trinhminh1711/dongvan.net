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
              <p class="text-start text-md fw-bold mt-1 text-capitalize text-nowrap">{{ item.title }}</p>
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
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #F3FAFF 0%, #F3FAFF 55%, #FCFEFF 100%);"  class="row py-4 col-3 px-0 d-flex align-items-center">
        <RankingList :items="topUserReadersRecoment">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Người đọc đề cử</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #FFF7EC 0%, #FFF7EC 55%, #FFFDF9 70%, #FFFDF9 100%);"  class="row col-3 px-0 py-4 d-flex align-items-center">
        <RankingList :items="topStoryRead">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Đọc nhiều trong tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
       <div style="border-radius: 10px; background: linear-gradient(to bottom, #FFF7EC 0%, #FFF7EC 55%, #FFFDF9 70%, #FFFDF9 100%);" class="row col-3 px-0 py-4 d-flex align-items-center">
        <RankingList :items="topStoryMonthRead">
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 style="color:#EAAE00 ;" class="topvote-title color-light-blue">Đọc nhiều trong tháng </h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div style="border-radius: 10px; background: linear-gradient(to bottom, #F3FAFF 0%, #F3FAFF 55%, #FCFEFF 100%);" class="row py-4  col-3 px-0 d-flex align-items-center">
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
                <p class="my-2">{{ topUserReadersStory[0].username }}</p>
                <p class="text-start color-alert text-md mt-1">
                  <span class="color-red fw-bold">{{ topUserReadersStory[0].total_reads }}</span> <span
                    class="fst-italic color-red ">Chương</span>
                </p>
              </div>
              <div>
                <img style="max-width: 50px;" :src="topUserReadersStory[0].link_thumbnail" alt="">
              </div>
            </div>
          </template>
        </TopListUser>
      </div>
      <div class="col-6 px-3">
        <TopListUpdate :items="topStoryUpdatedNew" :content="'Truyện mới cập nhật'" />
      </div>
      <div class="col-3 px-3">
        <TopListUser :content="'Top đại gia'">
          <template #author-top3>
            <div class="d-flex justify-content-between author-card__img">
              <div class="d-flex flex-column">
                <span class="bg-red text-white fw-bold p-1 text-sm align-self-start">NO.1</span>
                <p class="my-2">Lãnh Hàn Phong</p>
                <p class="text-start color-alert text-md mt-1">
                  <span class="color-red fw-bold">567</span> <span class="fst-italic color-red ">Chương</span>
                </p>
              </div>
              <div>
                <img src="" alt="">
              </div>
            </div>
          </template>
        </TopListUser>
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
import StoryCompleted from '@/components/homepage/StoryCompleted.vue'
import { getTopUserRead } from '../api/chapter'
import { getTopStoryReaded, getTopStoryReadedMonth, getTopAuthorWeek, getTopUserReaders, getListStoryUpdatedNew, getTopStoryRecomment } from '../api/stories'
const activeName = ref('first')
import { useRouter } from 'vue-router'
const topUserRead = ref()
const topStoryRead = ref()
const topAuthorWeek = ref()
const topUserReadersStory = ref()
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
onMounted(async () => {
  await getTopStory()
  await getTopStoryMonth()
  await getTopAuthor()
  await getTopUserReader()
  await getTopStoryUpdate()
  await getTopRecomment()
})
const reviewTitle = "Review Tác phẩm";
const dataReview = [
  { title: "Sống Sót Trong Trò", text: "Nhật Ánh" },
  { title: "Lan Nhược Tiên Du", text: "Huy Thiệp" },
  { title: "Trận Vấn Trường", text: "Anh Thái" }
];
const dataPropose = [
  { title: "Sống Sót Trong Trò", numberChapter: "567", desc: "Truyện dành cho fan của thể loại fantasy của " },
  { title: "Lan nhược tiên truyện", numberChapter: "567", desc: "Truyện dành cho fan của thể loại fantasy" },
  { title: "Trận vấn trường sinh", numberChapter: "567", desc: "Truyện dành cho fan của thể loại fantasy của " },
  { title: "Đạo đồ thần tọa", numberChapter: "290", desc: "Truyện dành cho fan của thể loại fantasy của phương tây, fan diablo" },
  { title: "Bỉ ngạn chi chủ", numberChapter: "290", desc: "Truyện dành cho fan của thể loại fantasy của phương " },
  { title: "Cẩu tại sơ thánh ma môn", numberChapter: "290", desc: "Truyện dành cho fan của thể loại fantasy của " },

]
</script>

<style>
.topvote-title
{
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