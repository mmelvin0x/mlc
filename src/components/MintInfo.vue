<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber, toDate } from '@/utils/helpers';
import MintCountdown from '@/components/MintCountdown.vue';
import * as anchor from '@project-serum/anchor';
import { CandyMachineState, MintStatus } from '@/utils';

export interface CandyMachineAccount {
  id: anchor.web3.PublicKey;
  program: anchor.Program;
  state: CandyMachineState;
}

const props = defineProps(['candyMachine']);
const mintStatus = computed(() =>
  !props.candyMachine?.state?.isActive || props.candyMachine?.state?.isSoldOut
    ? MintStatus.COMPLETED
    : props.candyMachine?.state.isPresale
    ? MintStatus.PRESALE
    : MintStatus.LIVE
);

const getMintPrice = (candyMachine: CandyMachineAccount): string => {
  const price = formatNumber.asNumber(
    candyMachine.state.isPresale
      ? candyMachine.state.whitelistMintSettings?.discountPrice!
      : candyMachine.state.price!
  );
  return `◎ ${price}`;
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-around">
    <div class="d-flex align-items-center justify-content-between me-3">
      <span class="info-box"
        >Remaining: {{ props.candyMachine.state.itemsRemaining }}</span
      >
      <span class="info-box"
        >Price: {{ getMintPrice(props.candyMachine) }}</span
      >

      <MintCountdown
        :time="
          toDate(
            props.candyMachine?.state.goLiveDate
              ? props.candyMachine?.state.goLiveDate
              : props.candyMachine?.state.isPresale
              ? new anchor.BN(new Date().getTime() / 1000)
              : undefined
          )
        "
        :status="
          !props.candyMachine?.state?.isActive ||
          props.candyMachine?.state?.isSoldOut
            ? 'COMPLETED'
            : props.candyMachine?.state.isPresale
            ? 'PRESALE'
            : 'LIVE'
        "
      />
    </div>
  </div>
</template>
