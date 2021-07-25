<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`,
				stack: error.stack
			}
		};
	}
</script>

<script>
	export let title;
	export let stack;
</script>

<h1 class="text-white">{title}</h1>
<p class="text-white">{stack}</p>
