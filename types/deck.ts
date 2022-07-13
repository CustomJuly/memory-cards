export interface ICard {
  id: string
  definition: string
  explanation: string
}

export interface IDeck {
  id: string
  name: string
  cards: ICard[]
}
