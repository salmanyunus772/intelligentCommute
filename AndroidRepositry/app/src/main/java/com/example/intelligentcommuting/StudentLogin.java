package com.example.intelligentcommuting;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.InputType;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class StudentLogin extends AppCompatActivity implements ResponseListener{

    Button signup = null;
    Button submit = null;
    Button forgetPassword = null;
    Button guestStudent = null;
    EditText email = null;
    EditText password = null;
    String url;
    String tokenValue="";
    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.studentsignin);
        email = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
        password.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        submit = (Button) findViewById(R.id.submit);
        url="http://"+MainActivity.IpAndPort+"/api/student/login";
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        editor = sharedPreferences.edit();
        final ConnectionSame connectionSame = new ConnectionSame(StudentLogin.this, this, url);
        submit.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try{
                    jsonObject.put("email", email.getText().toString());
                    jsonObject.put("pass", password.getText().toString());
                }
                catch (JSONException e){
                    Toast.makeText(StudentLogin.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                connectionSame.login(jsonObject, "post");
            }
        });
        forgetPassword =  (Button) findViewById(R.id.forgetPassword);
        forgetPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StudentLogin.this, StudentForgetPassword.class);
                startActivity(intent);
            }
        });
        guestStudent = (Button) findViewById(R.id.guestStudent);
        guestStudent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StudentLogin.this, SeatsAvailability.class);
                startActivity(intent);
            }
        });
        signup = (Button) findViewById(R.id.signup);
        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StudentLogin.this, StudentRegistration.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public void onResume(){
        super.onResume();
        email.setText("");
        password.setText("");
    }


    @Override
    public void onSuccess(JSONObject response) {
        Intent intent = new Intent(this, NavBarStudent.class);
        final String token = response.toString();
        try {
            tokenValue = response.get("token").toString();
        }
        catch (JSONException e){
            Toast.makeText(this, "JSONException", Toast.LENGTH_SHORT).show();
        }
        ConnectionSame cs = new ConnectionSame(StudentLogin.this, new ResponseListener() {
            @Override
            public void onSuccess(JSONObject response) {
                String stop = "Unknown";
                String name = "Unknown";
                try {
                    name = (String) response.get("name");
                    stop = (String) response.get("stop");
                }
                catch (JSONException e){
                    Toast.makeText(StudentLogin.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                startService(findViewById(android.R.id.content).getRootView(), tokenValue, name, stop);
            }
            @Override
            public void onFaliure(String errorMessage) {
                Toast.makeText(StudentLogin.this, errorMessage, Toast.LENGTH_SHORT).show();
            }
        }, "http://" + MainActivity.IpAndPort + "/api/student/getStop");
        try {
            cs.getStop("get", response.get("token").toString());
        }
        catch (JSONException e){
            Toast.makeText(StudentLogin.this, "JSON Exception", Toast.LENGTH_SHORT).show();
        }
        editor.putString("token", token).apply();
        editor.putString("user", "student").apply();
        Toast.makeText(this, "Student Login Successfully", Toast.LENGTH_SHORT).show();
        intent.putExtra("token", token);
        startActivity(intent);
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

    public void startService(View v, String token , String name , String stop){
        Intent serviceIntent = new Intent(this, LocationService.class);
        serviceIntent.putExtra("token", token);
        serviceIntent.putExtra("name", name);
        serviceIntent.putExtra("stop", stop);
        startService(serviceIntent);
    }

}
