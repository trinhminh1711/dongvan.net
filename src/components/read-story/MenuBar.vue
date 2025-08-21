<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Mục lục" name="first">
      <ul class="list-menu" style="list-style: none;">
        <li class="my-3" v-for="value in bookIndex" :key="index">
          <p class="fw-bold">{{ value.text }}</p>
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
const activeName = ref('first')
const handleOpen = (key, keyPath) => {
  console.log("Open:", key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log("Close:", key, keyPath);
};
const bookmark =
  [{ text: "Mục lục chương 1: Cà Phê Đen Và Mắt Nâu", date: "20/07/2025" },
  { text: "Mục lục chương 2: Tin Nhắn Lúc Nửa Đêm", date: "20/07/2025" },
  { text: "Mục lục chương 3: Bất Ngờ Làm Bạn Cùng Nhóm", date: "20/07/2025" },
  { text: "Mục lục chương 4: Anh Là Ai Trong Em?", date: "20/07/2025" }
  ]
const bookIndex = [
  { text: "Chương 1: Cà Phê Đen Và Mắt Nâu", isPayfee: false },
  { text: "Chương 2: Tin Nhắn Lúc Nửa Đêm", isPayfee: false },
  { text: "Chương 3: Bất Ngờ Làm Bạn Cùng Nhóm", isPayfee: true },
  { text: "Chương 4: Anh Là Ai Trong Em?", isPayfee: true },
  { text: "Chương 5: Ghen – Cảm Giác Lần Đầu Biết Đến", isPayfee: true },
  { text: "Chương 6: Khi Trái Tim Lạc Nhịp", isPayfee: true },
  { text: "Chương 7: Lời Tỏ Tình Trên Sân Thượng", isPayfee: true},
  { text: "Chương 8: Một Cuộc Gọi, Một Lần Xa Cách", isPayfee: true },
  { text: "Chương 10: Trở Lại Bên Nhau, Trưởng Thành Hơn", isPayfee: true },
  { text: "Chương 11: Khi Trái Tim Lạc Nhịp", isPayfee: true },
  { text: "Chương 12: Gặp Anh – Điều Đẹp Đẽ Nhất", isPayfee: true},
  { text: "Chương 13: Khi Trái Tim Lạc Nhịp", isPayfee: true},
  { text: "Chương 14: Anh Là Ai Trong Em?", isPayfee: true},
]
</script>
<style scoped>
.list-menu {
  padding: 0;
}

.list-menu p {
  line-height: 1.5rem;
}
</style>
