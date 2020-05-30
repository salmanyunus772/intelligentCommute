package com.example.intelligentcommuting;

import androidx.fragment.app.FragmentActivity;

import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback, TaskLoadedCallback {

    private GoogleMap mMap;
    MarkerOptions origin, destination;
    Polyline currentPolyline;
    String token;
    Marker busMarker;
    String [] stops = {};
    Timer timer = new Timer();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        Intent intent = getIntent();
        token=intent.getStringExtra("token");
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        ConnectionSame connectionSame = new ConnectionSame(MapsActivity.this, new ResponseListener() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    JSONArray stopsArray = (JSONArray) response.get("stops");
                    stops = new String[stopsArray.length()];
                    for(int i=0;i<stops.length;i++){
                        stops[i]=(String) stopsArray.get(i);
                    }
                    LatLng [] markers = locator(stops);
                    for(int i=0;i<markers.length;i++) {
                        mMap.addMarker(new MarkerOptions().position(markers[i]).title("Stop " + stops[i]));
                    }
                    for(int i=0;i<markers.length-1;i++) {
                        origin = new MarkerOptions().position(markers[i]).title(stops[0]);
                        destination = new MarkerOptions().position(markers[i+1]).title(stops[stops.length - 1]);
                        String url = getUrl(origin.getPosition(), destination.getPosition(), "driving");
                        new FetchURL(MapsActivity.this).execute(url, "driving");
                    }
                }
                catch (JSONException e){
                    e.printStackTrace();
                }
            }

            @Override
            public void onFaliure(String errorMessage) {
                Toast.makeText(MapsActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
            }
        }, "http://" + MainActivity.IpAndPort + "/api/student/getStops");
        connectionSame.getStops("get", token);

        timer.schedule(new GetLocation(), 0, 5000);

    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */

    private class GetLocation extends TimerTask implements ResponseListener{

        public GetLocation() {
        }

        @Override
        public void run() {
            ConnectionSame connectionSame = new ConnectionSame(MapsActivity.this, this, "http://" + MainActivity.IpAndPort + "/api/student/getLocation");
            connectionSame.getLocation("get", token);
        }

        @Override
        public void onSuccess(JSONObject response) {
            try {
                JSONArray loc =(JSONArray) response.get("location");
                double lat =(double) loc.get(0);
                double lng =(double) loc.get(1);

                if(busMarker!=null)
                    busMarker.setPosition(new LatLng(lat,lng));
                mMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(lat, lng)));
            } catch (JSONException e) {
                e.printStackTrace();
            }

            Toast.makeText(MapsActivity.this, response.toString(), Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onFaliure(String errorMessage) {
            Toast.makeText(MapsActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        busMarker = mMap.addMarker(new MarkerOptions().position(new LatLng(0,0)).title("Your Bus"));
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(0,0), 13F));
    }

    public LatLng[] locator(String [] stops){
        LatLng [] markers = new LatLng [stops.length];
        Geocoder gc = new Geocoder(this);
        List<Address> list=null;
        for(int i=0;i<markers.length;i++){
            try {
                list = gc.getFromLocationName(stops[i], 1);
            }
            catch (IOException e){
                Toast.makeText(this, "IO Exception", Toast.LENGTH_SHORT).show();
            }
            Address add = list.get(0);
            markers[i]=new LatLng(add.getLatitude(), add.getLongitude());
        }
        return markers;
    }

    private String getUrl(LatLng origin, LatLng destination, String directionMode){
        String str_origin = "origin="+origin.latitude+","+origin.longitude;
        String str_destination = "destination="+destination.latitude+","+destination.longitude;
        String mode = "mode="+directionMode;
        String parameters = str_origin+"&"+str_destination+"&"+mode;
        String url = "https://maps.googleapis.com/maps/api/directions/json"+"?"+parameters+"&key="+getString(R.string.google_maps_key);
        return url;
    }

    @Override
    public void onTaskDone(Object... values) {
        currentPolyline = mMap.addPolyline((PolylineOptions) values[0]);
    }

    @Override
    protected void onStop() {
        super.onStop();
        timer.cancel();
    }
}
