<template>
  <main>
    <Splash scroll-link="#login"/>

    <SectionBackground id="login">
      <div class="row from-bottom">
        <div class="mb-64">
          <h2 class="mb-24">Where Legacy Rises Again</h2>
          <p class="lg scalable">
            Sheba Gold Capital partners with family offices to breathe new life into proven enterprises… identifying overlooked opportunities, transforming legacy into momentum, and vision into generational wealth.<br>
            See what happens when legacy meets vision → connect with us at <a class="link" href="mailto:info@sheba.gold">info@sheba.gold</a>
          </p>
        </div>
        <h2 class="mb-24">Member Login</h2>
        <div class="col-sm-7 position-relative">
          <form @submit.prevent="login">
            <div class="error" v-if="error">{{ error }}</div>
            <TextInput 
              v-model="username" 
              placeholder="Username"
              @input="clearError"
            />
            <TextInput 
              v-model="password"
              placeholder="Password"
              type="password"
              @input="clearError"
              class="mt-16"
            />
            <ArrowButton
              class="mt-16"
              type="submit"
              color="gold"
              arrowRotate="-90"
            />
          </form>
        </div> 
      </div>
    </SectionBackground>
  </main>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

import Splash from '~/components/Splash.vue';
import SectionBackground from '~/components/SectionBackground.vue';
import TextInput from '~/components/elements/TextInput.vue';

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()

const login = async () => {
  error.value = ''
  const res = await $fetch('/api/login', {
    method: 'POST',
    body: { username: username.value, password: password.value }
  })

  if (res.success) {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    error.value = 'Invalid Username or Password'
  }
}

const clearError = () => {
  error.value = ''
}
</script>

<style lang="scss">
.error {
  color: rgb(var(--color-white));
  @include fsz(14px);
  font-family: var(--font-body);
  position: absolute;
  right: 12px;
  top: -20px;
}
a.link {
  background: linear-gradient(82deg, #EACEA9 9.24%, #D7A25B 46.1%, #FDEED5 67.08%, #CDA36C 99.7%);
  opacity: 0.8;
  font-weight: var(--weight-medium);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover {
    opacity: 1;
  }
}
</style>