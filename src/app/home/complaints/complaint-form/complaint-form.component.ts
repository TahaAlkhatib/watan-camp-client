import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "@upupa/data";
import { Complaint } from "src/app/model/complaint";

@Component({
  selector: "complaint-form",
  templateUrl: "complaint-form.component.html",
  styleUrls: ["complaint-form.component.scss"],
})
export class ComplaintFormComponent {
  complaint: Complaint = {
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    complaint: "",
  };
  constructor(private router: Router, private ds: DataService) {}
  navTo(url: string) {}
  back() {
    const lang = localStorage.getItem("language");
    this.router.navigate([`${lang}/home/complaints`]);
  }
  async onSubmit() {
    await this.ds.post("complaint", this.complaint);
  }
}
