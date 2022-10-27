<template></template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const Path = route.params.path
router.replace('/' + Path.join('/'))
</script>
