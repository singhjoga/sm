<template>
  <div id="layout-config" :class="containerClass">
    <a href="#" class="layout-config-button" id="layout-config-button" @click="toggleConfigurator">
      <i class="pi pi-shopping-cart"></i>
      <span class="menuitem-badge">5</span>
    </a>
    <a href="#" class="layout-config-close" @click="hideConfigurator">
      <i class="pi pi-times"></i>
    </a>

    <div class="layout-config-content">
      <h5>Items in Cart</h5>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    layoutMode: {
      type: String,
      default: null
    },
    layoutColorMode: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      active: false,
      dlayoutMode: this.layoutMode,
      dlayoutColorMode: this.layoutColorMode
    };
  },
  watch: {
    $route() {
      if (this.active) {
        this.active = false;
        this.unbindOutsideClickListener();
      }
    },
    layoutMode(newValue) {
      this.dlayoutMode = newValue;
    },
    layoutColorMode(newValue) {
      this.dlayoutColorMode = newValue;
    }
  },
  outsideClickListener: null,
  methods: {
    toggleConfigurator(event) {
      this.active = !this.active;
      event.preventDefault();
      if (this.active) this.bindOutsideClickListener();
      else this.unbindOutsideClickListener();
    },
    hideConfigurator(event) {
      this.active = false;
      this.unbindOutsideClickListener();
      event.preventDefault();
    },
    changeInputStyle(value) {
      this.$appState.inputStyle = value;
    },
    changeRipple(value) {
      this.$primevue.ripple = value;
    },
    changeLayout(event, layoutMode) {
      this.$emit("layout-change", layoutMode);
      event.preventDefault();
    },
    changeLayoutColor(event, layoutColor) {
      this.$emit("layout-color-change", layoutColor);
      event.preventDefault();
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = event => {
          if (this.active && this.isOutsideClicked(event)) {
            this.active = false;
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      return !(
        this.$el.isSameNode(event.target) || this.$el.contains(event.target)
      );
    }
  },
  computed: {
    containerClass() {
      return ["layout-config", { "layout-config-active": this.active }];
    },
    rippleActive() {
      return this.$primevue.ripple;
    },
    inputStyle() {
      return this.$appState.inputStyle;
    }
  }
};
</script>