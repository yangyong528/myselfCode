<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <h2 class="login-title">用户登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名/邮箱</label>
          <input type="text" id="username" v-model="form.username" :class="{ 'is-invalid': errors.username }"
            placeholder="请输入用户名或邮箱" required />
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="form.password" :class="{ 'is-invalid': errors.password }"
            placeholder="请输入密码" required />
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>

        <div class="form-group form-check">
          <input type="checkbox" id="remember" v-model="form.remember">
          <label for="remember">记住我</label>
        </div>

        <div v-if="loginError" class="login-error">{{ loginError }}</div>

        <button type="submit" class="login-button" :disabled="isSubmitting">
          {{ isSubmitting ? '登录中...' : '登录' }}
        </button>

        <div class="form-footer">
          <a href="#" @click.prevent="handleForgotPassword">忘记密码？</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false
      },
      errors: {
        username: '',
        password: ''
      },
      loginError: '',
      isSubmitting: false
    }
  },
  methods: {
    validateForm() {
      let isValid = true

      // 重置错误信息
      this.errors.username = ''
      this.errors.password = ''
      this.loginError = ''

      // 验证用户名
      if (!this.form.username.trim()) {
        this.errors.username = '请输入用户名或邮箱'
        isValid = false
      }

      // 验证密码
      if (!this.form.password) {
        this.errors.password = '请输入密码'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.errors.password = '密码长度至少6位'
        isValid = false
      }

      return isValid
    },
    handleLogin() {
      if (!this.validateForm()) {
        return
      }

      this.isSubmitting = true

      // 模拟登录请求
      setTimeout(() => {
        // 这里可以替换为实际的登录API调用
        if (this.form.username === 'admin' && this.form.password === '123456') {
          // 登录成功，存储token等信息
          if (this.form.remember) {
            // 记住密码逻辑
            localStorage.setItem('username', this.form.username)
          } else {
            localStorage.removeItem('username')
          }

          // 跳转到首页或其他页面
          this.$router.push('/')
        } else {
          this.loginError = '用户名或密码错误'
        }
        this.isSubmitting = false
      }, 1000)
    },
    handleForgotPassword() {
      // 忘记密码逻辑
      alert('忘记密码功能待实现')
    }
  },
  mounted() {
    // 从本地存储中获取记住的用户名
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      this.form.username = savedUsername
      this.form.remember = true
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form-wrapper {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #409eff;
}

.form-group input.is-invalid {
  border-color: #f56c6c;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-check input {
  margin-right: 8px;
  width: auto;
}

.login-error {
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #66b1ff;
}

.login-button:disabled {
  background-color: #c0c4cc;
  cursor: not-allowed;
}

.form-footer {
  margin-top: 20px;
  text-align: right;
}

.form-footer a {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
