<template>
  <div class="card p-3">
    <div class="row">
      <!-- Điểm trung bình -->
      <div class="col-4 d-flex flex-column align-items-center justify-content-center">
        <h2 style="font-size: 40px;">{{ average.toFixed(1) }}</h2>

        <small>{{ total }} đánh giá</small>
      </div>

      <!-- Breakdown -->
      <div class="col-8">
        <div v-for="star in [1, 2, 3, 4, 5]" :key="star" class="d-flex align-items-center mb-1">
          <!-- Số sao -->
          <div class="me-2" style="min-width:80px;">
            <el-rate :model-value="star" disabled />
          </div>
          <!-- Progress bar -->
          <div class="flex-grow-1">
            <el-progress :percentage="getPercentage(star)" color="#fadb14" :stroke-width="14" :show-text="false" />
          </div>
        </div>
      </div>
    </div>

    <!-- Button viết đánh giá -->
    <div class="text-end mt-3">
      <el-button type="danger" round>
        <i class="el-icon-edit"></i> Viết đánh giá
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ratings = ref({
  5: 36,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
});

const total = Object.values(ratings.value).reduce((a, b) => a + b, 0);
const average =
  Object.entries(ratings.value).reduce(
    (sum, [star, count]) => sum + star * count,
    0
  ) / total;

const getPercentage = (star) => {
  if (!total) return 0;
  return (ratings.value[star] / total) * 100;
};
</script>
