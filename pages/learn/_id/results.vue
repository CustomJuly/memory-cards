<template>
  <div class="results">
    <TopBar hide-back-btn>
      {{ $t('congrats') }}
    </TopBar>
    <main class="results__content">
      <canvas
        ref="chart"
        class="mb-32"
      />
      <div class="flex justify-center mb-32">
        <NuxtLink :to="this.localePath('/')">
          <AppButton>
            {{ $t('Go home') }}
          </AppButton>
        </NuxtLink>
      </div>
      <div class="results__hardest">
        <ListItem
          v-for="{ card, frequency } in hardestCards"
          :key="card.id"
          :badge="`${frequency} ${$t('times')}`"
          @click="goToCard(card)"
        >
          {{ card.definition }}
        </ListItem>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ITrainingState} from "~/store/game";
import {appStore, gameStore} from "~/utils/store-accessor";
import {ICard, IDeck} from "~/types/deck";
import {distinctArray} from "~/utils/stats";
import {Chart} from "chart.js"

interface IFrequenceCard {
  card: ICard
  frequency: number
}

export default Vue.extend({
  name: "ResultsPage",
  computed: {
    deck(): IDeck {
      return appStore.getDeck(this.gameState.deckId) as IDeck
    },
    gameState(): ITrainingState {
      return gameStore.trainingState
    },
    knownCardsCount(): number {
      return this.deck.cards
        .filter(card => !this.gameState.cardsToLearn.find(c => c.id === card.id))
        .length
    },
    newCardsCount(): number {
      return distinctArray(this.gameState.cardsToLearn.slice(), 'id').length
    },
    hardestCards(): IFrequenceCard[] {
      const cardsToLearn: ICard[] = this.gameState.cardsToLearn
      const frequencies = new Map<string, IFrequenceCard>()

      cardsToLearn.forEach(card => {
        if (frequencies.has(card.id)) {
          let entity = frequencies.get(card.id) as IFrequenceCard
          entity.frequency++
        } else {
          frequencies.set(card.id, { card, frequency: 1 })
          frequencies.entries()
        }
      })

      return Array
        .from(frequencies.values())
        .sort((a, b) => b.frequency - a.frequency)
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const canvas = this.$refs.chart as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [this.$t('known'), this.$t('new')],
          datasets: [
            {
              label: 'Stats',
              data: [this.knownCardsCount, this.newCardsCount],
              backgroundColor: ['#EF5D88', '#6B4EFF'],
              datalabels: {
                color: '#FFF',
                font: {
                  size: 18
                }
              }
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 20,
                boxHeight: 20,
                usePointStyle: true,
                padding: 20,
                font: {
                  weight: '500'
                }
              }
            }
          }
        },
      })
    },
    goToCard(card: ICard) {
      this.$router.push({
        path: this.localePath(`/decks/${this.deck.id}/cards`),
        query: {
          scroll_to: card.id
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/mixins';

.results {
  @include col-layout;
  overflow: hidden;

  &__content {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
}
</style>
