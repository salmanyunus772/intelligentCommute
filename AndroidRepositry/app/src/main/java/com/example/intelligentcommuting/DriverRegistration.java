package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class DriverRegistration extends AppCompatActivity implements ResponseListener{

    Button submit=null;
    EditText fName=null;
    EditText lName=null;
    EditText cellNo=null;
    EditText password=null;
    EditText cPassword=null;
    String url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.driversignup);
        url="http://"+MainActivity.IpAndPort+"/api/driver/registerdriver";
        fName = (EditText) findViewById(R.id.fname);
        lName = (EditText) findViewById(R.id.lname);
        cellNo = (EditText) findViewById(R.id.cellPhone);
        password = (EditText) findViewById(R.id.password);
        cPassword = (EditText) findViewById(R.id.cPassword);
        password.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        cPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        submit = (Button) findViewById(R.id.submit);
        final ConnectionSame connectionSame = new ConnectionSame(DriverRegistration.this, this, url);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    JSONObject jsonObject = new JSONObject();
                    try {
                        jsonObject.put("firstName", fName.getText().toString());
                        jsonObject.put("lastName", lName.getText().toString());
                        jsonObject.put("cell", cellNo.getText().toString());
                        jsonObject.put("pass", password.getText().toString());
                        jsonObject.put("confirmPassword", cPassword.getText().toString());
                    } catch (JSONException e) {
                        Toast.makeText(DriverRegistration.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    connectionSame.register(jsonObject, "post");
            }
        });
    }

    @Override
    public void onSuccess(JSONObject response) {
        Intent intent = new Intent(this, NavBarDriver.class);
        Toast.makeText(this, "Driver Registered Successfully", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }
}
