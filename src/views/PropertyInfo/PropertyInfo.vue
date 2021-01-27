<template>
  <div class="display-property container">
    <div class="property-images">
      <div class="property-slider">
        <PropertySlider />
      </div>
      <div class="property-images-container">
        <div class="scroll-container">
          <PropertyImages />
        </div>
      </div>
    </div>

    <div class="property-info">
      <div class="scroll-container">
        <PropertyGeneralInfo />
        <PropertyDescription />
      </div>
    </div>
  </div>
</template>

<script>
import PropertyDescription from "./PropertyDescription";
import PropertyGeneralInfo from "./PropertyGeneralInfo";
import PropertySlider from "./PropertySlider";
import PropertyImages from "./PropertyImages";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    PropertyDescription,
    PropertyGeneralInfo,
    PropertySlider,
    PropertyImages,
  },
  data() {
    return {
      showSlider: null,
    };
  },
  methods: {
    ...mapActions(["searchProperty"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.searchProperty(this.$route.params.property_id);
  },
};
</script>

<style scoped>
.property-slider {
  margin-top: 2.5rem;
}

.display-property {
  display: flex;
  flex-direction: column;
}

.property-info {
  padding: 5rem 0 0;
  width: 100%;
  height: calc(100vh - 48px);
  overflow: hidden;
}

.property-images-container {
  display: none;
  height: calc(100vh - 48px);
  overflow: hidden;
}

.scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-right: 17px;
  box-sizing: content-box;
}

.divider {
  padding: 0.5rem 0;
}

.container {
  margin: 0 auto;
  width: 90%;
}

@media (min-width: 576px) {
  .container {
    width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    width: 720px;
  }

  .display-property {
    flex-direction: row;
  }

  .property-images {
    width: 60%;
  }

  .property-info {
    width: 40%;
  }

  .property-slider {
    display: none;
  }

  .property-images-container {
    display: flex;
  }
}

@media (min-width: 992px) {
  .container {
    width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
  .property-images {
    width: 70%;
  }
  .property-info {
    width: 30%;
  }
}

@media (min-width: 1440px) {
  .container {
    width: 1380px;
  }
}
</style>
