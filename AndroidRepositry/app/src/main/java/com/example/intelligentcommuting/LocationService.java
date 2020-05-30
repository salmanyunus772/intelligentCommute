package com.example.intelligentcommuting;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.os.IBinder;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.android.gms.maps.model.LatLng;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import static com.example.intelligentcommuting.App.ARRIVAL_NOTIFICATION_CHANNEL_ID;
import static com.example.intelligentcommuting.App.LOCATION_CHANNEL_ID;

public class LocationService extends Service {

    double longitude = 0.0;
    double latitude = 0.0;
    String token;
    String name;
    String stop;
    Timer timer = new Timer();
    boolean arrivingSent = false;
    boolean arrivalSent = false;

    @Override
    public void onCreate() {
        super.onCreate();
        timer.schedule(new CheckLocation(), 0, 5000);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        token=intent.getStringExtra("token");
        name = intent.getStringExtra("name");
        stop = intent.getStringExtra("stop");
        LatLng lonLat = null;
        Geocoder gc = new Geocoder(this);
        List<Address> list=null;
        try {
            list = gc.getFromLocationName(stop, 1);
        }
        catch (IOException e){
            Toast.makeText(this, "IO Exception", Toast.LENGTH_SHORT).show();
        }
        Address add = list.get(0);
        lonLat=new LatLng(add.getLatitude(), add.getLongitude());
        longitude=lonLat.longitude;
        latitude=lonLat.latitude;

        Notification notification = new NotificationCompat.Builder(this, LOCATION_CHANNEL_ID)
                .setContentTitle("Bus Departure Notification")
                .setStyle(new NotificationCompat.BigTextStyle(new NotificationCompat.Builder(this, LOCATION_CHANNEL_ID)))
                .setContentText("Welcome "+name+"! Your bus stop is "+stop)
                .setSmallIcon(R.drawable.ic_location_on_black_24dp)
                .build();

        startForeground(1, notification);
        return START_NOT_STICKY;
    }

    private class CheckLocation extends TimerTask implements ResponseListener {

        public CheckLocation() {

        }

        @Override
        public void run() {
            ConnectionSame connectionSame = new ConnectionSame(LocationService.this, this, "http://" + MainActivity.IpAndPort + "/api/student/getLocation");
            connectionSame.getLocation("get", token);
        }

        @Override
        public void onSuccess(JSONObject response) {
            try {
                JSONArray loc =(JSONArray) response.get("location");
                double lat =(double) loc.get(0);
                double lng =(double) loc.get(1);
                if(Math.abs(longitude-lng)<=0.005 && Math.abs(longitude-lng)>0.002 && Math.abs(latitude-lat)<=0.005 && Math.abs(latitude-lat)>0.002 && !arrivingSent){
                    Intent showIntent = new Intent(getApplicationContext(), LocationService.class);
                    PendingIntent contentIntent = PendingIntent.getActivity(LocationService.this, 0, showIntent, 0);

                    NotificationCompat.Builder builder = new NotificationCompat.Builder(LocationService.this, ARRIVAL_NOTIFICATION_CHANNEL_ID);
                    builder.setSmallIcon(R.drawable.ic_location_on_black_24dp);
                    builder.setContentTitle("Bus Arriving");
                    builder.setStyle(new NotificationCompat.BigTextStyle(new NotificationCompat.Builder(LocationService.this, ARRIVAL_NOTIFICATION_CHANNEL_ID)));
                    builder.setContentText("Your bus is arriving at "+stop+" in 5 minutes");
                    builder.setContentIntent(contentIntent);
                    builder.setAutoCancel(true);
                    builder.setPriority(NotificationCompat.PRIORITY_DEFAULT);

                    NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(LocationService.this);
                    notificationManagerCompat.notify(3, builder.build());
                    arrivingSent=true;
                }
                else if(Math.abs(longitude-lng)<=0.002  && Math.abs(latitude-lat)<=0.002 && !arrivalSent){
                    Intent showIntent = new Intent(getApplicationContext(), LocationService.class);
                    PendingIntent contentIntent = PendingIntent.getActivity(LocationService.this, 0, showIntent, 0);

                    NotificationCompat.Builder builder = new NotificationCompat.Builder(LocationService.this, ARRIVAL_NOTIFICATION_CHANNEL_ID);
                    builder.setSmallIcon(R.drawable.ic_location_on_black_24dp);
                    builder.setContentTitle("Bus Arrival");
                    builder.setStyle(new NotificationCompat.BigTextStyle(new NotificationCompat.Builder(LocationService.this, ARRIVAL_NOTIFICATION_CHANNEL_ID)));
                    builder.setContentText("Your bus has arrived at "+stop);
                    builder.setContentIntent(contentIntent);
                    builder.setAutoCancel(true);
                    builder.setPriority(NotificationCompat.PRIORITY_DEFAULT);

                    NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(LocationService.this);
                    notificationManagerCompat.notify(3, builder.build());
                    arrivalSent=true;
                }
                else if((Math.abs(longitude-lng))>0.005  && (Math.abs(latitude-lat))>0.005){
                    if(arrivingSent) arrivingSent=false;
                    if(arrivalSent) arrivalSent=false;
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void onFaliure(String errorMessage) {
            Toast.makeText(LocationService.this, errorMessage, Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        timer.cancel();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

}
