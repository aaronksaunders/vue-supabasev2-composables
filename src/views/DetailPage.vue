<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" >
          <ion-back-button ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="loading">LOADING...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else-if="data">
        <item-component :item="data" />
        <ion-button @click="deleteItem" color="danger" size="small" >DELETE</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonButton,
  IonToolbar,
  IonButtons,
  IonBackButton
} from "@ionic/vue";
import usePlayers from "@/composables/usePlayers";
import ItemComponent from "../components/ItemComponent.vue";

import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { onIonViewWillEnter } from "@ionic/vue";

const props = defineProps(["id"]);

const router = useRouter();
const data = ref();
const loading = ref();

const { doDelete, doSelectOne } = usePlayers();

onIonViewWillEnter(async () => {
  loading.value = true;
  const { data: result } = await doSelectOne("*", props?.id);
  data.value = result;
  loading.value = false;
});

/**
 *
 */
const deleteItem = async () => {
  loading.value = true;
  const { data, error} = await doDelete(props.id);
  loading.value = false;
  if (!error) {
    router.replace("/");
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
