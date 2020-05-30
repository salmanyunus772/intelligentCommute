package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class DriverProfile extends AppCompatActivity {

    TextView fName = null;
    TextView lName = null;
    TextView cellNo = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.driverprofile);
        fName = (TextView) findViewById(R.id.fName);
        lName = (TextView) findViewById(R.id.lName);
        cellNo = (TextView) findViewById(R.id.cellPhone);
        JSONObject parsedToken;
        Intent intent = getIntent();
        try {
            parsedToken = new JSONObject(intent.getStringExtra("parsedToken"));
            fName.setText(parsedToken.get("firstName").toString());
            lName.setText(parsedToken.get("lastName").toString());
            cellNo.setText(parsedToken.get("cell").toString());
        }
        catch (JSONException e){
            Toast.makeText(this, "JSON EXCEPTION", Toast.LENGTH_SHORT).show();
        }
    }

}
