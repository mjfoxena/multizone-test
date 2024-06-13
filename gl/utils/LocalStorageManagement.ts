class LocalStorageManagement {
    lsKey: string

    constructor(name:string) {
      this.lsKey = name;
    }

    exists():boolean {
      return Boolean(this.getValue())
    }

    getValue(defaultValue=''):string|undefined {
        if (typeof window !== "undefined") {
            return localStorage.getItem(this.lsKey) || defaultValue;
        }
    }
   
    setValue(value){
        if (typeof window !== "undefined") {
            localStorage.setItem(this.lsKey, JSON.stringify(value))
        }
    }
    delete(){
        localStorage.removeItem(this.lsKey)
    }
}

const accessToken = new LocalStorageManagement('access_token');
const refreshToken = new LocalStorageManagement('refresh_token');


export {
    accessToken,
    refreshToken
};
