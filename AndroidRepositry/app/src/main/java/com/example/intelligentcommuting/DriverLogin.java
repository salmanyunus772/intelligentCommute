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

public class DriverLogin extends AppCompatActivity implements ResponseListener{

    Button signup = null;
    Button forgetPassword = null;
    Button submit = null;
    EditText cellNo = null;
    EditText password = null;
    String url;
    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.driversignin);
        cellNo = (EditText) findViewById(R.id.cellPhone);
        password = (EditText) findViewById(R.id.password);
        password.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        submit = (Button) findViewById(R.id.submit);
        url="http://"+MainActivity.IpAndPort+"/api/driver/login";
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        editor = sharedPreferences.edit();
        final ConnectionSame connectionSame= new ConnectionSame(DriverLogin.this,this, url);
        submit.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try{
                    jsonObject.put("cell", cellNo.getText().toString());
                    jsonObject.put("pass", password.getText().toString());
                }
                catch (JSONException e){
                    Toast.makeText(DriverLogin.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                connectionSame.login(jsonObject, "post");
            }
        });
        forgetPassword =  (Button) findViewById(R.id.forgetPassword);
        forgetPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(DriverLogin.this, DriverForgetPassword.class);
                startActivity(intent);
            }
        });
        signup = (Button) findViewById(R.id.signup);
        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    Intent intent = new Intent(DriverLogin.this, DriverRegistration.class);
                    startActivity(intent);
            }
        });
    }

    @Override
    public void onResume(){
        super.onResume();
        cellNo.setText("");
        password.setText("");
    }

    @Override
    public void onSuccess(JSONObject response) {
        Intent intent = new Intent(this, NavBarDriver.class);
        Toast.makeText(this, "Driver Login Successfully", Toast.LENGTH_SHORT).show();
        editor.putString("token", response.toString()).apply();
        editor.putString("user", "driver").apply();
        intent.putExtra("token", response.toString());
        startActivity(intent);
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }
}
