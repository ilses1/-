// 1.单独维护pinia
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
// 完整写法
// import { useUserStore } from './user'
// export { useUserStore }

// 简写
// 从 x 中导入 所有成员 ,再统一导出
export * from './user'
export * from './consult'
