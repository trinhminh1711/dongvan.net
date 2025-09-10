<template>
    <div class="container">
        <div class="row">
            <el-tabs v-model="activeName" class="tab-name__center">
                <el-tab-pane label="Đăng truyện mới" name="first">
                    <Create @created-success="handleTabChange" />
                </el-tab-pane>
                <el-tab-pane label="Đăng chương mới" name="second">
                    <CreateNewTrap />
                </el-tab-pane>
                <el-tab-pane label="Truyện đã đăng" name="third">
                    <ListStoryUpdate />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import type { TabsPaneContext } from 'element-plus'
import Create from '@/components/create-story/create.vue'
import CreateNewTrap from '@/components/create-story/CreateNewTrap.vue'
import CreateNewTrapForm from '@/components/create-story/CreateNewTrapForm.vue'
import ListStoryUpdate from '@/components/create-story/ListStoryUpdate.vue'
const activeName = ref('first')
onMounted(() => {
  if (route.query.tab) {
   activeName.value = (route.query.tab as string) || "first";
  }
});
function handleTabChange(tabName) {
  activeName.value = tabName
}
</script>

<style>

</style>