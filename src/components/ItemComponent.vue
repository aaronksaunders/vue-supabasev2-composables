<template>
  <ion-item>
    <ion-label class="ion-text-wrap">
      <div style="font-weight: bolder">{{ item?.username }}</div>
      <div>{{ item?.bio }}</div>
      <div>{{ item?.organization.name }}</div>
    </ion-label>
  </ion-item>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(['item']);
</script>

<style lang="css" scoped>
ion-item {
  --padding-start : 0px;
  
}
</style>
