import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  description: {
    type: String,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;
