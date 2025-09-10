<template>
  <el-tabs v-if="storyData"  v-model="activeName">
    <el-tab-pane label="Mục lục" name="first">
      <ul class="list-menu" style="list-style: none;">
        <li @click="gotoChap(value.chap_number)" class="my-3" v-for="(value, index) in bookIndex" :key="index">
          <p class="fw-bold hover_link">Chương {{ value.chap_number }} : {{ value.chapter_title }}</p>
          <p v-if="!value.isPayfee" class="text-sm">Miễn phí</p>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="Dấu trang" name="second">
      <ul class="list-menu" style="list-style: none;">
        <li class="my-3" v-for="(value, index) in bookmark" :key="index">
          <p class="fw-bold">{{ value.text }}</p>
          <p class="text-sm">{{ value.date }}</p>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from "vue";
import { onMounted } from "vue";
import { getStoryFullInfo } from '@/api/stories';
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  storyId: Number,
  chapterId: Number,
});
const storyData = ref(null)
async function fetchChapter() {
  storyData.value = await getStoryFullInfo(props.storyId);
    console.log(storyData.value);

  bookIndex.value = (storyData.value.data).map(chap => ({
    chap_number: chap.chap_number,
    chapter_title: chap.chapter_title,
  }));


}
function gotoChap(chap_number) {
  router.push({
    name: "chap-detail",
    params: {
      id: props.storyId,
      chapId: chap_number
    }
  });
}
onMounted(async () => {
  await fetchChapter();
});
const activeName = ref('first')
const handleOpen = (key, keyPath) => {
  console.log("Open:", key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log("Close:", key, keyPath);
};
const bookmark = ref([])
const bookIndex = ref([])
</script>
<style scoped>
.list-menu {
  padding: 0;
}

.list-menu p {
  line-height: 1.5rem;
}
</style>
