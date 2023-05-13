<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="loading">LOADING...</div>
      <div v-else-if="error" class="error-panel">{{ error.message }}</div>
      <div>
        <ion-item>
          <ion-label position="stacked">User Name</ion-label>
          <ion-input placeholder="User Name" v-model="usernameRef"  aria-label="User Name"/>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Biography</ion-label>
          <ion-textarea aria-label="Biography"
            placeholder="Product Description"
            v-model="bioRef"
            rows="6"
          />
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Organization</ion-label>
          <ion-select  aria-label="Organization"
            aria-aria-label="fruit"
            placeholder="Select Organization"
            @ionChange="orgRef = $event.detail.value"
          >
            <ion-select-option
              v-for="item in orgsData"
              :key="item.id"
              :value="item?.id"
              >{{ item?.name }}</ion-select-option
            >
          </ion-select>
        </ion-item>
      </div>
      <ion-button @click="saveData" size="small">SAVE ITEM</ion-button>
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
  IonItem,
  IonLabel,
  onIonViewWillEnter,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import usePlayers from "@/composables/usePlayers";
import useAlert from "@/composables/useAlert";
import useOrgs from "@/composables/useOrgs";

const usernameRef = ref("");
const bioRef = ref("");
const orgRef = ref("");

const router = useRouter();

const { loading, doInsert } = usePlayers();
const { data: orgsData } = useOrgs("*", true);
const { present } = useAlert();

/**
 *
 */
const saveData = async () => {
  const resp = await doInsert(
    [
      {
        username: usernameRef.value,
        bio: bioRef.value,
        organization: orgRef?.value,
      },
    ],
    {}
  );

  if (resp?.error) {
    await present({
      header: "Application Error",
      subHeader: "Players",
      message: resp.error?.message,
      buttons: ["OK"],
    });
  }

  if (resp.data && !resp.error) {
    router.back();
  }
};
</script>

<style scoped></style>
