const getFileNameFromUrl = (url: string, folderName: string): string | null => {

    const index = url.indexOf(folderName)

    if (folderName.includes('/')) {
        throw new Error("Folder contains a forward slash ('/').");
    }

    if (index !== -1) {
        const result = url.substring(index + `${folderName}/`.length);
        return result;
    } else {
        return null;
    }

}

export {getFileNameFromUrl}