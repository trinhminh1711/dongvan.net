<template>
    <h3 class="list-title text-color_primary mb-4">{{ content }}</h3>
    <div class="row">
        <div class="list-container col-6">
            <div v-for="(item, index) in items" :key="index" class="list-item">
                <span class="ps-3">{{ item.nameStory }}</span>
                <span class="text-color__tertiary">{{ item.update_at }}</span>
            </div>
        </div>
        <div class="list-container col-6">
            <div v-for="(item, index) in items" :key="index" class="list-item">
                <span class="ps-3">{{ item.nameStory }}</span>
                <span class="text-color__tertiary">{{ item.update_at }}</span>
            </div>
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
            default: () => [
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
                { nameStory: "Hỏa Tinh Già Phê", update_at: "17:03 08/07" },
            ]
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

.active-top {
    background-image: url(/src/assets/Icon/icon-top2-author.png);
    background-size: contain;
    padding: 0 7px 7px 5px;
    color: #fff;
    background-repeat: no-repeat;
}
</style>
