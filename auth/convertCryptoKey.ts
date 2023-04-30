function removeLines(str: string) {
    return str.replace("\n", "");
  }
  
  function base64ToArrayBuffer(b64: string) {
    const byteString = atob(b64);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
  }
  
  export function pemToArrayBuffer(pemKey: string, type: "PUBLIC" | "PRIVATE") {
    const b64Lines = removeLines(pemKey);
    const b64Prefix = b64Lines.replace(`-----BEGIN ${type} KEY-----`, "");
    const b64Final = b64Prefix.replace(`-----END ${type} KEY-----`, "");
    const b64Final2 = b64Final.replace(`-----END RSA PRIVATE KEY-----`, "");
    const b64Final3 = b64Final2.replace(`-----BEGIN RSA PRIVATE KEY-----`, "");
    console.log(b64Final3);

    return base64ToArrayBuffer(b64Final3);
  }
  export function convertToCryptoKey({
    pemKey,
    type,
  }: {
    pemKey: string;
    type: "PUBLIC" | "PRIVATE";
  }) {
    if (type === "PRIVATE") {
      return crypto.subtle.importKey(
        "pkcs8",
        pemToArrayBuffer(pemKey, type),
        {
          name: "c",
          hash: { name: "SHA-256" },
        },
        false,
        ["sign"]
      );
    } else if (type === "PUBLIC") {
      return crypto.subtle.importKey(
        "spki",
        pemToArrayBuffer(pemKey, type),
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: { name: "SHA-256" },
        },
        false,
        ["verify"]
      );
    }
  }
  