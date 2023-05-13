<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end" v-if="authResp?.user?.email">
          <ion-button @click="doLogout">LOGOUT</ion-button>
        </ion-buttons>
        <ion-title v-if="authResp?.user?.email">Players</ion-title>
        <ion-title v-else>Supabase Vue CRUD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="authResp?.user">
        <ion-card style="padding: 0px; margin: 0px; margin-bottom: 8px">
          <ion-card-content>
            {{ authResp?.user?.email }}
          </ion-card-content>
        </ion-card>
        <!-- <ion-button @click="getData" size="small">QUERY</ion-button> -->
        <ion-button @click="$router.push('/add-item')" size="small">
          ADD PLAYER</ion-button
        >
        <ion-button
          size="small"
          @click="$router.push('/add-org')"
          class="ion-float-right"
        >
          ORGANIZATIONS</ion-button
        >
        <!-- <ion-button @click="$router.push('/add-image')" size="small"
          >ADD IMAGE</ion-button
        > -->
        <div v-if="loading">LOADING...</div>
        <div v-else-if="error" class="error-panel">{{ error }}</div>
        <div v-else-if="data">
          <template v-for="item in data" :key="item.id">
            <router-link :to="`/detail/${item.id}`">
              <item-component :item="item" />
            </router-link>
          </template>
        </div>
      </div>
      <div v-else>
        <template v-if="createAcctMode">
          <create-acct-card-component
            @create-acct-mode-toggle="createAcctMode = !createAcctMode"
            @create-acct-click="doCreateAcct"
          ></create-acct-card-component>
        </template>
        <template v-else>
          <login-card-component
            @create-acct-mode-toggle="createAcctMode = !createAcctMode"
            @login-click="doLogin"
          ></login-card-component>
        </template>

        <div v-if="loading">LOADING...</div>
        <div v-else-if="error">{{ error }}</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import useAuth from "../composables/useAuth";
import usePlayers from "../composables/usePlayers";
import ItemComponent from "../components/ItemComponent.vue";
import LoginCardComponent from "@/components/LoginCardComponent.vue";
import CreateAcctCardComponent from "@/components/CreateAcctCardComponent.vue";
import useAlert from "@/composables/useAlert";
import { ref } from "vue";
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
  alertController,
} from "@ionic/vue";
import useOrgsVQ from "@/composables/useOrgsVQ";

const authError = ref("");
const createAcctMode = ref(false);

const { authResp, login, logout, createAcct } = useAuth();

const { loading, error, data, doQuery } = usePlayers(undefined, false);
const { dismiss, present } = useAlert();

console.log("authResp", authResp);

onIonViewWillEnter(() => {
  doQuery();
});

/**
 *
 */
const doLogin = async ({ email, password }) => {
  authError.value = "";
  const { data, error } = await login({
    email,
    password,
  });
  await present({
    header: "Application Error",
    subHeader: "Login",
    message: error?.message,
  });
};

/**
 *
 */
const doCreateAcct = async ({ email, password, name }) => {
  const { data, error } = await createAcct({
    email,
    password,
    name,
  });
  if (error) {
    await present({
      header: "Application Error",
      subHeader: "Create Account",
      message: error?.message,
    });
  }
};

/**
 *
 */
const doLogout = async () => {
  const { data, error } = await logout();
  if (error) {
    await present({
      header: "Application Error",
      subHeader: "Create Account",
      message: error?.message,
    });
  }
};

const getData = async () => {
  await doQuery();
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
