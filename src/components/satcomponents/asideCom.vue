<template>
	<div id="aside">
		<div class="userMes">
			用户类型：
			用户名：
		</div>
		<div class="operate">
			<ul>
				<li v-for="item in msg">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				msg:['基本信息修改','作业信息','登出']
			}
		}
	}
</script>

<style scoped>
	#aside{
		height: 100%;
		width: 30%;
		background: rgba(255,100,0,.5);
		position: fixed;
		left: 0px;
		top: 0px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-content: center;
	}
	.userMes{
		height: 20%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;

	}
	.operate{
		height: 80%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
	}
	ul{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		margin: 0px;
		padding: 0px;
	}
	ul li{
		transform: translateY(-90px);
		text-align: center;
		width: 100%;
		font-size: 29px;
		list-style: none;
		margin-top: 20px;
		color: rgba(0,0,0,.5);
	}
	ul li:hover{
		cursor: pointer;
	}
</style>