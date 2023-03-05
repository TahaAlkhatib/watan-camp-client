import { BehaviorSubject } from "rxjs";

export class CampNameService {

    campId = localStorage.getItem('campId')??"default"

    campName$ : BehaviorSubject<string> = new BehaviorSubject(this.campId)

}