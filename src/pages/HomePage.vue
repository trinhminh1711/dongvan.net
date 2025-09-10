<template>
  <Banner />
  <div class="container py-3 text-center">
    <div class="row align-items-start justify-content-between">
      <div class="row col-3 px-0 d-flex align-items-center">
        <ListStory v-model:items="items" />
      </div>
      <div class="col-6 el-menu-story">
        <h3 class="text-color_primary fw-bold text-start">Biên tập viên đề cử</h3>
        <div class="container text-center border-bottom py-4">
          <SliderCenter />
        </div>
        <div class="container text-center py-4">
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
        <div class="container text-center mt-5">
          <div class="row align-items-center gap-3 flex-nowrap">
            <div class="col-6 px-2 mb-2 d-flex story-card__horizontal color-layout">
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
                <h4 class="color-blue fw-semibold">Việt Nam Sử Lược</h4>
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
       
      </div>
    </div>
    <div class="row align-items-start mt-5 justify-content-between">
      <div class="row col-3 px-0 d-flex align-items-center">
        <RankingList>
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Người đọc đề cử</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div class="row col-3 px-0 d-flex align-items-center">
        <RankingList>
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Đọc nhiều trong tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div class="row col-3 px-0 d-flex align-items-center">
        <RankingList>
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Đọc nhiều trong tháng </h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
      <div class="row col-3 px-0 d-flex align-items-center">
        <RankingList>
          <template #header>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon.svg" alt="">
            <h3 class="topvote-title color-light-blue">Top tác giả của tuần</h3>
            <img class="vote-icon__yellow" src="@/assets/icon/vote-title-icon2.svg" alt="">
          </template>
        </RankingList>

      </div>
    </div>
    <div class="row align-items-start mt-5 justify-content-between">
      <div class="col-3 px-3">
        <TopListUser>
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
      <div class="col-6 px-3">
        <TopListUpdate :content="'Mới cập nhật'" />
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

import { ref } from 'vue'
import Banner from '@/components/view/Banner.vue'
import type { TabsPaneContext } from 'element-plus'
import ListStory from '@/components/homepage/ListStory.vue'
import SliderCenter from '@/components/homepage/SliderCenter.vue'
import RankingList from '@/components/homepage/RankingList.vue'
import TopListUser from '@/components/homepage/TopListUser.vue'
import TopListUpdate from '@/components/homepage/TopListUpdate.vue'
import TopAuthorWeek from '@/components/homepage/TopAuthorWeek.vue'
import StoryCompleted from '@/components/homepage/StoryCompleted.vue'
const activeName = ref('first')
const items = ref([
  { title: "mock", text: "mock text" }
]);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

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