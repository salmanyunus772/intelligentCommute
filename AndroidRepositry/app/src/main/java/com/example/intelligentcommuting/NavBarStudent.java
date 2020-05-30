package com.example.intelligentcommuting;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.navigation.NavigationView;

import org.json.JSONException;
import org.json.JSONObject;

public class NavBarStudent extends AppCompatActivity implements ResponseListener{

    JSONObject token;
    ConnectionSame connectionSame;

    private DrawerLayout d1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        final SharedPreferences.Editor editor = sharedPreferences.edit();
        setContentView(R.layout.navbarstudent);
        Intent intent = getIntent();
        try {
            token = new JSONObject(intent.getStringExtra("token"));
        }
        catch (JSONException e){
            Toast.makeText(this, "JSON TOKEN EXCEPTION",Toast.LENGTH_SHORT).show();
        }
        d1=(DrawerLayout) findViewById(R.id.d1);
        final NavigationView nav_view = (NavigationView) findViewById(R.id.nav_view);
        String url="http://"+MainActivity.IpAndPort+"/api/student/viewProfile";
        connectionSame = new ConnectionSame(NavBarStudent.this, this, url);
        nav_view.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                if(menuItem.getItemId()==R.id.profile){
                    try {
                        connectionSame.viewProfile("post", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarStudent.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                }
                else if(menuItem.getItemId()==R.id.trackBus){
                    Intent intent = new Intent(NavBarStudent.this, MapsActivity.class);
                    try{
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        e.printStackTrace();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.lostFound){
                    Intent intent = new Intent(NavBarStudent.this, LostFound.class);
                    intent.putExtra("activityName",getClass().toString());
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarStudent.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.complainSuggestion){
                    Intent intent = new Intent(NavBarStudent.this, ComplainSuggestion.class);
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarStudent.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.viewcomplainsSuggestions){
                    Intent intent = new Intent(NavBarStudent.this, ViewComplainsSuggestions.class);
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarStudent.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.viewotherslostfoundposts){
                    Intent intent = new Intent(NavBarStudent.this, ViewLostFoundPosts.class);
                    intent.putExtra("activityName",getClass().toString());
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarStudent.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.viewyourlostfoundpostsreplies){
                    Intent intent = new Intent(NavBarStudent.this, ViewSelfLostFoundPosts.class);
                    intent.putExtra("activityName",getClass().toString());
                    try {
                        intent.putExtra("token", token.get("token").toString());
                    }
                    catch (JSONException e){
                        Toast.makeText(NavBarStudent.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    startActivity(intent);
                }
                else if(menuItem.getItemId()==R.id.logout){
                    AlertDialog.Builder builder = new AlertDialog.Builder(NavBarStudent.this);
                    builder.setTitle("LOGOUT!");
                    builder.setMessage("Are you sure to logout?");
                    builder.setCancelable(true);
                    builder.setPositiveButton("YES", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            stopService(findViewById(android.R.id.content).getRootView());
                            editor.remove("token").apply();
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
        Intent intent = new Intent(this, StudentProfile.class);
        intent.putExtra("parsedToken", response.toString());
        startActivity(intent);
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

    public void startService(View v, String stop){
        Intent serviceIntent = new Intent(this, LocationService.class);
        try {
            serviceIntent.putExtra("token", token.get("token").toString());
        }
        catch (JSONException e){
            Toast.makeText(this, "JSONException", Toast.LENGTH_SHORT).show();
        }
        serviceIntent.putExtra("stop", stop);
        startService(serviceIntent);
    }

    public void stopService(View v){
        Intent serviceIntent = new Intent(this, LocationService.class);
        stopService(serviceIntent);
    }

}
