<template>
	<div id="afterLogin">
		<headerCom></headerCom>	
		<asideCom></asideCom>
		<mainCom></mainCom>
	</div>
</template>

<script>
	import asideCom from './satcomponents/asideCom'
	import mainCom from './satcomponents/mainCom'
	import headerCom from './satcomponents/headerCom'
	export default {
		data(){
			return {

			}
		},
		components:{
			asideCom,
			headerCom,
			mainCom
		},
	}
</script>

<style scoped>
	#afterLogin{
		height: 100%;
		width: 100%;
	}
</style>