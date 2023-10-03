<script setup lang="ts">
interface Props {
  order: number;
  data: { id: string; name: string };
}

const props = defineProps<Props>();

const emit = defineEmits(["edit", "delete"]);
</script>
<template>
  <tr class="bg-white border-b">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ order }}
    </td>
    <td class="px-6 py-4 font-medium text-gray-900 max-w-[70%]">
      {{ props.data.name }}
    </td>
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      <button @click="() => emit('edit', props.data.id)">
        <Icon
          name="material-symbols:edit"
          class="h-6 w-6 text-gray-700"
        /></button
      ><button @click="() => emit('delete', props.data.id)">
        <Icon name="mdi:trash" class="h-6 w-6 text-gray-700" />
      </button>
    </td>
  </tr>
</template>
