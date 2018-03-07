import {Injectable} from "@angular/core";
import {CardInfo} from "../interface/card-info.interface";

@Injectable()
export class SessionService {
    mckBulk: any[] = [];
    qcBulk: any[] = [];
    wfhMapped: {[n: number]: CardInfo} = {};
    homeBase: string;
}
