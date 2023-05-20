import Card from "@components/Card";
import axios from "axios";
import Image from "next/image";

const getRecipes = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/recipes");

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error, display an error message, or take appropriate action
  }
};

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="grid grid-cols-2">
      <div className="px-6 sm:px-16 py-6 col-span-2 lg:col-span-1">
        <h3 className="my-6 text-2xl font-semibold text-slate-700/90">
          Welcome to Recipe App
        </h3>
        <p className="text-sm text-slate-900">
          Create and categorize your recipes
        </p>
        {/* <h3 className="text-5xl text-slate-700 text-center font-semibold">
        Recipes
      </h3> */}
        <div className="flex flex-col my-6 gap-4 w-full lg:w-5/6 h-[60vh] overflow-y-scroll py-2 px-1">
          {recipes.length > 0 &&
            recipes.map((recipe) => (
              <Card
                id={recipe._id}
                key={recipe._id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                author={recipe.user.username}
                categories={recipe.categories}
              />
            ))}
        </div>
      </div>
      <div className=" justify-center items-center hidden lg:flex">
        <Image
          width={300}
          height={300}
          alt="image"
          src={"/images/recipe.png"}
        />
      </div>
    </div>
  );
}
