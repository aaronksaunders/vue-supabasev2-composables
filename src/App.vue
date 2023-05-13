<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
<style>
ion-item {
  --padding-start: 0px;
}

.error-panel {
  padding: 12px;
  background: rgb(250, 56, 56);
  margin: 16px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
}
</style>
