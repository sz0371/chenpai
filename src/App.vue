<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app,
#app > div {
  min-height: 100%;
  height: 100%;
  margin: 0;
}
#app > div {
  font-size: 0;
}
.box-container {
  min-height: calc(100% - 5rem);
}
img {
  width: 100%;
}
#app {
  position: relative;
  font-family: Arial, sans-serif, 'Microsoft YaHe';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow-x: hidden;
}
</style>
