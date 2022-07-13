import { IPlayingCard } from '~/pages/decks/_id/cards.vue'

export function filterEmptyCards(cards: IPlayingCard[]): IPlayingCard[] {
  return cards.filter(playingCard => playingCard.card.definition || playingCard.card.explanation)
}
