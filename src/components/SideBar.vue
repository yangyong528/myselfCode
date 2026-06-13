<template>
    <el-aside width="200px">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item @click="handleSelect(value.path)" v-for="value in router.options.routes[0].children" :key="value.path" :index="value.path">
          <el-icon><component :is="value.meta.icon" /></el-icon>
          <span>{{value.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { iconMenu, document, setting } from '@element-plus/icons-vue'
const activeIndex = ref('1')
const router = useRouter() 
console.log(router)
// 二级菜单点击事件
const handleOpen = (key) => {
    console.log(key)
}
// 二级菜单关闭事件
const handleClose = (key) => {
    console.log(key)
}
const handleSelect = (index) => {
  debugger
    router.push(index)
    // router.push("back/knowledge")
}
</script>