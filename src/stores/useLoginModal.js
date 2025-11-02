import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginModal = defineStore('loginModal', () => {
  const isVisible = ref(false)
  const open = () => (isVisible.value = true)
  const close = () => (isVisible.value = false)

  return { isVisible, open, close }
})