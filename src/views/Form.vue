<template>
  <v-form v-model="valid">
    <v-container>
      <v-row justify-center="true">
        <v-col>
          <div class="d-flex justify-center mb-6" outlined tile>
            <h2>
              Sign up to experience the best Open Data Lakehouse free trial
            </h2>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.firstname"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.lastname"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="success" disabled> Submit </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup lang="ts">
  import { computed, inject, onMounted, onUnmounted, reactive, ref } from "vue";
  import { useTmpStore } from "../stores/tmp";

  const { switchForm } = useTmpStore();
  const valid = ref(false);
  const user = reactive<any>({
    firstname: "",
    lastname: "",
    email: "",
  });

  onMounted(() => {
    console.log("onMnt");
    switchForm(false);
  });

  onUnmounted(() => {
    console.log("onUnMnt");

    switchForm(true);
  });
</script>

<style scoped></style>
