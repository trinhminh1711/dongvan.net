<template>
    <div>
        <h2>Top Tác Giả Mới Của Tuần</h2>
        <div class="row gap-3 flex-nowrap mt-3">
            <div v-for="item in authors" class="image-box col-4 gap-y-5">
                <p class="d-flex align-items-center gap-2">
                    <img :src="item.avatarImg" alt=""> <span class="fw-bold text-color_primary">{{ item.name }}</span>
                </p>
                <p class="text-start py-3"><span class="color-light-gray">Tác phẩm tiêu biểu: </span> <span
                        class="fw-bold text-color_primary">《 {{item.featuredWorks}} 》</span>
                </p>
                <p class="text-start"><span class="color-light-gray">Huy hiệu: </span> <span
                        class="fw-bold text-color_primary">Tác giả cấp {{ item.authorLevel }}</span></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const authors = [
    { avatarImg : new URL('@/assets/image/TopAuthorWeek.jpg', import.meta.url).href, name: "Lộc Hàm", featuredWorks: "Đạo đồ thần tọa", authorLevel: 3 },
    { avatarImg : new URL('@/assets/image/TopAuthorWeek2.jpg', import.meta.url).href , name: "Trương Nhã Hân ", featuredWorks: "Đạo đồ thần tọa", authorLevel: 2 },
    { avatarImg : new URL('@/assets/image/TopAuthorWeek3.jpg', import.meta.url).href , name: "Tăng Dĩ Phàm", featuredWorks: "Đạo đồ thần tọa", authorLevel: 2 },
]
</script>

<style scoped>
.image-box{
padding: 20px;
    border: solid 1px #E4E7EC;
    border-radius: 10px;
}
.image-box img {
    max-width: 40px;
  
}
</style>