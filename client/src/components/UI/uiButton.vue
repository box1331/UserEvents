<template>
    <button class="ui-button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ui-button'
}
</script>

<style scoped>
.ui-button {
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 3px;
  font-size: 18px;
  box-sizing: border-box;
  min-width: 100px;
}
</style>