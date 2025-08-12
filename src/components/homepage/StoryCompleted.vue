<template>
    <h3 class="text-color_primary fw-bold mb-4">Truyện Đã Hoàn Thành</h3>
    <div class="row d-flex align-items-center">
        <div class="col-3">
            <div class="box-img__vertical d-flex flex-column gap-2">
                <img class="img-boxshadow" src="@/assets/image/story-completed.png" alt="">
                <p class="text-center">Nửa Chừng Xuân</p>
                <p class="text-center color-alert text-md mt-1">
                    <span class="fw-bold"> 290 </span> chương
                </p>
                <p class="text-sm text-center">Mong các đạo hữu ủng hộ truyện và Converter bằng các cách sau: -
                    Vote 5*, bấm 2 chương tiếp để</p>
                <p class="text-center mt-2"> <button class="btn-alert__rounded">Đọc truyện</button></p>
            </div>
        </div>
        <div class="list-container col-9">
            <div class="row">
                <div v-for="(item, index) in storyCompleted" class="card-story-completed col-4 px-4 pb-3">
                    <p class="d-flex align-items-center d-flex justify-content-between border-bottom mb-3">
                        <span class="fw-bold">{{ item.category }}</span>
                        <img :src="item.image" alt="">
                    </p>
                    <p v-for="(detail, key) in item.content">
                        <span class="text-sm">[{{ detail.author }}]</span> <span
                            class="text-color_primary fw-bold text-sm">{{ detail.name
                            }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row d-flex align-items-center mt-4">
        <div class="col-3">
            <div class="box-img__vertical d-flex flex-column gap-2">
                <img class="img-boxshadow" src="@/assets/image/story-completed2.png" alt="">
                <p class="text-center">Nửa Chừng Xuân</p>
                <p class="text-center color-alert text-md mt-1">
                    <span class="fw-bold"> 290 </span> chương
                </p>
                <p class="text-sm text-center">Mong các đạo hữu ủng hộ truyện và Converter bằng các cách sau: -
                    Vote 5*, bấm 2 chương tiếp để</p>
                <p class="text-center mt-2"> <button class="btn-alert__rounded">Đọc truyện</button></p>
            </div>
        </div>
        <div class="list-container col-9">
            <div class="row">
                <div v-for="(item, index) in storyCompleted2" class="card-story-completed col-4 px-4 pb-3">
                    <p class="d-flex align-items-center d-flex justify-content-between border-bottom mb-3">
                        <span class="fw-bold">{{ item.category }}</span>
                        <img :src="item.image" alt="">
                    </p>
                    <p v-for="(detail, key) in item.content">
                        <span class="text-sm">[{{ detail.author }}]</span> <span
                            class="text-color_primary fw-bold text-sm">{{ detail.name
                            }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-card-image mt-5">
        <div class="d-flex flex-column align-items-center gap-2 py-3" v-for="(item, index) in storycCompletedBottom">
            <img style="max-width: 70px; box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px;" :src="item.imgUrl" alt="">
            <p class="text-color_primary fw-bold text-md">{{ item.name }}</p>
            <small class="d-block"> {{ item.genre }} </small>
            <button class="btn-outline">Đọc ngay</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            storyCompleted: [
                {
                    category: "Linh dị",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed1.png', import.meta.url).href
                },
                {
                    category: "Trinh thám",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed2.png', import.meta.url).href
                },
                {
                    category: "Truyện ngắn",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed3.png', import.meta.url).href
                },
                {
                    category: "Lịch sử",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed4.png', import.meta.url).href
                },
                {
                    category: "Ngôn tình",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed5.png', import.meta.url).href
                },
                {
                    category: "Thơ",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed6.png', import.meta.url).href
                }

            ],
            storyCompleted2: [
                {
                    category: "Huyền ảo",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed7.png', import.meta.url).href
                },
                {
                    category: "Cổ đại",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed8.png', import.meta.url).href
                },
                {
                    category: "Tản văn",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed9.png', import.meta.url).href
                },
                {
                    category: "Viễn tưởng",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed10.png', import.meta.url).href
                },
                {
                    category: "Hiện thực",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed11.png', import.meta.url).href
                },
                {
                    category: "Tất cả",
                    content: [
                        { author: "Bố Cốc Liêu", name: "Tiên Lục" },
                        { author: "Phạm A Lâm", name: "Ta Tại Sông Vô Định Vớt" },
                        { author: "Tiêu Tiềm", name: "Ất Mộc Tu Tiên Lục" },
                        { author: "Đổng Cầu Đế", name: "Lục Nhân Thiên Kiêu" },
                        { author: "Bán Hồ Sinh Khương", name: "Tộc Trưởng Mang" },
                    ],
                    image: new URL('@/assets/icon/category-completed12.png', import.meta.url).href
                }

            ],
            storycCompletedBottom:
                [
                    { name: "Trăng và máu", genre: "Truyện ngắn", imgUrl: new URL('@/assets/image/img-complete-bottom1.png', import.meta.url).href },
                    { name: "Trong rừng nho", genre: "Hiện thực", imgUrl: new URL('@/assets/image/img-complete-bottom2.png', import.meta.url).href },
                    { name: "Nô lệ", genre: "Truyện ngắn", imgUrl: new URL('@/assets/image/img-complete-bottom3.png', import.meta.url).href },
                    { name: "Lều chõng", genre: "Hiện thực", imgUrl: new URL('@/assets/image/img-complete-bottom4.png', import.meta.url).href },
                    { name: "Điếu văn", genre: "Truyện ngắn", imgUrl: new URL('@/assets/image/img-complete-bottom5.png', import.meta.url).href },
                    { name: "Duyên số", genre: "Truyện ngắn", imgUrl: new URL('@/assets/image/img-complete-bottom1.png', import.meta.url).href },
                    { name: "Giông tố", genre: "Hiện thực", imgUrl: new URL('@/assets/image/img-complete-bottom2.png', import.meta.url).href },
                ]
        }
    },

}
</script>

<style scoped>
.box-img__vertical img {
    max-width: 100px;
    display: block;
    margin: 0 auto;
}

.box-img__vertical {
    padding: 40px 0;
    border-radius: 10px;
    background: linear-gradient(to bottom,
            #E2EBF3 0%,
            #E2EBF3 55%,
            #FFFFFF 70%,
            #FFFFFF 100%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.bottom-card-image {
    display: flex;
    gap: 20px
}

.bottom-card-image>div {
    flex: 1
}

.bottom-card-image>div:nth-child(even) {
    background-color: #f7f6f2;
}
.img-boxshadow
{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px;;
}
</style>
