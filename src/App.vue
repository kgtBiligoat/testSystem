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
input{
  width: 370px;
  height: 33px;
  outline: none; 
  font-size: 25px;
  padding-left: 30px;
}
button{
    width: 200px;
    height: 50px;
    background: rgba(0,0,0,.1);
    outline: none;
    border: 0px;
    border-radius: 10px;
    font-size: 24px;
    transition: all .3s ease-out;

  }
button:hover{
  cursor: pointer;
  transform: translateY(-1px);
  box-shadow: 1px 1px 10px; 
}
</style>
