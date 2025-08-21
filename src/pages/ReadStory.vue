<template>
    <div class="tab-bar">
        <button><el-icon style="color: white; font-size: 24px;">
                <ArrowLeft />
            </el-icon>
        </button>
        <h4 class="text-white fw-bold text-md">Gặp Anh, Gặp Ánh Mặt Trời</h4>
        <div class="button-function">
            <button @click="drawer = true, showOption = true"><img style="max-width: 40px;"
                    src="@/assets/icon/bookmark-add.png" alt=""></img></button>
            <button @click="drawer = true, showOption = true"><img style="max-width: 40px;" src="@/assets/icon/icon-list.png"
                    alt=""></img></button>
            <button @click="drawer = true, showOption = false"><img style="max-width: 40px;" src="@/assets/icon/icon-fontsize.png" alt=""></img></button>
            <button><img style="max-width: 40px;" src="@/assets/icon/icon-maximize.png" alt=""></img></button>
        </div>
    </div>
    <div class="container mt-3">
        <div class="story">
            <p>Điện thoại rung lên lần thứ ba liên tiếp lúc 00:17.</p>
            <p>Viên An nằm im trong bóng tối, ánh sáng mờ từ chiếc điện thoại đặt trên bàn học hắt lên trần nhà, khiến
                căn phòng nhỏ trở nên chập chờn như có điều gì sắp sửa bắt đầu.</p>
            <p>Cô với tay, mở khóa màn hình. Tin nhắn từ Lâm Duy – người bạn học cùng lớp, cũng là người mà cô luôn cố
                tình lờ đi cảm xúc mỗi khi nhắc tới.</p>
            <p>"Cậu ngủ chưa?"</p>
            <p>Câu hỏi thật đơn giản, nhưng đủ khiến lòng cô lặng đi vài nhịp.</p>
            <p>Sau vài giây do dự, cô đáp lại: "Chưa. Có chuyện gì sao?"</p>
            <p>Phải gần một phút sau mới thấy hồi âm.</p>
            <p>"Không có gì... Chỉ là hôm nay nhìn thấy trời có sao, nhớ ra một chuyện cũ. Muốn kể với cậu."</p>
            <p>Viên An dựa lưng vào tường, tay siết chặt chiếc điện thoại. Trời hôm nay có sao? Cô chưa kịp để ý – ngày
                trôi nhanh đến mức bản thân chẳng buồn ngước lên nhìn bầu trời nữa.</p>
            <p>"Là chuyện gì?"</p>
            <p>"Hồi lớp 10, hôm tớ bị điểm kém môn Toán, cả buổi chiều ngồi lì ở sân bóng. Cậu đã lén để một chai sữa
                vào ngăn bàn tớ, còn ghi giấy: ‘Thất bại lần này không có nghĩa là cậu tệ. Ngày mai cố gắng tiếp nhé!’."
            </p>
            <p>Viên An thoáng sững lại. Cô không ngờ cậu còn nhớ chuyện nhỏ như vậy. Khi ấy cô nghĩ, chỉ cần giúp cậu ấy
                cảm thấy dễ chịu hơn một chút, là đủ rồi. Không cần ai biết.</p>
            <p>"Tớ không nghĩ cậu còn nhớ chuyện đó."</p>
            <p>"Tớ không những nhớ… mà còn giữ tờ giấy đó đến giờ."</p>
            <p>Tim Viên An đập mạnh. Đến mức cô có thể nghe thấy rõ tiếng của nó giữa đêm yên tĩnh.</p>
            <p>"Vì sao?"</p>
            <p>Một lúc sau, Lâm Duy nhắn lại, lần này không còn vòng vo:</p>
            <p>"Vì lúc đó, tớ nhận ra – có một người âm thầm để ý đến tớ nhiều hơn tớ tưởng. Và từ khoảnh khắc ấy, tớ
                cũng bắt đầu để ý đến cậu."</p>
            <p>Không có tin nhắn nào từ cô gửi lại ngay lập tức.</p>
            <p>Viên An nhìn chằm chằm vào màn hình, rồi mím môi cười nhẹ.</p>
            <p>Một dòng chữ đang hiện lên: "Đang nhập…". Cô biết cậu đang chờ đợi.</p>
            <p>Cô đặt điện thoại xuống, bước đến cửa sổ. Bầu trời đêm nay thực sự có sao – lấp lánh, yên bình như một
                điều kỳ diệu bị bỏ quên.</p>
            <p>Cô trở lại giường, nhắn:</p>
            <p>"Vậy thì… cậu có muốn nghe một bí mật không?"</p>
            <p>"Ừ."</p>
            <p>"Tớ là người để chai sữa đó thật. Và tớ đã thích cậu từ cái hôm cậu nhường ô cho một bạn nữ lạ dưới mưa."
            </p>
        </div>

    </div>
    <el-drawer v-model="drawer" direction="rtl" size="400px">
        <template #header>
            <div class="flex items-center justify-between w-full">
                <!-- <h3 class="text-lg fw-bold">Danh sách</h3> -->
            </div>
        </template>
        <MenuBar v-if="showOption" />
        <MenuEditUI v-if="!showOption" />
    </el-drawer>
</template>

<script lang="ts" setup>
import MenuBar from '@/components/read-story/MenuBar.vue';
import MenuEditUI from '@/components/read-story/MenuEditUI.vue';
import { ref } from "vue";
const drawer = ref(false);
const showOption = ref(false)
</script>

<style>
.tab-bar {
    background-color: #3E3D43;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 50px
}

.button-function {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tab-bar button {
    background: none;
    border: none;
}

.el-drawer__header {
    margin: 0;
}
</style>