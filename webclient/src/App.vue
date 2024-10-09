<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
	<div class="navBar">
		<header>
			<div style="margin-left: 50px">Icon</div>
			<ul class="navLinks">
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="login">Login</RouterLink>
			</ul>
		</header>
	</div>
	<RouterView />
</template>

<style scoped>
.navBar {
	height: 10vh;
	position: sticky;
  	background-color: aliceblue;
	display: flex;
    align-items: center;
    justify-content: center;
}
header {
	display:contents;
}
.navLinks {
	margin-left: auto;
	margin-right: 50px;
}
</style>
