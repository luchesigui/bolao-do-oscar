<template>
  <h1 class="text-xl font-bold">
    {{ categoryName }}
  </h1>
  <small class="mb-5 block italic">{{ translatedCategoryName }}</small>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { Category } from '@/types';

type CategoryNameProps = {
  categoryName: Category['name'];
};

const { categoryName } = defineProps<CategoryNameProps>();

const traducoes = new Map([
  ['Best Picture', 'Melhor Filme'],
  ['Best Director', 'Melhor Direção'],
  ['Best Actor', 'Melhor Ator'],
  ['Best Actress', 'Melhor Atriz'],
  ['Best Supporting Actor', 'Melhor Ator Coadjuvante'],
  ['Best Supporting Actress', 'Melhor Atriz Coadjuvante'],
  ['Best Adapted Screenplay', 'Melhor Roteiro Adaptado'],
  ['Best Original Screenplay', 'Melhor Roteiro Original'],
  ['Best Animated Feature', 'Melhor Animação'],
  ['Best International Feature', 'Melhor Filme Estrangeiro'],
  ['Best Documentary Feature', 'Melhor Documentário'],
  ['Best Cinematography', 'Melhor Fotografia'],
  ['Best Film Editing', 'Melhor Montagem'],
  ['Best Costume Design', 'Melhor Figurino'],
  ['Best Makeup & Hairstyling', 'Melhor Maquiagem e Penteado'],
  ['Best Original Score', 'Melhor Trilha Sonora'],
  ['Best Original Song', 'Melhor Canção'],
  ['Best Production Design', 'Melhor Design de Produção'],
  ['Best Sound', 'Melhor Som'],
  ['Best Visual Effects', 'Melhores Efeitos Visuais'],
  ['Best Live Action Short', 'Melhor Curta-Metragem'],
  ['Best Documentary Short', 'Melhor Documentário Curta-Metragem'],
  ['Best Animated Short', 'Melhor Animação Curta-Metragem'],
]);

const translatedCategoryName = computed(() => traducoes.get(categoryName));
</script>
