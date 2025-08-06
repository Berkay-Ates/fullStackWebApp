import { LOCAL_STORAGE_KEYS } from "../constants/keys";
import { UserData } from "../storage/localStorage/model";

export class LocalStorageSingletonClass {
    private static _singletonInstance: LocalStorageSingletonClass;
    private userData: UserData | undefined;

    private constructor() {
        const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.user);

        try {
            if (storedUserData) {
                const parsedData: UserData = JSON.parse(storedUserData);
                this.userData = parsedData;
            }
        } catch (err) {
            console.warn("No JWT exists in the local storage.", err);
        }
    }

    public static get Instance() {
        return this._singletonInstance || (this._singletonInstance = new this());
    }

    public static getUserData(): UserData | undefined {
        return this.Instance.userData;
    }

    public static setUserData(data: UserData): void {
        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(data));
        this.Instance.userData = data;
    }

    public static clearUserData(): void {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
        this.Instance.userData = undefined;
    }
}
