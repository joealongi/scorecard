export const environment = async (variable: any): Promise<any> => {
  try {
    console.log("Environment Variables:");
    for (const key in process.env) {
      // You might want to filter out system-level environment variables
      // if you only want to see those loaded from your .env file.
      // For simplicity, this example lists all.
      console.log(`${key}: ${process.env[key]}`);
    }
    // Check for variable in both standard and prefixed formats
    const env = process.env?.[variable] ?? "";
    const app = process.env?.[`APP_SETTINGS_${variable}`] ?? "";
    // Return the found variable or null
    if (env) return env;
    if (app) return app;
    return null;
  } catch (error) {
    console.error("Error decrypting data");
    return error;
  }
};
