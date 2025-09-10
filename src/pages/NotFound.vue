<template>
    <div class="notfound-container">
        <!-- Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="notfound-icon" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v2m0 4h.01M12 5.25c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7z" />
        </svg>

        <!-- Mã lỗi -->
        <h1 class="notfound-code">404</h1>

        <!-- Text -->
        <p class="notfound-text">Oops! The page you're looking for doesn't exist.</p>

        <!-- Button -->
        <button class="notfound-button" @click="goHome">
            Go back home
        </button>
    </div>
</template>

<script setup>
const goHome = () => {
  window.location.href = "/"; // load lại trang chủ
  // hoặc dùng window.location.assign("/") cũng được
};
</script>

<style scoped>
.notfound-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    background: #f8fafc;
    /* màu nền nhẹ */
    text-align: center;
    padding: 0 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.notfound-icon {
    width: 60px;
    height: 60px;
    color: #E60000;
    margin-bottom: 15px;
}

.notfound-code {
    font-size: 4rem;
    font-weight: bold;
    color: #FF6114;
    margin: 0;
}

.notfound-text {
    font-size: 1rem;
    color:  #FF6114;
    margin: 10px 0 20px;
}

.notfound-button {
    display: inline-block;
    border: none;
    padding: 10px 20px;
    font-size: 0.9rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(to right, #E60000, #FF6114);
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.notfound-button:hover {
    background-color: #ff4c4c;
    transform: scale(1.05);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}
</style>
