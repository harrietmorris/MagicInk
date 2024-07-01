const persona = `
You are an award-winning children's stories author known for creating magical and richly detailed tales.
Your ultimate goal is to write the most beloved and popular collection of children's stories ever.`;

function getGuidelines(themes: string, readingLevel: string, location: string, readingTime: number) {
return `
  Writing Guidelines

  Create a Magical World. Dive into the imaginative universe you're crafting. 
  Use lively and colorful descriptions to paint scenes that captivate young minds. 
  Develop your characters with clear and relatable motivations, emotions, and personalities. 
  Let their adventures and challenges unfold in a way that engages children's curiosity and empathy. 
  Follow your outline but don't be afraid to let the story take unexpected turns.

  Use playful language, sensory details, and vibrant imagery to bring the setting, characters, and events to life.
  Introduce simple elements that can grow into fun twists or new adventures later in the story.
  Keep the tale intriguing but suitable for young readers, ensuring there's always a sense of wonder and discovery.
  Avoid wrapping up the plot too quickly.

  Remember, your main goal is to tell a full and engaging story.
  If you rush through it, children might lose interest.
  Make the story as exciting and detailed as possible, always adding more rather than summarizing.

  Write a childrens story with the following parameters:
  - The story should be about: "${themes}"
  - The story must be age appropriate for children with a Lexile reading level of ${readingLevel}
  - The story must be located in ${location}
  - The story must be readable in ${readingTime} minutes for children with a Lexile reading level of ${readingLevel}

  If you are not able to write the story for whatever reason you should return this message: "ERROR: could not write the story"`;
}


function createPrompt (
  readingLevel: string,
  location: string,
  readingTime: number,
  themes: string, 
  chooseYourStory: boolean = false, 
  breakpoints: number = 2
) {
  let writingPrompt = 'Write the full story now.';

  if (chooseYourStory && breakpoints > 0) {
    writingPrompt = `Write 1/${breakpoints + 1} of the story now. Give the reader 3 options to choose from at this critical point in the story. Each option should be prepended with a number and a colon. For example, "1: Go through the door."`;
  } 
  const starting_prompt = `
    ${persona.trim()}

    ${writingPrompt.trim()}
    The first line of text should be the title of the story.

    ${getGuidelines(themes, readingLevel, location, readingTime).trim()}`;

  return starting_prompt.trim();
}

function createContinuationPrompt(
  storyString: string,
  currentBreakpoint: number,
  breakpoints: number,
  optionSelected: number,
  themes: string,
  readingLevel: string,
  location: string,
  readingTime: number,
) {
  let writePrompt = `
  Write the next 1/${breakpoints + 1} of the story now.
  Give the reader 3 options to choose from at this critical point in the story.
  Each option should be prepended with a number and a colon. For example, "1: Go through the door."
  `;
  if (currentBreakpoint === breakpoints) {
    writePrompt = 'Write the final part of the story now.';
  }

  const prompt = `${persona.trim()}
  
  You have already written ${currentBreakpoint}/${breakpoints + 1} of the following story: 
  ${storyString.trim()}

  The reader has selected option ${optionSelected} to continue the story.
  ${writePrompt.trim()}

  ${getGuidelines(themes, readingLevel, location, readingTime).trim()}
  `
  return prompt.trim();
}

export {createPrompt, createContinuationPrompt};
