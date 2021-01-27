<template>
  <div v-if="propertyInfo">
    <swiper
      :slides-per-view="1"
      :space-between="0"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      class="swiper"
    >
      <div class="slider-navigation">
        <div class="swiper-button">
          <font-awesome-icon
            class="swiper-button-prev swiper-button-black"
            :icon="['fas', 'chevron-circle-left']"
          />
        </div>
        <div class="swiper-button">
          <font-awesome-icon
            class="swiper-button-next swiper-button-black"
            :icon="['fas', 'chevron-circle-right']"
          />
        </div>
      </div>
      <swiper-slide
        v-for="(photo, index) in propertyInfo.photos"
        v-bind:key="index"
        class="slide"
        ><img v-bind:src="photo.href" v-bind:alt="photo.tags[0]"
      /></swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SwiperCore, { Navigation, A11y } from "swiper";
SwiperCore.use([Navigation, A11y]);

import { Swiper, SwiperSlide } from "swiper/vue";
import { mapGetters } from "vuex";

import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(["propertyInfo"]),
  },
};
</script>

<style scoped>
.swiper {
  height: 240px;
}
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

img {
  height: 100%;
}

.swiper-button-prev,
.swiper-button-next {
  scale: 2.5;
}
</style>