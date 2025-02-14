import { checkKeyExists } from "../supabase/api-token";

export const validateApiKey = async (api_key: string) => {
  try {
    const isValid = await checkKeyExists({ value: api_key });
    return isValid;
  } catch (error) {
    throw new Error("Couldn't validate api key validity!");
  }
};
