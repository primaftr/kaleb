<template>
  <div class="flex min-h-[100dvh] items-center justify-center bg-gray-950 px-4 dark:bg-gray-950">
    <div class="w-full max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold text-gray-50">Create an account</h1>
        <p class="text-gray-400">
          Already have an account?
          <RouterLink
            class="font-medium underline underline-offset-4 hover:text-gray-50 dark:hover:text-gray-50"
            to="/login"
          >
            Sign in
          </RouterLink>
        </p>
      </div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="space-y-2" v-if="registerError">
          <span class="text-red-500 text-sm">{{ registerError }}</span>
        </div>
        <div class="space-y-2">
          <InputText
            label="name"
            placeholder="John Doe"
            type="text"
            v-model="formValue.name"
            :error="error?.name"
          />
        </div>
        <div class="space-y-2">
          <InputText
            placeholder="email@example.com"
            label="email"
            type="email"
            v-model="formValue.email"
            :error="error?.email"
          />
        </div>
        <div class="space-y-2">
          <InputText
            placeholder="At least 8 characters"
            label="password"
            type="password"
            v-model="formValue.password"
            :error="error?.password"
          />
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-gray-50 text-gray-950 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegister } from '@/api/auth'
import InputText from '@/components/InputText.vue'
import { reactive, ref } from 'vue'
import z from 'zod'

type FormSchemaType = z.infer<typeof formSchema>
const formValue = reactive({
  name: '',
  email: '',
  password: ''
})

const formSchema = z.object({
  name: z.string().min(3, { message: 'This field must contain 3 or more characters' }).max(50),
  email: z
    .string()
    .min(1, { message: 'This field must be filled.' })
    .email('This is not valid email'),
  password: z.string().min(8, { message: 'Password must contain 8 or more characters.' })
})
const error = ref<z.ZodFormattedError<FormSchemaType>>()

const { mutateAsync: register, error: registerError } = useRegister()

const onSubmit = () => {
  const validSchema = formSchema.safeParse(formValue)
  if (!validSchema.success) {
    error.value = validSchema.error.format()
  } else {
    error.value = { _errors: [] }
    register({ email: formValue.email, password: formValue.password, name: formValue.name })
  }
}
</script>
