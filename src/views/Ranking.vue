<template>
  <div class="container flex flex-col w-full">
    <img src="../assets/award.svg" alt="Award" class="max-w-[320px] mx-auto" />
    <h1 class="text-xl text-center mt-6 mb-4">Ranking</h1>

    <div class="ranking">
      <div
        class="flex border"
        :class="{
          'border-t-0': index !== 0,
          'rounded-tl rounded-tr border-t': index === 0,
          'rounded-bl rounded-br': index === positions.length - 1,
        }"
        v-for="(position, index) in positions"
      >
        <div class="px-3 py-1 min-w-[40px] text-center">
          {{ position.position }}
        </div>
        <div class="px-3 py-1 border-x flex-1">{{ position.user }}</div>
        <div class="px-3 py-1 min-w-[100px] text-center">
          {{ position.points }} {{ position.points <= 1 ? "ponto" : "pontos" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { rankingService } from "../service";

export default {
  name: "Ranking",
  data() {
    return {
      positions: [],
    };
  },
  methods: {
    async loadPositions() {
      const positions = await rankingService.getPositions();
      this.positions = positions;
    },
  },
  async mounted() {
    this.loadPositions();
  },
};
</script>
