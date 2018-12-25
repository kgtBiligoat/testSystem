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
html,body,#app{
  
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
#app{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
a {
  text-decoration: none;
  color:#47566E;
}
        .el-tabel {
            width: 920px;
        }

</style>
