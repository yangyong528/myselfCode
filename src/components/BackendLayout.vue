<!-- <template>
  <div> -->
    
 
    <!-- <el-menu>
      <el-menu-item index="1">首页菜单0612</el-menu-item>
    </el-menu>
    <el-menu>
      <el-menu-item @click="handleSelect('2')" index="2">菜单2026</el-menu-item>
    </el-menu> -->
    <!-- <router-view></router-view> -->
  <!-- </div>
</template> -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
          <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import SideBar from './SideBar.vue'
const activeIndex = ref('1')
const handleSelect = (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
}
</style>