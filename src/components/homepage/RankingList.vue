<template>
    <div class="d-flex justify-content-center  pb-4 gap-3">
        <slot name="header"></slot>
    </div>
    <div class="list-topvote">
        <div v-for="(item, index) in items" :key="index" class="topvote-item align-items-start justify-content-between d-flex text-start py-2">
            <div class="d-flex align-items-start">
                <img class="top-icon" v-if="index == 0" src="/src/assets/icon/icon-ranking1.png" alt="" srcset="">
                <img class="top-icon" v-if="index == 1" src="/src/assets/icon/icon-ranking2.png" alt="" srcset="">
                <img class="top-icon" v-if="index == 2" src="/src/assets/icon/icon-ranking3.png" alt="" srcset="">
                <span v-if="index > 2" class="color-gray fw-bold mx-2"> {{ index < 9 ? '0' + (index + 1) : index + 1
                }}</span>
                        <div>
                            <p>{{ item.title }}</p>
                            <p class="text-sm text-color__tertiary" v-if="index == 0">{{ item.author }}</p>
                            <p class="text-sm text-color__tertiary" v-if="index == 0">{{ item.numberVote }} đề cử</p>
                        </div>
            </div>
            <div>
                <img v-if="index == 0" :src="item.imgSrc" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [
                { title: "Trận Vấn Trường", numberVote: "222.2", author: "Jung Yun-kang", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Lan Nhược Tiên Duyên", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Trận Vấn Trường Sinh", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Đạo Đồ Thần Tọa", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Bỉ Ngạn Chi Chủ", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Cẩu Tại Sơ Thánh Ma Môn", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Không Có Tiền Tu Cái Gì Tiên?", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Cửu Vực Phàm Tiên", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Bách Thế Phi Thăng", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },
                { title: "Đạo Đồ Thần Tọa", numberVote: "222.2", imgSrc: "/src/assets/image/img-vote.png" },

            ]
        },
        content: {
            type: String,
            default: "Người Đọc Đề Cử"
        },
    }
}
</script>

<style scoped>
.topvote-item .top-icon {
    width: 30px;
}
</style>