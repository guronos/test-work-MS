<template>
  <div>sd</div>
</template>
<script setup lang="ts">

import {TreeStore} from "@/services/TreeStoreService.ts";

const items = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '2'
    , parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },
  { id: 4, parent: '2'
    , label: 'Айтем 4' },
  { id: 5, parent: '2'
    , label: 'Айтем 5' },
  { id: 6, parent: '2'
    , label: 'Айтем 6' },
  { id: 7, parent: 4, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' }
];

const itemsClass = new TreeStore(items)

console.log('result', itemsClass.updateItem({ id: 4, parent: 7, label: 'Айтем 44' }));

</script>
<style scoped>

</style>
