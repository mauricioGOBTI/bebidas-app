import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
} 

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            set(state => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))

            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó correctamente',
                error: false
            })
        } else {
            set((state) => ({
                // favorites: [...get().favorites, recipe]
                favorites: [recipe, ...state.favorites]
            }))

            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })
        }
        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites');

        if(storeFavorites) {
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    }
})