<template>
  <div class="container flex w-full flex-col">
    <img src="../assets/award.svg" alt="Award" class="mx-auto max-w-[320px]" />
    <h1 class="mb-4 mt-6 text-center text-xl">Ranking</h1>

    <div class="ranking">
      <div
        v-for="(position, index) in positions"
        :key="position.position"
        class="flex border"
        :class="{
          'border-t-0': index !== 0,
          'rounded-tl rounded-tr border-t': index === 0,
          'rounded-bl rounded-br': index === positions.length - 1,
        }"
      >
        <div class="min-w-[40px] px-3 py-1 text-center">
          {{ position.position }}
        </div>
        <div class="flex-1 border-x px-3 py-1">
          {{ position.user }}
        </div>
        <div class="min-w-[100px] px-3 py-1 text-center">
          {{ position.points }} {{ position.points <= 1 ? 'ponto' : 'pontos' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { rankingService } from '../service';

export default {
  name: 'RankingPage',
  data() {
    return {
      positions: [],
    };
  },
  async mounted() {
    this.loadPositions();
  },
  methods: {
    async loadPositions() {
      const positions = await rankingService.getPositions();
      this.positions = positions;
    },
  },
};
</script>
