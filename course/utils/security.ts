export const decrypt = async (ciphertext: ArrayBuffer): Promise<any> => {
  try {
    console.log("Environment Variables:");
    for (const key in process.env) {
      // You might want to filter out system-level environment variables
      // if you only want to see those loaded from your .env file.
      // For simplicity, this example lists all.
      console.log(`${key}: ${process.env[key]}`);
    }
    const ppk = process.env.PRIVATE_KEY ?? "";
    const contents = ppk
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\s/g, "");
    const binary = Uint8Array?.from(atob(contents), (c) => c?.charCodeAt(0));
    const privateKey = await crypto?.subtle?.importKey(
      "pkcs8",
      binary.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["decrypt"]
    );
    const decrypted = await crypto?.subtle?.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      ciphertext
    );
    const decoder = new TextDecoder();
    const decoded = decoder?.decode(decrypted);
    return JSON?.parse(decoded);
  } catch (error) {
    console.error("Error decrypting data");
    return error;
  }
};
