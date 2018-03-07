import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";
import {Storage} from "@ionic/storage";
import {HomeBases} from "../interface/homebases.enum";

@Injectable()
export class DefaultHomeService {
    constructor(
        private _sessionService: SessionService,
        private _storage: Storage
    ) {}

    setHome(base: HomeBases) {
        this._storage.set('homebase', base);
        this._sessionService.homeBase = base;
    }

    getHome(callback?: any){
        this._storage.get('homebase').then(
            base => {
                if (base)
                    this._sessionService.homeBase = base;

                if (callback)
                    callback(base);
            }
        );
    }
}
