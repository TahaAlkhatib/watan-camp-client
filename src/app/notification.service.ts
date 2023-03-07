import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { LanguageService } from "@upupa/language";

@Injectable()
export class NotificationService {
    
  constructor(private router: Router,private lang:LanguageService) {}

  public initPush() {
    if (Capacitor.platform != "web") this.registerPush();
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive == "granted") PushNotifications.register();
    });

    PushNotifications.addListener( 'registration',(token)=>{
        console.log('My token: '+ JSON.stringify(token))
    })
    PushNotifications.addListener( 'registrationError',(error:any)=>{
        console.log('Error: '+ JSON.stringify(error))
    })
    PushNotifications.addListener( 'pushNotificationReceived',async (notification)=>{
        console.log('Push notification received: '+ JSON.stringify(notification))
    })
    PushNotifications.addListener( 'pushNotificationActionPerformed',async (notification)=>{
        console.log('Push notification received: '+ JSON.stringify(notification))
        const data  = notification.notification.data
        if (data.details){
            this.router.navigate([this.lang.language,'home',data.details])
        }
    })
    
  }
}
