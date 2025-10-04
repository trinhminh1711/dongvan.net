<template>
    <h3 class="list-title text-color_primary mb-4">{{ content }}</h3>
    <div class="list-container">
        <slot name="author-top3">
        </slot>
        <div v-for="(item, index) in items" :key="index" class="list-item">
            <p>
                <span  :class="{ 'active-top': index < 2 }" :style="{ backgroundImage: index == 0 ? `url(${top2Icon})` : index == 1 ? `url(${top3Icon})` : 'none'}" class="text-color_primary fw-bold">{{ index + 2 }}</span>
                <span class="ps-3">{{ item.username }}</span>
            </p>
            <span class="text-color__tertiary">{{ item.total_reads }} lượt đọc</span>
        </div>
    </div>
</template>

<script>
import top2Icon from '@/assets/icon/icon-top2-author.png'
import top3Icon from '@/assets/icon/icon-top3-author.png'
export default {
    data() {
        return {
            top2Icon, top3Icon
        }
    },
    props: {
        items: {
            type: Array,
            default: () => []
        },
        content: {
            type: String,
            default: "Top độc giả"
        },
    }
}
</script>

<style scoped>
.list-title {
    font-weight: bold;
    text-align: left;
}

.author-card__img img {
    max-width: 50px;
}

.list-item {
    text-align: left;
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    border-bottom: solid 1px #E4E7EC;
}
.active-top
{
    background-image: url(/src/assets/Icon/icon-top2-author.png);
    background-size: contain;
    padding: 0 7px 7px 5px;
    color: #fff;
    background-repeat: no-repeat;
}
</style>
