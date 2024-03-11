<template>
  <div class="container">
    <div class="mb-10 text-center">
      <h1 class="mb-2 text-xl font-bold">Meus Votos</h1>
      <p>Confira a lista dos seus votos</p>
    </div>

    <ul class="mb-20 lg:grid lg:grid-cols-2">
      <li v-for="vote in myVotes" :key="vote.id" class="mb-5">
        <p>
          <strong>{{ vote.nominee.category.name }}</strong>
        </p>
        <span v-if="vote.nominee.name">{{ vote.nominee.name }} - </span>
        {{ vote.nominee.movie.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { voteService } from '@/services';
import { useUserStore } from '@/stores';
import type { VoteWithInnerData } from '@/types';

const { user } = useUserStore();

const myVotes = ref<VoteWithInnerData[]>([]);

onMounted(async () => {
  const votes = await voteService.getMyVotes(user.id);
  const orderedVotes = votes.sort((prevVote, nextVote) => {
    return nextVote.nominee.category.name < prevVote.nominee.category.name
      ? 1
      : -1;
  });

  myVotes.value = orderedVotes;
});
</script>
