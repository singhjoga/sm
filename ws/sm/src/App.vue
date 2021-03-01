
<template>
  <div id="app">
    <div class="app-container">
      <Header />
    </div>
    <Toast position="top-center"/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "./components/Header.vue";
@Options({
  components: {
    Header
  }
})
export default class App extends Vue {
  public message = "";
  public text = "";
  public greet() {
    if (this.text.length) {
      this.message = "Hello " + this.text;
    }
  }
}
</script>

<style>

</style>

