import connectToDB from "@utils/database";
import Prompt from '@models/prompt'


export const GET = async (request, {params}) =>{

    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response("prompt not founf", {status:404})

        return new Response(JSON.stringify(prompt), {status:200})
    } catch (error) {
        return new Response("failed to fetch all prompts", {status:500})
    }
}

export const PATCH = async (request, { params }) => {

    const {prompt, tag} = await request.json();

    try {
        await connectToDB();

        const exsistingPrompt  = await Prompt.findById(params.id);
        
        if (!exsistingPrompt) return new Response("Prompt not found", {status:404})
        
        exsistingPrompt.prompt = prompt;
        exsistingPrompt.tag = tag;

        await exsistingPrompt.save();

        return new Response(JSON.stringify(exsistingPrompt), {status:200})


    } catch (error) {

        return new Response("Failed to update the prompt", {status:500})
    }
    
}
export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
  
      // Ensure the ID parameter is provided
      if (!params.id) {
        throw new Error("No ID provided");
      }
  
      // Find the prompt by ID and remove it
      const result = await Prompt.findByIdAndDelete(params.id);
  
      // If no prompt is found, throw an error
      if (!result) {
        throw new Error("Prompt not found");
      }
  
      return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting prompt:", error.message);
      return new Response(`Error deleting prompt: ${error.message}`, { status: 500 });
    }
  };