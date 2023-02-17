<script setup lang="ts">
import { reactive, computed, watch, onMounted, ref } from 'vue';
import * as anchor from '@project-serum/anchor';
import {
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
} from '@/utils/candy-machine';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-vue';
import {
  WalletMultiButton,
  WalletModalProvider,
} from '@solana/wallet-adapter-vue-ui';
import MintButton from '@/components/buttons/MintButton.vue';
import MintInfo from '@/components/MintInfo.vue';
import { CandyMachineAccount } from '@/utils';
import ModalBase from '@/components/modals/ModalBase.vue';
import { Connection } from '@solana/web3.js';

const rpcHost = process.env.VUE_APP_SOLANA_RPC_HOST!;
const commitment = 'confirmed';

const { connected } = useWallet();
const wallet = useAnchorWallet();
const candyMachine = ref({} as CandyMachineAccount);

const data = reactive({
  isUserMinting: false,
  connection: new Connection(rpcHost, commitment),
  dismissSeconds: 5,
  dismissCountdown: 0,
  alertState: {
    open: false,
    message: '',
    severity: '',
  },
});

const anchorWallet = computed(() => {
  if (
    !wallet.value ||
    !wallet.value.publicKey ||
    !wallet.value.signAllTransactions ||
    !wallet.value.signTransaction
  ) {
    return;
  }

  return {
    publicKey: wallet.value.publicKey,
    signAllTransactions: wallet.value.signAllTransactions,
    signTransaction: wallet.value.signTransaction,
  } as any;
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.VUE_APP_CANDY_MACHINE_ID!
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};

const refreshCandyMachineState = async () => {
  const candyMachineId = getCandyMachineId();

  if (!anchorWallet.value) {
    return;
  }

  if (candyMachineId) {
    try {
      candyMachine.value = await getCandyMachineState(
        anchorWallet.value!,
        candyMachineId,
        data.connection
      );
    } catch (e) {
      console.log('There was a problem fetching Candy Machine state');
      console.log(e);
    }
  }
};

const onMint = async () => {
  try {
    data.isUserMinting = true;
    const publicKey = wallet.value?.publicKey;
    const program = candyMachine.value.program;

    document.getElementById('#identity')?.click();

    if (connected && program && publicKey) {
      const mintTxId = (
        await mintOneToken(candyMachine.value as CandyMachineAccount, publicKey)
      )[0];

      let status: any = { err: true };
      if (mintTxId) {
        status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          60000,
          data.connection,
          true
        );
      }

      if (status && !status.err) {
        data.alertState = {
          open: true,
          message: 'Congratulations! Mint succeeded!',
          severity: 'success',
        };
      } else {
        data.alertState = {
          open: true,
          message: 'Mint failed! Please try again!',
          severity: 'danger',
        };
      }
    }
  } catch (error: any) {
    let message = error.msg || 'Minting failed! Please try again!';
    if (!error.msg) {
      if (!error.message) {
        message = 'Transaction Timeout! Please try again.';
      } else if (error.message.indexOf('0x137')) {
        message = `SOLD OUT!`;
      } else if (error.message.indexOf('0x135')) {
        message = `Insufficient funds to mint. Please fund your wallet.`;
      }
    } else {
      if (error.code === 311) {
        message = `SOLD OUT!`;
        window.location.reload();
      } else if (error.code === 312) {
        message = `Minting period hasn't started yet.`;
      }
    }

    data.alertState = {
      open: true,
      message,
      severity: 'danger',
    };
  } finally {
    data.isUserMinting = false;
    refreshCandyMachineState();
    setTimeout(() => (data.alertState.open = false), 5000);
  }
};

onMounted(refreshCandyMachineState);

watch([anchorWallet, data.connection], refreshCandyMachineState);
</script>

<template>
  <ModalBase title="Become a lion">
    <template v-slot:content>
      <div v-if="!connected" class="d-flex justify-content-center">
        <div class="m-5">
          <WalletModalProvider>
            <WalletMultiButton></WalletMultiButton>
          </WalletModalProvider>
        </div>
      </div>
      <div
        class="d-flex flex-column align-items-center"
        v-if="
          candyMachine?.state?.isActive &&
          wallet?.publicKey &&
          wallet?.signTransaction
        "
      >
        <MintInfo :candy-machine="candyMachine" />
        <img src="@/assets/lions.gif" alt="NFT" class="img-thumbnail w-100" />
        <MintButton
          class="w-100"
          :candyMachine="candyMachine"
          :isMinting="data.isUserMinting"
          :onMint="onMint"
        />
      </div>

      <b-alert
        fade
        dismissible
        :variant="data.alertState.severity"
        :show="data.alertState.open"
        >{{ data.alertState.message }}</b-alert
      >
    </template>
  </ModalBase>
</template>
