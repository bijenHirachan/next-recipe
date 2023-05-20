import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
