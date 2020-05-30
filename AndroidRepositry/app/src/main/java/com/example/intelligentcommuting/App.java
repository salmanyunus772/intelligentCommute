package com.example.intelligentcommuting;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

public class App extends Application {

    public static final String LOCATION_CHANNEL_ID =  "locationServiceChannel";
    public static final String SEND_LOCATION_CHANNEL_ID =  "sendLocationServiceChannel";
    public static final String ARRIVAL_NOTIFICATION_CHANNEL_ID =  "arrivalNotificationServiceChannel";

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
    }

    private void createNotificationChannel(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            NotificationChannel serviceChannel = new NotificationChannel(LOCATION_CHANNEL_ID, "Location Service Channel", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationChannel sendServiceChannel = new NotificationChannel(SEND_LOCATION_CHANNEL_ID, "Send Location Service Channel", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationChannel arrivalServiceChannel = new NotificationChannel(ARRIVAL_NOTIFICATION_CHANNEL_ID, "Arrival Notification Service Channel", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
            manager.createNotificationChannel(sendServiceChannel);
            manager.createNotificationChannel(arrivalServiceChannel);
        }
    }

}
