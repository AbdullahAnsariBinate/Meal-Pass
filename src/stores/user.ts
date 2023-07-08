import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { IStore, PVoid, StoreKeysOf } from '../utils/types';

export class UserStore implements IStore {
    type: "USER" | "RIDER" = "USER";

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: UserStore.name,
            properties: ['type'],
        });
    }

    // Unified set methods
    set<T extends StoreKeysOf<UserStore>>(what: T, value: UserStore[T]) {
        (this as UserStore)[what] = value;
    }
    setMany<T extends StoreKeysOf<UserStore>>(obj: Record<T, UserStore[T]>) {
        for (const [k, v] of Object.entries(obj)) {
            this.set(k as T, v as UserStore[T]);
        }
    }

    // Hydration
    hydrate = async (): PVoid => {
        await hydrateStore(this);
    };
}
