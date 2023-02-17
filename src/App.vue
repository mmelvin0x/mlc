<script setup lang="ts">
import { WalletProvider } from '@solana/wallet-adapter-vue';
import {
  getBitKeepWallet,
  getBitpieWallet,
  getBloctoWallet,
  getCloverWallet,
  getCoin98Wallet,
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSafePalWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getSolongWallet,
} from '@solana/wallet-adapter-wallets';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from './state';

const store = useStore();
const router = useRouter();
const transition = ref('');

router.beforeEach((to, from, next) => {
  transition.value =
    (to.meta.transitionName as string) ||
    (from.meta.transitionName as string) ||
    'fade';

  next();
});

const wallets = computed(() => [
  getPhantomWallet(),
  getSolflareWallet(),
  getSolflareWebWallet(),
  getSolletWallet(),
  getSolletExtensionWallet(),
  getBitKeepWallet(),
  getBitpieWallet(),
  getBloctoWallet(),
  getCloverWallet(),
  getCoin98Wallet(),
  getLedgerWallet(),
  getMathWallet(),
  getSafePalWallet(),
  getSolongWallet(),
]);
</script>

<template>
  <WalletProvider :wallets="wallets" auto-connect>
    <router-view v-slot="{ Component }">
      <transition :name="transition" mode="out-in">
        <main>
          <component :is="Component"></component>
        </main>
      </transition>
    </router-view>
  </WalletProvider>
</template>
