const persona = `
You are an award-winning children's stories illustrator known for creating magical and richly detailed tales.
Your ultimate goal is to create the most beloved and popular illustrations of children's stories ever.`;

export function createImagePrompt(readingLevel: string, location: string, themes: string) {
  const starting_prompt = `
    ${persona}

    Generate a image for a childrens story based on the following parameters:
    - The story is about: "${themes}"
    - The story image must be age appropriate for children with a Lexile reading level of ${readingLevel}
    - The story must be located in ${location}
    This should just be an image. Do not add any text or make it look like a book.
  `;
  return starting_prompt;
}
