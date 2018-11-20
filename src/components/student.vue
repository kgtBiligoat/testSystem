<template>
	<div id="afterLogin">
		<headerCom></headerCom>	
		<asideCom></asideCom>
		<mainCom></mainCom>
	</div>
</template>

<script>
	import asideCom from './satcomponents/asideCom'
	export default {
		data(){
			return {

			}
		},
		components:{
			asideCom
		},
	}
</script>

<style scoped>
	#afterLogin{
		height: 100%;
		width: 100%;
	}
</style>