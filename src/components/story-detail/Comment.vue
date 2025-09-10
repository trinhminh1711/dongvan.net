<template>
    <div>
        <InputComment :story_id="Number(props.story_id)"  />
    </div>
    <PostComment v-for="value in listComment" :comment_id = "value.comment_id" :like ="value.like" :user="value.username" :user_thumbnail="value.link_thumbnail" :comment="value.content" :date="value.created_at" />
</template>

<script lang="ts" setup>
import { onMounted ,ref} from "vue";
import InputComment from '../forum-page/InputComment.vue';
import PostComment from '../forum-page/PostComment.vue';
import { getStoryComment } from "@/api/stories";
const props = defineProps({
    story_id: {
        type: Number,
        default: () => []
    },
});
async function getComment() {
    const res = await getStoryComment(Number(props.story_id))
    listComment.value = res.data;
    console.log(res);
    
}
onMounted(async () => {

    await getComment();
    

});
const listComment = ref([])
</script>

<style></style>