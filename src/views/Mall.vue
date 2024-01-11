<template>
	<div>
		<el-button @click="$store.dispatch('data/actionData', {'name':'ccsh'})">设置存储信息</el-button>
		<el-button @click="$store.commit('data/hanldeData', {'name':'123'})">清除存储信息</el-button>
		<p>存储内容：{{ $store.state.data.data.name }}</p>
	</div>
</template>

<script>
export default {
	// ...
}
</script>
