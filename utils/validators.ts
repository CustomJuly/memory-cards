export function isCard(card: any): boolean {
  return 'id' in card && 'definition' in card && 'explanation' in card;
}

export function isDeck(deck: any): boolean {
  return 'id' in deck &&
    'name' in deck &&
    'cards' in deck &&
    Array.isArray(deck.cards) &&
    deck.cards.every((card: any) => isCard(card))
}

export function isDecks(decks: any): boolean {
  return Array.isArray(decks) && decks.every(deck => isDeck(deck))
}
