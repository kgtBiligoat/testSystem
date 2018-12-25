<template>
	<div id="afterLogin">
		<headerCom></headerCom>	
		<asideCom></asideCom>
		<mainCom></mainCom>
	</div>
</template>

<script>
	import asideCom from './teacomponents/asideCom'
	import mainCom from './teacomponents/mainCom'
	import headerCom from './teacomponents/headerCom'
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