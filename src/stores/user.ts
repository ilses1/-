import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1.用户信息
    const user = ref<User>()
    // 2.修改用户信息
    const setUser = (u: User) => {
      user.value = u
    }
    // 3.删除用户信息
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    // 开启本地存储,默认local
    persist: {
      key: 'patient-user'
    }
  }
)
