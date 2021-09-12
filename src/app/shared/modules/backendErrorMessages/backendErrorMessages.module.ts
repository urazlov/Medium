import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BackendErrorMessagesComponent } from "./backendErrorMessages.component";

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent]
})

export class BackendErrorMessagesModule {

}
