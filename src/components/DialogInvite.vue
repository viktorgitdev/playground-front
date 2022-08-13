<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props"> Open Invite Page </v-btn>
      </template>
      <v-card color="primary">
        <v-toolbar color="primary">
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row>
          <v-col>
            <div class="d-flex justify-center mb-6" outlined tile>
              <h1>
                Invite your self to Dremio Cloud Experience best of Open Data
                Lakehouse
              </h1>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col align-self="center">
            <div class="d-flex justify-center mb-6" outlined tile>
              <qrcode-vue
                id="canvas"
                :value="url"
                :size="300"
                level="H"
                render-as="canvas"
                background="#FFFFFF"
                foreground="#30D3DF"
              />
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import QrcodeVue from "qrcode.vue";

  const props = defineProps({
    url: String,
  });
  const dialog = ref(false);
</script>

<style>
  .dialog-bottom-transition-enter-active,
  .dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
  }
</style>
