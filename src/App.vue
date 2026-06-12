<template>
  <el-button type="primary" size="small">按钮</el-button>
  <el-button type="primary" size="small">按钮</el-button>
  <el-button type="primary" size="small">按钮</el-button>
  <el-input v-model="input" style="width: 240px" placeholder="Please input" />
  <router-view></router-view>
</template>


<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>
