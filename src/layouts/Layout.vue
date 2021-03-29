<template>
  <v-app id="inspire">
    <Header v-model="expandOnHover"></Header>
    <Sidebar :expand-on-hover.sync="expandOnHover"></Sidebar>
    <v-main>
      <v-container class="fill-height bg" fluid style="padding:0px!important;" >
        <router-view />
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Layout",

  components: {
    Header,
    Sidebar,
    Footer
  },

  props: {
    source: String
  },
  data: () => ({
    expandOnHover: false
  }),
  computed: {
    ...mapState('menu/', ["Customizer_drawer"])
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "menu/SET_CUSTOMIZER_DRAWER"
    })
  }
};
</script>

<style>
.bg {
    /* width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url( '../assets/pattern10.jpg') repeat center center;
    background-size: cover; */
  }
</style>