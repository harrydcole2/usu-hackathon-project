export class ResponseParser {
  public parse(queryString: string) {
    const recipesList = queryString.split("***").map((recipe) => recipe.trim());
    return recipesList;
  }
}
