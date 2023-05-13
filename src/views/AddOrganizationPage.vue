<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Organizations</ion-title>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="loading">LOADING...</div>
      <div v-else-if="error" class="error-panel">{{ error.message }}</div>
      <ion-accordion-group>
        <ion-accordion>
          <ion-item slot="header" color="light">
            <ion-label style="padding-left: 8px">Create Organization</ion-label>
          </ion-item>
          <div
            class="ion-padding"
            slot="content"
            style="border: solid grey 0.05em"
          >
            <ion-label position="stacked">Organization Name</ion-label>
            <ion-input
              placeholder="Enter Organization Name"
              aria-label="Organization Name"
              v-model="orgnameRef"
            />
            <ion-label position="stacked">Description</ion-label>
            <ion-textarea
              aria-label="Description"
              placeholder="Enter Description"
              v-model="descriptionRef"
              rows="3"
            />

            <ion-button @click="saveData" size="small"
              >SAVE NEW ORGANIZATION</ion-button
            >
          </div>
        </ion-accordion>
      </ion-accordion-group>
      <div>
        <h3>Organizations</h3>
        <ion-list>
          <ion-item v-for="item in data" :key="item?.id">
            <ion-label>
              <ion-label class="ion-text-wrap">
                <div style="font-weight: bolder">{{ item?.name }}</div>
                <div>{{ item?.description }}</div>
              </ion-label>
            </ion-label>
          </ion-item>
        </ion-list>
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
  IonBackButton,
  IonInput,
  IonTextarea,
  alertController,
  onIonViewWillEnter,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useOrgs from "@/composables/useOrgs";

const orgnameRef = ref("");
const descriptionRef = ref("");

const router = useRouter();

const { loading, error, data, doQuery, doInsert } = useOrgs(undefined, false);

onIonViewWillEnter(() => {
  doQuery();
});

/**
 *
 */
const saveData = async () => {
  const resp = await doInsert(
    [
      {
        name: orgnameRef.value,
        description: descriptionRef.value,
      },
    ],
    {}
  );

  if (resp?.error) {
    const alert = await alertController.create({
      header: "Application Error",
      subHeader: "Organizations",
      message: resp.error?.message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  debugger;
  if (resp.data && !resp.error) {
    orgnameRef.value = "";
    descriptionRef.value = "";
    doQuery();
  }
};
</script>

<style scoped>
a {
  color: black;
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
