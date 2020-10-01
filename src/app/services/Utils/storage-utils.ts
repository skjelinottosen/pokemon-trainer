// Gets data from local storage
export function getStorage<T>(key: string): T {
    const encrypted  = localStorage.getItem(key); 
    // Checks if local storage is not null
    if(encrypted!=null){
        // Decrypts the data
        const decrypted = atob(encrypted);
        // Returns as a object
        return JSON.parse(decrypted);
    }
}

// Sets data in locla storage
export function setStorage(key: string, value: any): void {
    // Encrypts det data
    const encrypted = btoa(JSON.stringify(value));
    // Stores the data
    localStorage.setItem(key, encrypted);
}