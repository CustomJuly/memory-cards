import { Context } from '@nuxt/types'
import {isDecks} from "~/utils/validators";
import { appStore } from '~/utils/store-accessor'
import {IProfile} from "~/types/profile";

export default (context: Context) => {
  const decks: string | null = window.localStorage.getItem('decks')
  if (decks) {
    let parsedDecks: any = null
    try {
      // parse is throwable fn
      parsedDecks = JSON.parse(decks)
    } catch {
      console.warn("Invalid decks JSON in localStorage")
    }

    if (parsedDecks && isDecks(parsedDecks)) {
      appStore.setDecks(parsedDecks)
    } else {
      console.warn("Parsed decks array is invalid")
    }
  }

  const profile: string | null = window.localStorage.getItem('profile')
  if (profile) {
    try {
      const parsedProfile = JSON.parse(profile) as IProfile
      appStore.setName(parsedProfile.name)
    } catch {
      console.warn("Invalid profile JSON in localStorage")
    }
  }

  context.store.subscribe((mutation) => {
   if (mutation.type.includes('appstore/')) {
     window.localStorage.setItem('decks', JSON.stringify(appStore.decks))
     window.localStorage.setItem('profile', JSON.stringify(appStore.profile))
   }
  })
}
