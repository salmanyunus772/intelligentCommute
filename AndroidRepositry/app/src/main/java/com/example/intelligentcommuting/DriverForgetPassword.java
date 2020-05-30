package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class DriverForgetPassword extends AppCompatActivity implements ResponseListener{

    Button submit = null;
    Button signin = null;
    Button signup = null;
    EditText cell = null;
    EditText password = null;
    String url;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.driverforgetpassword);
        cell = (EditText) findViewById(R.id.cell);
        password = (EditText) findViewById(R.id.password);
        submit = (Button) findViewById(R.id.submit);
        signin = (Button) findViewById(R.id.signin);
        signup = (Button) findViewById(R.id.signup);
        url="http://"+MainActivity.IpAndPort+"/api/driver/recover";
        final ConnectionSame connectionSame = new ConnectionSame(DriverForgetPassword.this, this, url);
        submit.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try{
                    jsonObject.put("cell", cell.getText().toString());
                    jsonObject.put("pass", password.getText().toString());
                }
                catch (JSONException e){
                    Toast.makeText(DriverForgetPassword.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                connectionSame.forgetPassword(jsonObject, "post");
            }
        });
        signin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(DriverForgetPassword.this, DriverLogin.class);
                startActivity(intent);
            }
        });
        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(DriverForgetPassword.this, DriverRegistration.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public void onSuccess(JSONObject response) {
        try {
            Toast.makeText(this, response.get("message").toString(), Toast.LENGTH_SHORT).show();
        }
        catch (JSONException e){
            Toast.makeText(this, "JSON Exception", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

}
