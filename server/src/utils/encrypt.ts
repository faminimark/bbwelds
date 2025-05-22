import crypto from 'crypto'

export const encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

export const decrypt = (encryptedText: string, key: string) => {
    try {
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted text format. Expected iv:authTag:encryptedData');
        }
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encryptedData = parts[2];

        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        // @ts-ignore
        console.error('Decryption failed:', error.message);
        // In a real app, handle this error appropriately, e.g., by returning null
        // or throwing a custom error. Don't just log and continue if integrity is compromised.
        return null;
    }
}