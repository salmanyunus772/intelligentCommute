package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class StudentProfile extends AppCompatActivity {

    TextView fName = null;
    TextView lName = null;
    TextView emailTV = null;
    TextView registrationNo = null;
    TextView emergencyContact = null;
    TextView rfidNo = null;
    TextView validBefore = null;
    TextView busStop = null;
    TextView assignedRoute = null;
    TextView busNumber = null;
    TextView driverName = null;
    TextView driverContact = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.studentprofile);
        fName = (TextView) findViewById(R.id.fName);
        lName = (TextView) findViewById(R.id.lName);
        emailTV = (TextView) findViewById(R.id.email);
        registrationNo = (TextView) findViewById(R.id.regNo);
        emergencyContact = (TextView) findViewById(R.id.eContact);
        rfidNo = (TextView) findViewById(R.id.rfidNumber);
        validBefore = (TextView) findViewById(R.id.vBefore);
        busStop = (TextView) findViewById(R.id.bStop);
        assignedRoute = (TextView) findViewById(R.id.assignedRoute);
        busNumber = (TextView) findViewById(R.id.busNumber);
        driverName = (TextView) findViewById(R.id.driverName);
        driverContact = (TextView) findViewById(R.id.driverContact);

        JSONObject parsedToken;
        Intent intent = getIntent();
        try{
            parsedToken = new JSONObject(intent.getStringExtra("parsedToken"));
            fName.setText(parsedToken.get("firstName").toString());
            lName.setText(parsedToken.get("lastName").toString());
            emailTV.setText(parsedToken.get("email").toString());
            registrationNo.setText(parsedToken.get("reg").toString());
            emergencyContact.setText(parsedToken.get("EmergencyContact").toString());
            Object rfid=parsedToken.get("rfid");
            if(rfid!=null)
                rfidNo.setText(rfid.toString());
            else
                rfidNo.setText("");
            Object serviceExpiresOn=parsedToken.get("serviceExpiresOn");
            if(serviceExpiresOn!=null)
                validBefore.setText(serviceExpiresOn.toString().substring(0, 10));
            else
                validBefore.setText("");
            busStop.setText(parsedToken.get("stop").toString());
            Object id=parsedToken.get("id");
            if(id!=null)
                assignedRoute.setText(id.toString());
            else
                assignedRoute.setText("");
            Object bNo=parsedToken.get("busNumber");
            if(bNo!=null)
                busNumber.setText(bNo.toString());
            else
                busNumber.setText("");
            Object dName=parsedToken.get("driverName");
            if(dName!=null)
                driverName.setText(dName.toString());
            else
                driverName.setText("");
            Object dContact=parsedToken.get("driverContact");
            if(dContact!=null)
                driverContact.setText(dContact.toString());
            else
                driverContact.setText("");
        }
        catch (JSONException e){
            Toast.makeText(this, "JSON EXCEPTION", Toast.LENGTH_SHORT).show();
        }
    }
}
