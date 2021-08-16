<!--
 * @Author: your name
 * @Date: 2021-08-04 18:28:20
 * @LastEditTime: 2021-08-06 03:06:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\components\MessageArea\DataForm.vue
-->
<template>
  <form
    @submit.prevent="handleSubmit"
    class="data-form-container"
    id="data-form-container"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          class="text"
          maxlength="10"
          type="text"
          v-model="formData.nickname"
          placeholder="用户昵称"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item" ref="container">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="formData.content"
        >
        </textarea>
      </div>
      <span class="tip">{{ formData.content.length }}/300</span>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmiting">
          {{ isSubmiting ? "提交中..." : "提交" }}
        </button>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
  </form>
</template>

<script>
export default {
  // 创建响应式数据与表单内容做实时交互v-model
  data() {
    return {
      isSubmiting: false,
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      // console.log(this.formData.nickname, this.formData.content);
      this.error.nickname = this.formData.nickname ? "" : "请输入昵称";
      this.error.content = this.formData.content ? "" : "请输入内容";
      // 有错误就不提交
      if (this.error.nickname || this.error.content) {
        return;
      } else {
        this.isSubmiting = true;
        // 没有错误就将数据抛给父组件处理 方法  参数  回调函数 父组件处理完数据后携带一些数据通知这里执行回调
        this.$emit("submit", this.formData, (msg) => {
          this.$showMessage({
            content: msg,
            type: "success",
            duration: 1000,
            container: this.$refs.container,
            callback: () => {
              this.isSubmiting = false;
              this.formData.nickname = "";
              this.formData.content = "";
            },
          });
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
  position: relative;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>