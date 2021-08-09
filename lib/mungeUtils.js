export function formatPrompts(data) {

  return data.map(prompt => {
    if(prompt.prompt.image){
      return {
        promptId: prompt.prompt.id,
        title: prompt.prompt.title,
        text: prompt.prompt.text,
      };
    } else {
      return  {
        promptId: prompt.prompt.id,
        title: prompt.prompt.title,
        text: prompt.prompt.text,
      };
    }

  });

} 
