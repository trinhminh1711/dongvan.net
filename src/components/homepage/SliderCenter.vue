<template>
  <div class="row">
    <div class="carousel-wrapper col-6">
      <!-- Swiper -->
      <Swiper :modules="[EffectCoverflow, Pagination]" :effect="'coverflow'" :centered-slides="true"
        :slides-per-view="3" :coverflow-effect="{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1.5,
          slideShadows: false
        }" :pagination="{ clickable: true }" :loop="true" class="mySwiper" @slideChange="onSlideChange">
        <SwiperSlide v-for="(item, i) in items" :key="i">
          <img class="slide-centermode-img" :src="item" alt="" />
        </SwiperSlide>
      </Swiper>

    </div>
    <div class="slide-content col-6">
      <h3 class="text-start text-color_primary fw-bold">Tố tâm</h3>
      <p class="text-start text-color__tertiary slide-content__desc text-sm">{{ descriptions[currentIndex] }}</p>
      <p class="text-start"> <button class="btn-alert__rounded">Đọc truyện</button></p>
    </div>
  </div>

</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      items: [
        "/src/assets/image/slide-img1.jpg",
        "/src/assets/image/slide-img2.jpg",
        "/src/assets/image/slide-img3.jpg",
        "/src/assets/image/slide-img4.jpg",
        "/src/assets/image/slide-img5.jpg",
        "/src/assets/image/slide-img1.jpg",
        "/src/assets/image/slide-img2.jpg",
        "/src/assets/image/slide-img3.jpg",
        "/src/assets/image/slide-img4.jpg",
        "/src/assets/image/slide-img5.jpg",
      ],
      descriptions: [
        "Đường nhỏ du du diêu diêu, trời xanh phiêu phiêu miểu miểu. Một ngày chuyển...",
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        "Mô tả cho ảnh 4",
        "Mô tả cho ảnh 5",
        "Mô tả cho ảnh 6",
        "Mô tả cho ảnh 7",
        "Mô tả cho ảnh 8",
        "Mô tả cho ảnh 9",
        "Mô tả cho ảnh 10",
      ],
      currentIndex: 0
    };
  },
  setup() {
    return { EffectCoverflow, Pagination };
  },
  methods: {
    onSlideChange(swiper) {
      // swiper.realIndex bỏ qua các slide nhân bản khi loop
      this.currentIndex = swiper.realIndex;
    }
  }
};
</script>

<style>
.swiper-coverflow {
  padding: 20px 0;
}

.carousel-wrapper {
  flex: 1;
  min-width: 0;
  height: 150px;
}

.carousel-wrapper .swiper-pagination {
  position: absolute;
  bottom: 0;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 100%;
}

.carousel-wrapper .swiper-pagination-bullet-active {
  background: none;
  height: 10px;
  width: 10px;
  border: solid 1px red;
}

.slide-centermode-img {
  width: 100% !important;
}

.slide-content {
  margin-top: 20px;
  text-align: center;
}

.slide-content {
  line-height: 2;
}
.slide-content__desc
{
  line-height: 1.5;
   display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;    /* Giới hạn 2 dòng */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>
