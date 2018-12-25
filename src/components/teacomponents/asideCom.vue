<template>
	<div id="aside">
		<img src="@/assets/login.png" 
			style="position:absolute;
			left:7px;
			top:20px;
			z-index:100;
		">
		<el-menu 
			:default-active="activeIndex" 
			class="el-menu" 
		>
			<el-menu-item index="1" >
				<i class="el-icon-setting"></i>
				<router-link to="/teacher/teaketi">课题发布</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<i class="bfui-icon-user" style="margin:7px;"></i>
				<router-link to="/teacher/teaXiaozu">课题信息</router-link>
			</el-menu-item>
			<el-menu-item index="3" >
				<i class="el-icon-document"></i>
				<router-link to="/teacher/teazuoye">作业信息</router-link>
			</el-menu-item>
			<el-menu-item index="4" @click="goOut">
				<i class="bfui-icon-sign-out" style="margin:5px;"></i>
				退出登录
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				activeIndex: '1',
			};
		},
		methods: {
			goOut() {
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped lang="less">
	#aside{
		font-size: 20px;
		height: 100%;
		width: 20%;
		position: fixed;
		left: 0px;
		top: 0px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: center;
		.el-menu {
			height: 100%;
			display: flex;
			flex-direction: column ;
			align-content: center;	
			justify-content: center;	
			font-size: 50px;
			.el-menu-item {
				font-size: 20px;
			}
		}
	}


</style>