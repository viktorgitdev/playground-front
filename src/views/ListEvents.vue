<template>
  <v-row>
    <v-col cols="4">
      <v-row>
        <v-col cols="auto">
          <v-dialog transition="dialog-top-transition">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props">Add new Event</v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar color="primary" class="pl-4">New Event</v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">Enter the name!</div>
                  <v-text-field
                    :counter="10"
                    label="Event name"
                    required
                  ></v-text-field>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="isActive.value = false">Close</v-btn>
                  <v-btn text @click="isActive.value = false" color="success"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="8">
      <v-btn
        v-if="state.eventIsSelected"
        color="error"
        size="small"
        class="mr-2"
        >Delete</v-btn
      >
      <v-btn
        v-if="state.eventIsSelected && !state.eventIsEdit"
        color="warning"
        size="small"
        class="mr-2"
        @click="editEvent"
        >Edit</v-btn
      >
      <v-btn
        v-if="state.eventIsEdit"
        color="secondary"
        size="small"
        class="mr-2"
        @click="cancelEdit"
        >Cancel</v-btn
      >
      <v-btn
        v-if="state.eventIsEdit"
        color="success"
        size="small"
        class="mr-2"
        @click="state.eventIsEdit = false"
        >Save</v-btn
      >
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Event Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="event in events"
            :key="event.name"
            @click="selectEvent(event)"
          >
            <td>{{ event.name }}</td>
            <td>{{ event.date_start }}</td>
            <td>{{ event.date_end }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="8">
      <v-container v-if="state.eventIsSelected && !state.eventIsEdit">
        <v-row>
          <v-col cols="12"><p>Selected Event</p></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">Name: {{ selectedEvent.name }}</v-col>
        </v-row>
        <v-row>
          <qrcode-vue
            id="canvas"
            :value="url"
            :size="300"
            level="H"
            render-as="canvas"
            background="#FFFFFF"
            foreground="#30D3DF"
          />
        </v-row>
        <v-row class="mt-6">
          <v-btn @click="downloadQRAsImage">Download QR</v-btn>
          <dialog-invite :url="url"></dialog-invite>
        </v-row>
      </v-container>

      <v-container v-if="state.eventIsSelected && state.eventIsEdit">
        <v-row>
          <v-col cols="12"><p>Edit Event</p></v-col>
        </v-row>
        <v-row>
          <v-text-field
            v-model="selectedEvent.name"
            :counter="10"
            label="Event name"
            required
          ></v-text-field>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
  import { reactive, ref } from "vue";
  import QrcodeVue from "qrcode.vue";
  import DialogInvite from "../components/DialogInvite.vue";

  const state = reactive<any>({
    eventIsSelected: false,
    eventIsEdit: false,
  });

  const url = ref<string>("");
  const selectedEvent = reactive<any>({});

  const events = reactive<any>([
    {
      name: "Berlin",
    },
    {
      name: "NYC",
    },
    {
      name: "SFO",
    },
  ]);

  function selectEvent(event: any) {
    state.eventIsSelected = true;
    url.value = window.location.origin + "/#/form?eventId=" + event.name;
    Object.assign(selectedEvent, event);
  }

  const eventTmp = reactive<any>({});
  function editEvent() {
    Object.assign(eventTmp, selectedEvent);
    state.eventIsEdit = true;
  }
  function cancelEdit() {
    Object.assign(selectedEvent, eventTmp);
    state.eventIsEdit = false;
  }

  function downloadQRAsImage() {
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", `QR-${selectedEvent.name}.png`);
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let dataURL = canvas!.toDataURL("image/png");
    let url = dataURL.replace(
      /^data:image\/png/,
      "data:application/octet-stream"
    );
    downloadLink.setAttribute("href", url);
    downloadLink.click();
  }
</script>

<style scoped></style>
