export const environment = async (variable: any): Promise<any> => {
  try {
    // Check for variable in both standard and prefixed formats
    const env = process.env?.[variable] ?? "";
    const app = process.env?.[`APPSETTING_${variable}`] ?? "";
    // Return the found variable or null
    if (env) return env;
    if (app) return app;
    return null;
  } catch (error) {
    console.error("Error decrypting data");
    return error;
  }
};
