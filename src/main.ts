import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createAuth0 } from "@auth0/auth0-vue";
import { createPinia } from "pinia";

loadFonts();

const dremioTheme = {
  dark: false,
  colors: {
    // background: "#FFFFFF",
    // surface: "#FFFFFF",
    primary: "#f4fbfc",
    "primary-darken-1": "#3700B3",
    secondary: "#2a394a",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dremioTheme",
    themes: {
      dremioTheme,
    },
  },
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
});

const auth0 = createAuth0({
  domain: "dev-yyj6gvni.us.auth0.com",
  client_id: "SIroCqXnGznDoSZLs2Ei2go4xEiL7fOY",
  redirect_uri: window.location.origin,
});
const app = createApp(App);

app.use(router).use(createPinia()).use(vuetify).use(auth0).mount("#app");
