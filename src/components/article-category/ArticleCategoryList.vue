<template>
    <div class="container">
        <h2 class="text-color_primary fw-bold">{{ "Truyện Ngôn Tình" }}</h2>
        <p style="background-color: rgba(24, 119, 242, 0.1); border-radius: 5px;" class="color-blue  px-3 py-2 mt-2">
            <span class="fw-bold">Mô tả thể loại:</span> Truyện tập trung vào các mối quan hệ tình cảm lãng mạn, với
            những diễn biến tâm lý, tình tiết
            ngọt ngào hoặc trắc trở của các nhân vật chính.
        </p>
        <div class="row mt-4">
            <div v-for="stories in categoryList" :key="stories.id" class="box-left__content col-4">
                <img src="@/assets/image/sieucapcungchieu.png" alt="">
                <div class="left-content">
                    <h4 class="text-color_primary fw-bold">{{ stories.title }}</h4>
                    <p class="left-content__author text-color__tertiary">{{ stories.author }}</p>
                    <p class="color-red fst-italic"><span class="fw-bold">{{ stories.chapterCount }}</span><span>
                            chương</span></p>
                    <p><img src="@/assets/icon/quote.png" alt="">
                        <desc class="left-content__desc text-sm">
                            {{ stories.description }}
                        </desc>
                    </p>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-4"> 
            <el-pagination @current-change="handlePageChange"  v-model:current-page="currentPage" background layout="prev, pager, next" :total="1000" />
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
</style>