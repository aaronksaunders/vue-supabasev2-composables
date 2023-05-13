<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Welcome, Please Login</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
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
        @click="emits('login-click', { email: emailRef, password: passwordRef })"
        size="small"
        expand="block"
        style="zoom: 120%; margin-top: 16px; margin-bottom: 8px"
        >LOGIN</ion-button
      >
      <ion-button
        @click="emits('create-acct-mode-toggle')"
        fill="outline"
        size="small"
        expand="block"
        style="zoom: 120%"
        >CREATE ACCOUNT</ion-button
      >
    </ion-card-content>
    <div v-if="authError" class="error-panel">
      {{ authError }}
    </div>
  </ion-card>
</template>
<script setup>
import { ref , defineEmits} from "vue";
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
} from "@ionic/vue";

const emits = defineEmits(["create-acct-mode-toggle", "login-click"]);

const emailRef = ref("");
const passwordRef = ref("");
const authError = ref("");
</script>
