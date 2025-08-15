<template>
    <div class="container">
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-6">
                <img src="@/assets/image/sieucapcungchieu.png" alt="">
                <div class="left-content">
                    <h4 class="text-color_primary fw-bold">{{ stories.title }}</h4>
                    <p class="left-content__author text-color__tertiary text-md">{{ stories.author }}</p>
                    <p class="color-red fst-italic"><span class="fw-bold text-md">{{ stories.chapterCount }}</span><span class="text-md">
                            chương</span></p>
                    <p class="text-sm"> Chương đang đọc: [Chương 1] Trùng Sinh Tỉnh Lại </p>
                     <button class="btn-alert my-4">Đọc ngay</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
const currentPage = 1
const categoryList = [
    {
        id: 1, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 2, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 3, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 4, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 5, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 6, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 7, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 8, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
    {
        id: 9, // định danh duy nhất
        title: 'Siêu Cấp Cưng Chiều',
        author: 'Mạch Văn',
        description: 'Bên Nhau Trọn Đời” là một câu chuyện tình yêu nhẹ nhàng nhưng sâu sắc giữa Hà Dĩ Thâm – chàng luật sư lạnh lùng, tài giỏi và Triệu Mặc Sênh – cô nhiếp ảnh gia mạnh mẽ, độc lập.Không có quá nhiều cao trào hay biến cố gay gắt, truyện cuốn hút người đọc bằng cách xây dựng tâm lý nhân vật tinh tế, lời thoại thâm thúy và tình cảm chân thành không phô trương.',
        imageUrl: '@/assets/image/sieucapcungchieu.png',
        chapterCount: 567
    },
];
function handlePageChange(page) {
  console.log('Trang mới:', page) // In ra số trang
}
</script>

<style scoped>
.box-left__content {
    display: flex;
    padding: 10px;
}

.box-left__content .left-content {
    padding: 10px 15px;
}

.left-content__desc {
    display: -webkit-box;
    /* cần cho multi-line clamp */
    -webkit-line-clamp: 4;
    /* số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    /* hướng hộp */
    overflow: hidden;
}
.box-left__content h4
{
    font-size: 22px;
}
</style>