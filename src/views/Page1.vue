<template>
	<div>
		<span>Page1{{ name }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	computed: {
		name() {
			return this.displayName(1, [{ label: '哈哈', value: 1 }])
		},
	},
}
</script>

<style lang="scss" scoped></style>
