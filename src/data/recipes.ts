import biryani from "@/assets/hero-biryani.jpg";
import masalaDosa from "@/assets/masala-dosa.jpg";
import chicken65 from "@/assets/chicken-65.jpg";
import paneerButterMasala from "@/assets/paneer-butter-masala.jpg";
import paniPuri from "@/assets/pani-puri.jpg";
import samosa from "@/assets/samosa.jpg";
import eggCurry from "@/assets/egg-curry.jpg";
import alooChaat from "@/assets/aloo-chaat.jpg";
import chickenPepperFry from "@/assets/chicken-pepper-fry.jpg";
import idliSambar from "@/assets/idli-sambar.jpg";
import butterChicken from "@/assets/butter-chicken.jpg";
import vegPulao from "@/assets/veg-pulao.jpg";
import gulabJamun from "@/assets/gulab-jamun.jpg";
import pavBhaji from "@/assets/pav-bhaji.jpg";
import choleBhature from "@/assets/chole-bhature.jpg";
import poha from "@/assets/poha.jpg";

export type DietType = "veg" | "nonveg";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type RecipeIngredient = {
  name: string;
  quantity: string;
};

export type RecipeStep = {
  title: string;
  detail: string;
};

export type Recipe = {
  slug: string;
  name: string;
  image: string;
  diet: DietType;
  region: string;
  minutes: number;
  rating: number;
  difficulty: Difficulty;
  servings: number;
  tags: string[];
  blurb: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
};

const genericSteps = (name: string): RecipeStep[] => [
  {
    title: "Prep the aromatics",
    detail: `Finely slice onions, chop tomatoes and crush ginger-garlic. Keeping everything ready before the pan gets hot is what keeps ${name} balanced.`,
  },
  {
    title: "Build the base",
    detail:
      "Heat oil or ghee, temper whole spices until fragrant, then sauté onions on medium heat until deep golden — roughly 8 minutes. Do not rush this stage.",
  },
  {
    title: "Add the masala",
    detail:
      "Stir in ginger-garlic paste, then tomatoes with turmeric, chilli and coriander powder. Cook until the oil separates at the edges.",
  },
  {
    title: "Cook the main",
    detail: `Add the primary ingredients for ${name}, coat well in the masala, season with salt and cook covered on low heat so everything absorbs the spice.`,
  },
  {
    title: "Finish and rest",
    detail:
      "Adjust salt and heat, finish with fresh coriander and a squeeze of lemon. Rest for 5 minutes off the flame before serving.",
  },
];

export const recipes: Recipe[] = [
  {
    slug: "chicken-biryani",
    name: "Chicken Biryani",
    image: biryani,
    diet: "nonveg",
    region: "Hyderabadi",
    minutes: 60,
    rating: 4.9,
    difficulty: "Medium",
    servings: 4,
    tags: ["Non-Vegetarian", "North Indian", "Rice & Biryani", "Popular"],
    blurb:
      "Layered dum biryani with marinated chicken, saffron rice and fried onions.",
    ingredients: [
      { name: "Chicken", quantity: "500 g" },
      { name: "Basmati Rice", quantity: "2 cups" },
      { name: "Onion", quantity: "2 large" },
      { name: "Tomato", quantity: "2" },
      { name: "Ginger Garlic Paste", quantity: "2 tbsp" },
      { name: "Yogurt", quantity: "1/2 cup" },
      { name: "Mint Leaves", quantity: "1/4 cup" },
      { name: "Coriander", quantity: "1/4 cup" },
      { name: "Biryani Masala", quantity: "2 tbsp" },
      { name: "Ghee", quantity: "3 tbsp" },
      { name: "Saffron + Milk", quantity: "1 pinch / 3 tbsp" },
      { name: "Salt", quantity: "to taste" },
    ],
    steps: [
      {
        title: "Marinate the Chicken",
        detail:
          "Mix chicken with yogurt, ginger-garlic paste, biryani masala, chilli powder, salt, mint and coriander. Rest for at least 30 minutes — overnight is better.",
      },
      {
        title: "Prepare the Rice",
        detail:
          "Soak basmati for 20 minutes. Boil water with bay leaf, cardamom, cloves and salt, then cook the rice only to 70% — it must still have a bite.",
      },
      {
        title: "Prepare the Masala",
        detail:
          "Fry sliced onions in ghee until deep golden and crisp. Reserve half for layering and cook the marinated chicken in the rest until it thickens.",
      },
      {
        title: "Layer the Biryani",
        detail:
          "Spread the chicken masala at the base, layer the drained rice over it, then scatter fried onions, mint, saffron milk and ghee across the top.",
      },
      {
        title: "Cook on Dum",
        detail:
          "Seal the pot with dough or a tight lid, cook on high for 3 minutes, then on the lowest heat for 20 minutes. Rest 10 minutes and fluff gently from the edges.",
      },
    ],
  },
  {
    slug: "masala-dosa",
    name: "Masala Dosa",
    image: masalaDosa,
    diet: "veg",
    region: "South Indian",
    minutes: 25,
    rating: 4.8,
    difficulty: "Medium",
    servings: 3,
    tags: ["Vegetarian", "South Indian", "Breakfast", "Popular"],
    blurb: "Crisp golden dosa with spiced potato masala, chutney and sambar.",
    ingredients: [
      { name: "Dosa Batter", quantity: "3 cups" },
      { name: "Potato", quantity: "4 medium" },
      { name: "Onion", quantity: "2" },
      { name: "Green Chilli", quantity: "2" },
      { name: "Mustard Seeds", quantity: "1 tsp" },
      { name: "Curry Leaves", quantity: "1 sprig" },
      { name: "Turmeric", quantity: "1/2 tsp" },
      { name: "Oil", quantity: "3 tbsp" },
    ],
    steps: genericSteps("Masala Dosa"),
  },
  {
    slug: "chicken-65",
    name: "Chicken 65",
    image: chicken65,
    diet: "nonveg",
    region: "South Indian",
    minutes: 30,
    rating: 4.7,
    difficulty: "Easy",
    servings: 3,
    tags: ["Non-Vegetarian", "South Indian", "Snacks", "Popular"],
    blurb: "Crisp fried chicken tossed with curry leaves, chilli and yogurt.",
    ingredients: [
      { name: "Chicken", quantity: "400 g" },
      { name: "Yogurt", quantity: "3 tbsp" },
      { name: "Corn Flour", quantity: "3 tbsp" },
      { name: "Ginger Garlic Paste", quantity: "1 tbsp" },
      { name: "Chilli Powder", quantity: "2 tsp" },
      { name: "Curry Leaves", quantity: "2 sprigs" },
      { name: "Oil", quantity: "for frying" },
    ],
    steps: genericSteps("Chicken 65"),
  },
  {
    slug: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    image: paneerButterMasala,
    diet: "veg",
    region: "North Indian",
    minutes: 35,
    rating: 4.8,
    difficulty: "Easy",
    servings: 4,
    tags: ["Vegetarian", "North Indian", "Popular", "Dinner"],
    blurb: "Paneer cubes simmered in a silky tomato, cashew and butter gravy.",
    ingredients: [
      { name: "Paneer", quantity: "300 g" },
      { name: "Tomato", quantity: "4" },
      { name: "Onion", quantity: "1" },
      { name: "Cashews", quantity: "12" },
      { name: "Butter", quantity: "3 tbsp" },
      { name: "Cream", quantity: "1/4 cup" },
      { name: "Kasuri Methi", quantity: "1 tsp" },
    ],
    steps: genericSteps("Paneer Butter Masala"),
  },
  {
    slug: "pani-puri",
    name: "Pani Puri",
    image: paniPuri,
    diet: "veg",
    region: "Street Food",
    minutes: 20,
    rating: 4.9,
    difficulty: "Medium",
    servings: 4,
    tags: ["Vegetarian", "Chaat", "Snacks", "Quick Meals"],
    blurb: "Crisp puris filled with spiced water, potato and tangy chutney.",
    ingredients: [
      { name: "Puri Shells", quantity: "24" },
      { name: "Potato", quantity: "3" },
      { name: "Mint", quantity: "1 cup" },
      { name: "Tamarind", quantity: "2 tbsp" },
      { name: "Chaat Masala", quantity: "2 tsp" },
      { name: "Boiled Chickpeas", quantity: "1/2 cup" },
    ],
    steps: genericSteps("Pani Puri"),
  },
  {
    slug: "samosa",
    name: "Samosa",
    image: samosa,
    diet: "veg",
    region: "North Indian",
    minutes: 40,
    rating: 4.7,
    difficulty: "Medium",
    servings: 6,
    tags: ["Vegetarian", "Snacks", "Chaat", "North Indian"],
    blurb: "Flaky pastry parcels stuffed with spiced potato and peas.",
    ingredients: [
      { name: "Maida", quantity: "2 cups" },
      { name: "Potato", quantity: "4" },
      { name: "Green Peas", quantity: "1/2 cup" },
      { name: "Cumin Seeds", quantity: "1 tsp" },
      { name: "Garam Masala", quantity: "1 tsp" },
      { name: "Oil", quantity: "for frying" },
    ],
    steps: genericSteps("Samosa"),
  },
  {
    slug: "egg-curry",
    name: "Egg Curry",
    image: eggCurry,
    diet: "nonveg",
    region: "North Indian",
    minutes: 30,
    rating: 4.6,
    difficulty: "Easy",
    servings: 3,
    tags: ["Non-Vegetarian", "North Indian", "Quick Meals", "Dinner"],
    blurb: "Boiled eggs simmered in a rich onion-tomato masala.",
    ingredients: [
      { name: "Eggs", quantity: "6" },
      { name: "Onion", quantity: "2" },
      { name: "Tomato", quantity: "3" },
      { name: "Ginger Garlic Paste", quantity: "1 tbsp" },
      { name: "Garam Masala", quantity: "1 tsp" },
      { name: "Coriander", quantity: "handful" },
    ],
    steps: genericSteps("Egg Curry"),
  },
  {
    slug: "aloo-chaat",
    name: "Aloo Chaat",
    image: alooChaat,
    diet: "veg",
    region: "Street Food",
    minutes: 15,
    rating: 4.5,
    difficulty: "Easy",
    servings: 2,
    tags: ["Vegetarian", "Chaat", "Quick Meals", "Snacks"],
    blurb: "Crisp fried potato tossed with yogurt, chutneys and chaat masala.",
    ingredients: [
      { name: "Potato", quantity: "4" },
      { name: "Yogurt", quantity: "1/2 cup" },
      { name: "Tamarind Chutney", quantity: "3 tbsp" },
      { name: "Chaat Masala", quantity: "2 tsp" },
      { name: "Sev", quantity: "1/4 cup" },
    ],
    steps: genericSteps("Aloo Chaat"),
  },
  {
    slug: "chicken-pepper-fry",
    name: "Chicken Pepper Fry",
    image: chickenPepperFry,
    diet: "nonveg",
    region: "South Indian",
    minutes: 25,
    rating: 4.8,
    difficulty: "Easy",
    servings: 3,
    tags: ["Non-Vegetarian", "South Indian", "Quick Meals", "Dinner"],
    blurb: "Dry roasted chicken with crushed black pepper and curry leaves.",
    ingredients: [
      { name: "Chicken", quantity: "500 g" },
      { name: "Onion", quantity: "2" },
      { name: "Tomato", quantity: "1" },
      { name: "Garlic", quantity: "8 cloves" },
      { name: "Ginger", quantity: "1 inch" },
      { name: "Black Pepper", quantity: "2 tbsp" },
    ],
    steps: genericSteps("Chicken Pepper Fry"),
  },
  {
    slug: "idli-sambar",
    name: "Idli & Sambar",
    image: idliSambar,
    diet: "veg",
    region: "South Indian",
    minutes: 20,
    rating: 4.7,
    difficulty: "Easy",
    servings: 4,
    tags: ["Vegetarian", "South Indian", "Breakfast", "Quick Meals"],
    blurb: "Steamed rice cakes served with lentil sambar and chutney.",
    ingredients: [
      { name: "Idli Batter", quantity: "3 cups" },
      { name: "Toor Dal", quantity: "1 cup" },
      { name: "Sambar Powder", quantity: "2 tbsp" },
      { name: "Tamarind", quantity: "1 tbsp" },
      { name: "Mixed Vegetables", quantity: "1 cup" },
    ],
    steps: genericSteps("Idli & Sambar"),
  },
  {
    slug: "butter-chicken",
    name: "Butter Chicken",
    image: butterChicken,
    diet: "nonveg",
    region: "North Indian",
    minutes: 45,
    rating: 4.9,
    difficulty: "Medium",
    servings: 4,
    tags: ["Non-Vegetarian", "North Indian", "Popular", "Dinner"],
    blurb: "Tandoori chicken folded into a velvety tomato and butter gravy.",
    ingredients: [
      { name: "Chicken", quantity: "600 g" },
      { name: "Tomato", quantity: "5" },
      { name: "Butter", quantity: "4 tbsp" },
      { name: "Cream", quantity: "1/3 cup" },
      { name: "Yogurt", quantity: "1/2 cup" },
      { name: "Kasuri Methi", quantity: "1 tsp" },
    ],
    steps: genericSteps("Butter Chicken"),
  },
  {
    slug: "vegetable-pulao",
    name: "Vegetable Pulao",
    image: vegPulao,
    diet: "veg",
    region: "North Indian",
    minutes: 30,
    rating: 4.5,
    difficulty: "Easy",
    servings: 4,
    tags: ["Vegetarian", "Rice & Biryani", "Quick Meals", "North Indian"],
    blurb: "Fragrant basmati cooked with whole spices and garden vegetables.",
    ingredients: [
      { name: "Basmati Rice", quantity: "2 cups" },
      { name: "Carrot", quantity: "1" },
      { name: "Green Peas", quantity: "1/2 cup" },
      { name: "Beans", quantity: "8" },
      { name: "Whole Spices", quantity: "1 tbsp" },
      { name: "Ghee", quantity: "2 tbsp" },
    ],
    steps: genericSteps("Vegetable Pulao"),
  },
  {
    slug: "gulab-jamun",
    name: "Gulab Jamun",
    image: gulabJamun,
    diet: "veg",
    region: "North Indian",
    minutes: 40,
    rating: 4.8,
    difficulty: "Medium",
    servings: 6,
    tags: ["Vegetarian", "Desserts", "North Indian"],
    blurb: "Golden milk dumplings soaked in cardamom-rose sugar syrup.",
    ingredients: [
      { name: "Khoya", quantity: "250 g" },
      { name: "Maida", quantity: "3 tbsp" },
      { name: "Sugar", quantity: "2 cups" },
      { name: "Cardamom", quantity: "4 pods" },
      { name: "Rose Water", quantity: "1 tsp" },
    ],
    steps: genericSteps("Gulab Jamun"),
  },
  {
    slug: "pav-bhaji",
    name: "Pav Bhaji",
    image: pavBhaji,
    diet: "veg",
    region: "Street Food",
    minutes: 35,
    rating: 4.7,
    difficulty: "Easy",
    servings: 4,
    tags: ["Vegetarian", "Chaat", "Snacks", "Quick Meals"],
    blurb: "Buttery mashed vegetable bhaji with toasted pav.",
    ingredients: [
      { name: "Potato", quantity: "4" },
      { name: "Cauliflower", quantity: "1 cup" },
      { name: "Green Peas", quantity: "1/2 cup" },
      { name: "Pav Bhaji Masala", quantity: "2 tbsp" },
      { name: "Butter", quantity: "4 tbsp" },
      { name: "Pav", quantity: "8" },
    ],
    steps: genericSteps("Pav Bhaji"),
  },
  {
    slug: "chole-bhature",
    name: "Chole Bhature",
    image: choleBhature,
    diet: "veg",
    region: "North Indian",
    minutes: 50,
    rating: 4.8,
    difficulty: "Medium",
    servings: 4,
    tags: ["Vegetarian", "North Indian", "Popular", "Breakfast"],
    blurb: "Spiced chickpea curry with puffed, golden bhature.",
    ingredients: [
      { name: "Chickpeas", quantity: "2 cups" },
      { name: "Onion", quantity: "2" },
      { name: "Tomato", quantity: "3" },
      { name: "Chole Masala", quantity: "2 tbsp" },
      { name: "Maida", quantity: "2 cups" },
      { name: "Yogurt", quantity: "1/4 cup" },
    ],
    steps: genericSteps("Chole Bhature"),
  },
  {
    slug: "poha",
    name: "Kanda Poha",
    image: poha,
    diet: "veg",
    region: "North Indian",
    minutes: 15,
    rating: 4.6,
    difficulty: "Easy",
    servings: 2,
    tags: ["Vegetarian", "Breakfast", "Quick Meals"],
    blurb: "Flattened rice tossed with peanuts, curry leaves and lemon.",
    ingredients: [
      { name: "Poha", quantity: "2 cups" },
      { name: "Onion", quantity: "1" },
      { name: "Peanuts", quantity: "1/4 cup" },
      { name: "Mustard Seeds", quantity: "1 tsp" },
      { name: "Curry Leaves", quantity: "1 sprig" },
      { name: "Lemon", quantity: "1" },
    ],
    steps: genericSteps("Kanda Poha"),
  },
];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);

export const byTag = (tag: string, limit = 8) =>
  recipes.filter((r) => r.tags.includes(tag)).slice(0, limit);

export const categories = [
  "All",
  "Vegetarian",
  "Non-Vegetarian",
  "South Indian",
  "North Indian",
  "Chaat",
  "Quick Meals",
  "Breakfast",
  "Rice & Biryani",
  "Snacks",
  "Desserts",
] as const;

export const filterByCategory = (category: string) =>
  category === "All" ? recipes : recipes.filter((r) => r.tags.includes(category));

/** Deterministic ingredient-match scoring used by the "What can I cook" flow. */
export function matchRecipes(pantry: string[]) {
  const owned = pantry.map((i) => i.trim().toLowerCase()).filter(Boolean);
  return recipes
    .map((recipe) => {
      const have = recipe.ingredients.filter((ing) =>
        owned.some(
          (o) => ing.name.toLowerCase().includes(o) || o.includes(ing.name.toLowerCase()),
        ),
      );
      const core = Math.min(recipe.ingredients.length, 6);
      const matched = Math.min(have.length, core);
      const percent = Math.round((matched / core) * 100);
      return { recipe, matched, core, percent, missing: recipe.ingredients.length - have.length };
    })
    .filter((m) => m.matched > 0)
    .sort((a, b) => b.percent - a.percent);
}
