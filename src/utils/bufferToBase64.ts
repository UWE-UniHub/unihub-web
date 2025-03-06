export const bufferToBase64 = async (buffer: Uint8Array) => {
    const base64url: string = await new Promise(r => {
        const reader = new FileReader()
        reader.onload = () => r(reader.result as string)
        reader.readAsDataURL(new Blob([buffer]))
    });

    return base64url.slice(base64url.indexOf(',') + 1);
}