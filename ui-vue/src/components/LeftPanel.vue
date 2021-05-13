<template>
	<div class="layout-menu-container">
		<LeftMenu :items="model" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" />
	</div>
</template>

<script>
import LeftMenu from './LeftMenu';
export default {
	props: {
		model: Array
	},
    methods: {
        onMenuItemClick(event) {
            this.$emit('menuitem-click', event);
        }
    },
	components: {
		'LeftMenu': LeftMenu
	}
}
</script>

<style scoped>
</style>