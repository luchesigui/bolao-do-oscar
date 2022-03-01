<template>
  <div class="flex flex-col w-full">
    <img src="../assets/award.svg" alt="Award" class="max-w-[320px] mx-auto" />
    <h1 class="text-xl text-center mt-6 mb-4">Ranking</h1>

    <div class="ranking">
      <div
        class="flex border"
        :class="{
          'rounded-tl rounded-tr': index === 0,
          'rounded-bl rounded-br': index === positions.length - 1,
        }"
        v-for="(position, index) in positions"
      >
        <div class="px-2 min-w-[40px] text-center">
          {{ position.position }}
        </div>
        <div class="px-2 border-x flex-1">{{ position.user }}</div>
        <div class="px-2">{{ position.points }} pontos</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPositions } from "../entities/ranking";

export default {
  name: "Ranking",
  data() {
    return {
      positions: [],
    };
  },
  methods: {
    async loadPositions() {
      const positions = await getPositions();
      this.positions = positions;
    },
  },
  async mounted() {
    this.loadPositions();
  },
};
</script>
