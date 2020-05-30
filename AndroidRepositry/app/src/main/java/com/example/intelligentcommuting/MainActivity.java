package com.example.intelligentcommuting;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements ResponseListener{

    public static final String IpAndPort =  "192.168.10.40:3001";
    Button students = null;
    Button drivers = null;
    String url;
    ListView news=null;
    ArrayList<String> newsArray;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        if(sharedPreferences.getString("token", null)!=null){
            if(sharedPreferences.getString("user", null)!=null && sharedPreferences.getString("user", null).equals("student")) {
                Intent intent = new Intent(this, NavBarStudent.class);
                intent.putExtra("token", sharedPreferences.getString("token", null));
                startActivity(intent);
            }
            else if(sharedPreferences.getString("user", null)!=null && sharedPreferences.getString("user", null).equals("driver")){
                Intent intent = new Intent(this, NavBarDriver.class);
                intent.putExtra("token", sharedPreferences.getString("token", null));
                startActivity(intent);
            }
        }
        url="http://"+IpAndPort+"/api/admin/getNews";
        ConnectionSame connection = new ConnectionSame(MainActivity.this, this, url);
        connection.send("get");
        students = (Button) findViewById(R.id.students);
        students.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    Intent intent = new Intent(MainActivity.this, StudentLogin.class);
                    startActivity(intent);
            }
        });
        drivers = (Button) findViewById(R.id.drivers);
        drivers.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    Intent intent = new Intent(MainActivity.this, DriverLogin.class);
                    startActivity(intent);
            }
        });
    }

    @Override
    public void onSuccess(JSONObject response) {
        newsArray = new ArrayList<String>();
        try {
            JSONArray value = (JSONArray) response.get("news");
            JSONObject r;
            for (int i = 0; i < value.length(); i++) {
                r = (JSONObject) value.getJSONObject(i);
                newsArray.add(r.get("date").toString().substring(0,10)+" "+r.get("news"));
            }
            if(newsArray.size()==0)
                newsArray.add("No notifications to show!");
            news = (ListView) findViewById(R.id.news);
            ArrayAdapter adapter = new ArrayAdapter<String>(this,
                        R.layout.listview, newsArray);
            news.setAdapter(adapter);
        } catch (JSONException e) {
            // Something went wrong!
        }
        Log.d("Response", response.toString());
    }

    @Override
    public void onFaliure(String errorMessage) {
        newsArray = new ArrayList<String>();
        newsArray.add("No notifications to show!");
        news = (ListView) findViewById(R.id.news);
        ArrayAdapter adapter = new ArrayAdapter<String>(this,
                R.layout.listview, newsArray);
        news.setAdapter(adapter);
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }
}

