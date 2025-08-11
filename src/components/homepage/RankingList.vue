<template>
    <div class="d-flex justify-content-center  pb-4 gap-3">
        <slot name="header"></slot>
    </div>
    <div class="list-topvote">
        <div v-for="(item, index) in items" :key="index" class="topvote-item align-items-start justify-content-between d-flex text-start py-2">
            <div class="d-flex align-items-start">
                <img class="top-icon" v-if="index == 0" :src="rankingIcon1" alt="" srcset="">
                <img class="top-icon" v-if="index == 1" :src="rankingIcon2" alt="" srcset="">
                <img class="top-icon" v-if="index == 2" :src="rankingIcon3" alt="" srcset="">
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
import rankingIcon1 from '@/assets/icon/icon-ranking1.png'
import rankingIcon2 from '@/assets/icon/icon-ranking2.png'
import rankingIcon3 from '@/assets/icon/icon-ranking3.png'
import imageThumbail from '@/assets/image/img-vote.png'
export default {
    data() {
    return {
     rankingIcon1,rankingIcon2,rankingIcon3,imageThumbail
    }
  },
    props: {
        items: {
            type: Array,
            default: () => [
                { title: "Trận Vấn Trường", numberVote: "222.2", author: "Jung Yun-kang", imgSrc: imageThumbail },
                { title: "Lan Nhược Tiên Duyên", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Trận Vấn Trường Sinh", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Đạo Đồ Thần Tọa", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Bỉ Ngạn Chi Chủ", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Cẩu Tại Sơ Thánh Ma Môn", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Không Có Tiền Tu Cái Gì Tiên?", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Cửu Vực Phàm Tiên", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Bách Thế Phi Thăng", numberVote: "222.2", imgSrc: imageThumbail },
                { title: "Đạo Đồ Thần Tọa", numberVote: "222.2", imgSrc: imageThumbail },

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