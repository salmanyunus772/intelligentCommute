package com.example.intelligentcommuting;

import android.app.Notification;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.os.IBinder;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import org.json.JSONException;
import org.json.JSONObject;

import io.nlopez.smartlocation.OnLocationUpdatedListener;
import io.nlopez.smartlocation.SmartLocation;
import io.nlopez.smartlocation.location.config.LocationAccuracy;
import io.nlopez.smartlocation.location.config.LocationParams;

import static com.example.intelligentcommuting.App.SEND_LOCATION_CHANNEL_ID;

public class LocationSendService extends Service {

    String token;
    private LocationManager locationManager;
    SmartLocation smartLocation = null;
    LocationParams.Builder builder;

    @Override
    public void onCreate() {
        super.onCreate();
        locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        smartLocation = new SmartLocation.Builder(this).logging(true).build();
        builder = new LocationParams.Builder()
                .setAccuracy(LocationAccuracy.HIGH)
                .setDistance(0)
                .setInterval(5000);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        token=intent.getStringExtra("token");

        try{
            smartLocation.with(this)
                    .location()
                    .config(LocationParams.BEST_EFFORT)
                    .continuous()
                    .config(builder.build())
                    .start(new OnLocationUpdatedListener() {
                        @Override
                        public void onLocationUpdated(Location location) {

                            ConnectionSame connectionSame = new ConnectionSame(LocationSendService.this, new ResponseListener() {
                                @Override
                                public void onSuccess(JSONObject response) {
                                    Toast.makeText(LocationSendService.this, "Location successfully posted", Toast.LENGTH_SHORT).show();
                                }

                                @Override
                                public void onFaliure(String errorMessage) {
                                    Toast.makeText(LocationSendService.this, errorMessage, Toast.LENGTH_SHORT).show();
                                }
                            }, "http://" + MainActivity.IpAndPort + "/api/driver/sendLocation");
                            Toast.makeText(LocationSendService.this, "Longitude : "+location.getLongitude()+" Latitude : "+location.getLatitude(), Toast.LENGTH_SHORT).show();
                            JSONObject jsonObject = new JSONObject();
                            try {
                                jsonObject.put("Longitude", location.getLongitude());
                                jsonObject.put("Latitude", location.getLatitude());
                                connectionSame.sendLocation(jsonObject, "post", token);
                            }
                            catch (JSONException e){
                                Toast.makeText(LocationSendService.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                            }
                        }
                    });
        }
        catch(SecurityException se){
            se.printStackTrace();
        }

        Notification notification = new NotificationCompat.Builder(this, SEND_LOCATION_CHANNEL_ID)
                .setContentTitle("Sharing Your Location")
                .setContentText("You started sharing your location with students.")
                .setSmallIcon(R.drawable.ic_location_on_black_24dp)
                .build();

        startForeground(2, notification);
        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        smartLocation.with(this).location().stop();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
