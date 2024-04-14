import { createJsonTranslator, createLanguageModel } from "typechat";
import { createTypeScriptJsonValidator } from "typechat/ts";
import { CarelonWorkflow, MODEL_AS_STRING } from "./models";

export const useGPTModel = (apiKey: string) => {
    if (!apiKey) {
        return;
    }
    const model = createLanguageModel({
        OPENAI_MODEL: 'gpt-3.5-turbo',
        OPENAI_API_KEY: apiKey
    });
    const schema = MODEL_AS_STRING;
    
    const validator = createTypeScriptJsonValidator<CarelonWorkflow>(schema, "CarelonWorkflow");
    const translator = createJsonTranslator(model, validator);
    const textHandler = async (text: string) => {
        try {
    
            // query TypeChat to translate this into an intent
            const response = await translator.translate(text);
            if (!response.success) {
                throw response;
            }
    
        return response.data;
    
        } catch (error: any) {
            if (error.message.includes("401")) {
                await alert('Invalid API key');
                window.location.reload();
            }
            console.log(error);
        }
    }
    return textHandler;
}
