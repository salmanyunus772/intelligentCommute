package com.example.intelligentcommuting;

import android.Manifest;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.LocationManager;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.navigation.NavigationView;

import org.json.JSONException;
import org.json.JSONObject;

import io.nlopez.smartlocation.SmartLocation;
import io.nlopez.smartlocation.location.config.LocationAccuracy;
import io.nlopez.smartlocation.location.config.LocationParams;

public class NavBarDriver extends AppCompatActivity implements ResponseListener {

    JSONObject token;
    ConnectionSame connectionSame;

    private DrawerLayout d1;

    private LocationManager locationManager;

    SmartLocation smartLocation = null;

    double longitude = 0;
    double latitude = 0;
    LocationParams.Builder builder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.navbardriver);
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        final SharedPreferences.Editor editor = sharedPreferences.edit();
        locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        requestPermission();
        smartLocation = new SmartLocation.Builder(this).logging(true).build();

        Intent intent = getIntent();
        try {
            token = new JSONObject(intent.getStringExtra("token"));
        }
        catch (JSONException e){
            Toast.makeText(this, "JSON TOKEN EXCEPTION",Toast.LENGTH_SHORT).show();
        }
        d1=(DrawerLayout) findViewById(R.id.d1);
        final NavigationView nav_view = (NavigationView) findViewById(R.id.nav_view);
        String url="http://"+MainActivity.IpAndPort+"/api/driver/viewProfile";
        connectionSame = new ConnectionSame(NavBarDriver.this, this, url);
        builder = new LocationParams.Builder()
                .setAccuracy(LocationAccuracy.HIGH)
                .setDistance(0)
                .setInterval(5000);
        nav_view.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                if(menuItem.getItemId()==R.id.profile){
                    try {
                        connectionSame.viewProfile("post", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                }
                else if(menuItem.getItemId()==R.id.allowAccessLocation){
                    try {
                        startService(findViewById(android.R.id.content).getRootView(), token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                }
                else if(menuItem.getItemId()==R.id.stopLocationSending){
                        stopService(findViewById(android.R.id.content).getRootView());
                }
                else if(menuItem.getItemId()==R.id.lostFound){
                    Intent intent = new Intent(NavBarDriver.this, LostFound.class);
                    intent.putExtra("activityName",getClass().toString());
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.complain){
                    Intent intent = new Intent(NavBarDriver.this, Complain.class);
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.viewComplains){
                    Intent intent = new Intent(NavBarDriver.this, ViewComplains.class);
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.viewotherslostfoundposts){
                    Intent intent = new Intent(NavBarDriver.this, ViewLostFoundPosts.class);
                    intent.putExtra("activityName",getClass().toString());
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.viewyourlostfoundpostsreplies){
                    Intent intent = new Intent(NavBarDriver.this, ViewSelfLostFoundPosts.class);
                    intent.putExtra("activityName",getClass().toString());
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarDriver.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.logout){
                    AlertDialog.Builder builder = new AlertDialog.Builder(NavBarDriver.this);
                    builder.setTitle("LOGOUT!");
                    builder.setMessage("Are you sure to logout?");
                    builder.setCancelable(true);
                    builder.setPositiveButton("YES", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            editor.remove("token").apply();
                            stopService(findViewById(android.R.id.content).getRootView());
                            finish();
                        }
                    });
                    builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
                    AlertDialog alertDialog = builder.create();
                    alertDialog.show();
                }
                return true;
            }
        });
    }

//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        switch (requestCode){
//            case 10:
//                if(grantResults.length>0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
//                    return;
//        }
//    }
//

    private void requestPermission(){
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.INTERNET}, 1);
        if(!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)){
            this.startActivity(new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS));
        }
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        return       super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed(){
        moveTaskToBack(true);
    }

    @Override
    public void onSuccess(JSONObject response) {
        Intent intent = new Intent(this, DriverProfile.class);
        intent.putExtra("parsedToken", response.toString());
        startActivity(intent);
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

    public void startService(View v, String token){
        Intent serviceIntent = new Intent(this, LocationSendService.class);
        serviceIntent.putExtra("token", token);
        startService(serviceIntent);
    }

    public void stopService(View v){
        Intent serviceIntent = new Intent(this, LocationSendService.class);
        stopService(serviceIntent);
    }

}
