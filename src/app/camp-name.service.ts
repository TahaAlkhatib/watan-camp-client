import { BehaviorSubject } from "rxjs";

export class CampNameService {

    campName$ : BehaviorSubject<string> = new BehaviorSubject('')

}