//types e.g Snacks, Apitizers, Drinks, Main Course etc
export interface FoodType {
    id: string,
    name: string,
    lang: string
}

// categories such as Nort-Indian, South-Indian, German etc.
export interface Cuisine {
    id: string,
    name: string,
    lang: string
}
//Common world foods
export interface FoodItem {
    id: string,
    typeId: number,
    cuisineId: number
}
export interface FoodItemLang {
    id: string,
    lang: string,
    name: string,
    description: string
}
export const foodTypes:FoodType[] =[
    {id: "snacks", name: "Snacks",lang: "en"},
    {id: "starters", name: "Appetizers",lang: "en"},
    {id: "salads", name: "Salads",lang: "en"},
    {id: "side-item", name: "Side Items",lang: "en"},
    {id: "main-course", name: "Main Course",lang: "en"},
    {id: "wine", name: "Wine",lang: "en"},
    {id: "beer", name: "Beer",lang: "en"},
    {id: "liquors", name: "Liquors",lang: "en"},
    {id: "coffee", name: "Coffee",lang: "en"},
    {id: "breakfast", name: "Breakfast",lang: "en"},
    {id: "others", name: "Others",lang: "en"}
]

export const cuisines :Cuisine[] =[
    {id: "north-indian", name: "North Indian",lang: "en"},
    {id: "south-indian", name: "South Indian",lang: "en"},
    {id: "italian", name: "Italian",lang: "en"},
    {id: "mexican", name: "Mexican",lang: "en"},
    {id: "chinese", name: "Chinese",lang: "en"},
    {id: "thailand", name: "Thailand",lang: "en"},
    {id: "japanese", name: "Japanese",lang: "en"},
    {id: "greece", name: "Greece",lang: "en"},
    {id: "german", name: "German",lang: "en"},
    {id: "american", name: "American",lang: "en"},
    {id: "others", name: "Others",lang: "en"}
]

export const foodItems:FoodItem[] =[

]