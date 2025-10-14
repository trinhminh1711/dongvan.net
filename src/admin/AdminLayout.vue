<template>
  <div class="admin-layout">
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
}
.sidebar {
  width: 220px;
  background: #1e1e2f;
  color: white;
  min-height: 100vh;
  padding: 1rem;
}
.content {
  flex: 1;
  padding: 1rem;
}
</style>
