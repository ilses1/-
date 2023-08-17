<script setup lang="ts">
// 1.点击返回按钮
// 2.porps,标题和右侧按钮文本 title,rightText

import { useRouter } from 'vue-router'

// 3.点击右侧文字按钮要做什么,emit事件
const router = useRouter()
const props = defineProps<{ title: string; rightText?: string; back?: () => void }>()

const emits = defineEmits<{
  (e: 'click-right'): void
}>()
/**
 * 点击左侧按钮返回
 */
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }
  // 返回上一页
  //   如果有记录返回上一页back.
  // 如果没有记录则跳转首页
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}

/**点击右侧文字按钮 */
const onClickRight = () => {
  emits('click-right')
}
</script>

<template>
  <div>
    <van-nav-bar
      left-arrow
      fixed
      :title="title"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<style lang="scss" scoped>
// :deep(.van-nav-bar__arrow) {
//   font-size: 20px;
// }

::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 20px;
      color: var(--cp_text1);
    }

    &___text {
      font-size: 15px;
    }
  }
}
</style>
