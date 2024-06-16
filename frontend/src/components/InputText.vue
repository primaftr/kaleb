<template>
  <label
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 capitalize"
    :for="label"
  >
    {{ label }}
  </label>
  <input
    class="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gray-800 text-gray-50 border-gray-700"
    :id="label"
    :placeholder
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
  />
  <div v-if="error">
    <span class="text-red-500 text-sm px-1" v-for="(err, index) in error?._errors" :key="index">
      {{ err }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  placeholder: string
  type: string
  modelValue: any
  error: any
}>()

defineEmits(['update:modelValue'])
</script>
