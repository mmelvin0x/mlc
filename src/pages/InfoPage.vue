<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import BackButton from '@/components/buttons/BackButton.vue';
</script>

<template>
  <b-container>
    <BackButton />

    <header class="m-5">
      <h1 class="text-center">Info Kiosk</h1>
    </header>

    <main>
      <section class="team mb-5">
        <h4 class="text-center">Team</h4>
        <div class="team-container">
          <div class="team-member">
            <b-link
              href="https://twitter.com/Memphis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="img-thumbnail team-img"
                :src="require('@/assets/team-Memphis-lion.png')"
                alt="NFT"
              />
            </b-link>

            <div class="text-center">Memphis</div>
            <div class="text-center">Alpha Lion</div>
          </div>
          <div class="team-member">
            <b-link
              href="https://twitter.com/rightclickable"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="img-thumbnail team-img"
                :src="require('@/assets/team-RC-lion.png')"
                alt="NFT"
              />
            </b-link>
            <div class="text-center">RightClickable</div>
            <div class="text-center">Art Lion</div>
          </div>
          <div class="team-member">
            <b-link
              href="https://twitter.com/0xNeuroD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="img-thumbnail team-img"
                :src="require('@/assets/team-0xNeuroD-lion.png')"
                alt="NFT"
              />
            </b-link>
            <div class="text-center">0xNeuroD</div>
            <div class="text-center">Dev Lion</div>
          </div>
          <div class="team-member">
            <b-link
              href="https://twitter.com/bittymcbitface"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="img-thumbnail team-img"
                :src="require('@/assets/team-Bitty-lion.png')"
                alt="NFT"
              />
            </b-link>
            <div class="text-center">BittyMcBitface</div>
            <div class="text-center">Ops Lion</div>
          </div>
        </div>
        <p class="text-center">
          This project is led by
          <b-link
            href="https://twitter.com/Memphis"
            target="_blank"
            rel="noopener noreferrer"
            >Memphis</b-link
          >, the Alpha Lion, and powered by the team at
          <b-link
            href="https://rightclickable.com"
            target="_blank"
            rel="noopener noreferrer"
            >RightClickable.</b-link
          >
        </p>
      </section>

      <section class="mint mb-5">
        <h4 class="text-center">Mint</h4>
        <p>
          "Minting"... Minting is the process of attaining an NFT from the
          Solana blockchain. The mint is now live
          <b-link to="gallery">here</b-link>.
        </p>
      </section>

      <section class="roadmap mb-5">
        <h4 class="text-center">Roadmap</h4>
        <ul>
          <li class="p-2">
            <span class="fw-bold">Summer 2022 - </span>launch Memphis Lions Club
            Digital Platform (Memphisverse v0), Discord, and social channels
          </li>
          <li class="p-2">
            <span class="fw-bold">Fall 2022 - </span>launch the Memphis Lions
            Club NFT collection
          </li>
          <li class="p-2">
            <span class="fw-bold">Fall 2022 - </span>launch Memphisverse
            Metastage v1
          </li>
          <li class="p-2">
            <span class="fw-bold">Winter 2022 - </span>launch Memphisverse
            Metagallery v1
          </li>
          <li class="p-2">
            <span class="fw-bold">Summer 2023 - </span>launch Lionesses NFT
            Collection (4,999 Lionesses 1:1 swappable for Lions)
          </li>
          <li class="p-2">
            <span class="fw-bold">Winter 2023 - </span>launch Memphisverse Arena
            v1 partner gamification
          </li>
          <li class="p-2">
            <span class="fw-bold">Spring 2024 - </span>launch Memphisverse v2
            and integrated network of RightClickable Multimetaverses
          </li>
        </ul>
      </section>

      <section class="whitelist mb-5">
        <h4 class="text-center">Whitelist</h4>
        <p>
          Initially there will be 1,500 whitelist (WL) spots for early adopters
          and active community members. The number of WL spots will be increased
          in steps of 1,500 as community milestones are achieved and we progress
          towards the mint date. Demand for Lions will be high, but we want to
          start off as we mean to go on, with as many Lions as possible in the
          hands of those community members who support the project and want to
          <b-link
            href="https://twitter.com/search?q=%23LiveLikeALion"
            target="_blank"
            rel="noopener noreferrer"
          >
            #LiveLikeALion.
          </b-link>
          Details on how to participate are available in our
          <b-link
            href="https://discord.gg/MemphisLionsClub"
            target="_blank"
            rel="noopener noreferrer"
            >Discord.
          </b-link>
        </p>
      </section>

      <section class="rarity mb-5">
        <h4 class="text-center">Rarity</h4>
        <p>
          The rarity score of your Lion will be calculated and will depend on
          the number of traits and the number of times each trait occurs in the
          collection. However, each Lion is unique with its own distinct
          personality and therefore rarity alone should not be the deciding
          factor when you become a Lion.
        </p>
      </section>
    </main>
    <PageFooter no-top-margin />
  </b-container>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template: 1fr;
}

.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
}

.team-img {
  min-width: 125px;
  min-height: 125px;
  margin-bottom: 0.5rem;
  background-color: #fff;

  &:hover {
    transform: scale(1.15);
  }
}

@media (max-width: 576px) {
  .team-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

@media (max-width: 1200px) {
  section {
    margin: 2rem 0;
  }
}
</style>
