<template>
  <div class="card p-3">
    <div v-if="rateData" class="row">
      <!-- Điểm trung bình -->
      <div class="col-4 d-flex flex-column align-items-center justify-content-center">
        <h2 style="font-size: 40px;"> {{ rateDataStar ? rateDataStar : "Chưa có đánh giá" }}</h2>

        <small>{{ rateData.length }} đánh giá</small>
      </div>

      <!-- Breakdown -->
      <div class="col-8">
        <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="rating-row d-flex">
          <div class="me-2" style="min-width:80px;">
            <el-rate :model-value="star" disabled />
          </div>
          <el-progress style="width: 80%;" :percentage="getPercentage(star)" color="#fadb14" :stroke-width="14"
            :show-text="false" />
        </div>
      </div>
    </div>

    <!-- Button viết đánh giá -->
    <div class="text-end mt-3">
      <button @click="rateDialog = true" class="btn-alert" type="danger" round>
        <i class="el-icon-edit"></i> Viết đánh giá
      </button>
    </div>
  </div>
  <div class="list-comment">
    <div v-for="comment in rateData" class="mt-5">
      <div class="comment-username d-flex align-items-center justify-content-between">
        <p class="fw-bold">{{ comment.username }}</p>
        <p style="color: #667085;">06/05/2025</p>
      </div>
      <div class="mt-2 d-flex align-items-center justify-content-between">
        <p class="pe-5" style="color: #344054; font-size: 14px; text-align: justify">{{ comment.comment }}</p>
        <el-rate  v-model="comment.rating" disabled  text-color="#ff9900" />
      </div>
    </div>
  </div>
  <el-dialog v-model="rateDialog" title="Đánh giá và nhận xét" width="500" :before-close="handleClose">
    <div class="d-flex align-items-center gap-2">
      <span class="fw-bold">Đánh giá</span>
      <el-rate v-model="rateValue" :texts="['Chưa hay', 'Bình thường', 'Tạm được', 'Khá hay', 'Tuyệt vời']" show-text />
    </div>
    <div class="mt-2">
      <span class="fw-bold">Nhật xét</span>
      <el-input class="mt-2" v-model="rateComment" type="textarea" :rows="5"
        placeholder="Hãy cho chúng mình vài nhận xét và đóng góp ý kiến nhé!" />
    </div>
    <button @click="onRate()" style="width: 100%; height: 40px;" class="btn-alert mt-3"><span class="py-2">Gửi nhận
        xét</span></button>
  </el-dialog>
</template>

<script setup>
import { getStoryRate } from "@/api/author";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { rateStory } from "@/api/author";
import { toast } from "vue3-toastify"; // nếu dùng toast
const auth = useAuthStore();
const props = defineProps({
  story_id: {
    type: Number,
    required: true
  },
})
const rateDialog = ref(false);
const rateValue = ref();
const rateComment = ref();
const rateData = ref([]);
const ratingCounts = ref({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
const rateDataStar = ref(0);

function avgRating(ratings) {
  return ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length;
}
async function onRate() {
  const res = await rateStory(props.story_id, auth.userId, rateValue.value, rateComment.value);
  if (res.status == 201) {
    toast.success("Đã gửi đánh giá truyện")
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
}
async function getRateting() {
  const res = await getStoryRate(props.story_id);
  rateData.value = res || [];
  rateDataStar.value = avgRating(res)
  ratingCounts.value = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  rateData.value.forEach(r => {
    ratingCounts.value[r.rating] = (ratingCounts.value[r.rating] || 0) + 1;
  });
  console.log(ratingCounts);
}
const getPercentage = (star) => {
  const total = Object.values(ratingCounts.value).reduce((a, b) => a + b, 0);
  if (!total) return 0;
  return (ratingCounts.value[star] / total) * 100;
}
onMounted(async () => {
  await getRateting()

})
</script>
