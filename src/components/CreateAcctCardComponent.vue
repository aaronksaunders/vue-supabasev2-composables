<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Welcome, Enter Your Information </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="stacked">Name</ion-label>
        <ion-input aria-label="Name"
          placeholder="name"
          autocomplete="new-password"
          v-model="nameRef"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label  position="stacked">Email</ion-label>
        <ion-input  aria-label="Email"
          placeholder="email"
          autocomplete="new-password"
          v-model="emailRef"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label  position="stacked">Password</ion-label>
        <ion-input  aria-label="Password"
          placeholder="password"
          type="password"
          autocomplete="new-password"
          v-model="passwordRef"
        ></ion-input>
      </ion-item>
      <ion-button
        @click="
          emits('create-acct-click', {
            email: emailRef,
            password: passwordRef,
            name: nameRef,
          })
        "
        size="small"
        expand="block"
        style="zoom: 120%; margin-top: 16px; margin-bottom: 8px"
        >SAVE NEW USER</ion-button
      >
      <ion-button
        @click="emits('create-acct-mode-toggle')"
        size="small"
        expand="block"
        style="zoom: 120%"
        >CANCEL</ion-button
      >
    </ion-card-content>
    <div v-if="authError" class="error-panel">
      {{ authError }}
    </div>
  </ion-card>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonButton,
  IonToolbar,
  IonButtons,
  onIonViewWillEnter,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonCardSubtitle,
  IonItem,
  IonLabel
} from "@ionic/vue";

const emits = defineEmits(["create-acct-mode-toggle", "create-acct-click"]);

const emailRef = ref("");
const passwordRef = ref("");
const authError = ref("");
const nameRef = ref("");
</script>
