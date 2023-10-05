<script setup lang="ts">
interface Props {
  tableHeadTitle: string;
  datas: { id: string; name: string }[];
}

const props = defineProps<Props>();
const emit = defineEmits(["edit", "delete"]);
</script>
<template>
  <div class="shadow-md sm:rounded-lg bg-white sm:min-w-[500px]">
    <table class="w-full text-sm text-left text-gray-800 rounded-lg">
      <thead class="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th class="p-2">No</th>
          <th class="p-2">{{ props.tableHeadTitle }}</th>
          <th class="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(data, index) in datas" :key="data.id"
          ><TableItem
            :order="index + 1"
            :data="data"
            @edit="(id:string) => emit('edit', id)"
            @delete="(id:string) => emit('delete', id)"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>
