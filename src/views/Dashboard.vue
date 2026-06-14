<template>
  <div class="dashboard-container">
    <h1>数据分析</h1>
    
    <!-- 统计卡片 -->
    <div class="stats-cards">
      <el-card class="stat-card">
        <div class="stat-icon-wrapper bg-pink">
          <span class="stat-icon">�</span>
        </div>
        <div class="stat-content">
          <div class="stat-title">平均时长</div>
          <div class="stat-value">18051.3</div>
          <div class="stat-label">分钟</div>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-icon-wrapper bg-blue">
          <span class="stat-icon">💬</span>
        </div>
        <div class="stat-content">
          <div class="stat-title">总会话数</div>
          <div class="stat-value">8</div>
          <div class="stat-label">今日新增: 0</div>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-icon-wrapper bg-green">
          <span class="stat-icon">👥</span>
        </div>
        <div class="stat-content">
          <div class="stat-title">活跃用户</div>
          <div class="stat-value">2</div>
          <div class="stat-label">今日新增: 0</div>
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
      <el-card title="情绪趋势分析" class="chart-card">
        <div ref="lineChartRef" class="chart"></div>
      </el-card>
      <el-card title="咨询活动统计" class="chart-card">
        <div ref="barChartRef" class="chart"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useAdminStore } from '@/stores/admin'

const lineChartRef = ref(null)
const barChartRef = ref(null)
let lineChart = null
let barChart = null

// 情绪趋势数据
const lineData = {
  dates: ['2026-01-15', '2026-01-20', '2026-01-25', '2026-01-30', '2026-02-04', '2026-02-09'],
  emotionScore: [2.5, 3.2, 7.1, 4.8, 3.5, 2.8],
  recordCount: [0, 0, 5, 3, 2, 1]
}

// 咨询活动数据
const barData = {
  dates: ['2026-01-15', '2026-01-21', '2026-01-27', '2026-02-02', '2026-02-08'],
  sessionCount: [0.5, 1, 2.8, 0.5, 2.8],
  userCount: [0.3, 0.8, 1, 0.4, 1]
}

const initLineChart = () => {
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis',
        // a: series中第一个数组的name a1: series中第二个数组的name
        // b: xAxis X轴的系列名称
        // c: series中第一个数组的数值 c1: series中第二个数组的数值
        // formatter: '{b}<br/>{a0}: {c0} 件<br/>{a1}: {c1} 个 <br/>{a2}: {c2} 个',
        formatter: '{b}<br/>{a}: {c}',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['平均情绪评分', '记录数量'],
        top: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 60,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: lineData.dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '平均情绪评分',
          type: 'line',
          smooth: true,
          data: lineData.emotionScore,
          lineStyle: { color: '#ffd04b' },
          itemStyle: { color: '#ffd04b' }
        },
        {
          name: '记录数量',
          type: 'line',
          smooth: true,
          data: lineData.recordCount,
          lineStyle: { color: '#ff7a45' },
          itemStyle: { color: '#ff7a45' }
        }
      ]
    }
    lineChart.setOption(option)
  }
}

const initBarChart = () => {
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['会话数量', '参与用户数'],
        top: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 60,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: barData.dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '会话数量',
          type: 'bar',
          data: barData.sessionCount,
          itemStyle: { color: '#5470c6' }
        },
        {
          name: '参与用户数',
          type: 'bar',
          data: barData.userCount,
          itemStyle: { color: '#ffc53d' }
        }
      ]
    }
    barChart.setOption(option)
  }
}

const handleResize = () => {
  lineChart?.resize()
  barChart?.resize()
}

onMounted(() => {
  initLineChart()
  initBarChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  lineChart?.dispose()
  barChart?.dispose()
})

// 点击事件pinia切换isCollapse状态值

const handleClick = (index) => {
  console.log('入参:', index)
  console.log(useAdminStore().isCollapse)
  useAdminStore().toggleCollapse()
  console.log(useAdminStore().isCollapse)
}
</script>

<style lang="scss" scoped>
$icon-wrapper-size: 64px;
$icon-wrapper-radius: 16px;
$gap: 20px;
$card-padding: 16px;

.dashboard-container {
  padding: $card-padding;
  
  h1 {
    margin-bottom: $gap;
    font-size: 24px;
    font-weight: bold;
  }
}

.stats-cards {
  display: flex;
  gap: $gap;
  margin-bottom: $gap;
}

.stat-card {
  flex: 1;
  
  :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: $gap;
    padding: $card-padding;
  }
}

.stat-icon-wrapper {
  width: $icon-wrapper-size;
  height: $icon-wrapper-size;
  border-radius: $icon-wrapper-radius;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &.bg-pink {
    background: linear-gradient(135deg, #ff7a85 0%, #ff99ac 100%);
  }
  
  &.bg-blue {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &.bg-green {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  }
}

.stat-icon {
  font-size: 28px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  
  .stat-title {
    font-size: 14px;
    color: #909399;
    margin-bottom: 4px;
  }
  
  .stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    line-height: 1.2;
  }
  
  .stat-label {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
  }
}

.charts-container {
  display: flex;
  gap: $gap;
}

.chart-card {
  flex: 1;
}

.chart {
  height: 300px;
  width: 100%;
}
</style>
