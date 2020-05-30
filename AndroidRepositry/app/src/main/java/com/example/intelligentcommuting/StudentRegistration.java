package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class StudentRegistration extends AppCompatActivity implements ResponseListener{

    EditText fName = null;
    EditText lName = null;
    EditText email = null;
    EditText regNo = null;
    EditText eContact = null;
    Spinner stop = null;
    EditText password = null;
    EditText cPassword = null;
    Button submit=null;
    String url;

    @Override
    protected void onStop(){
        super.onStop();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.studentsignup);
        fName = (EditText) findViewById(R.id.fname);
        lName = (EditText) findViewById(R.id.lname);
        email = (EditText) findViewById(R.id.email);
        regNo = (EditText) findViewById(R.id.regno);
        eContact = (EditText) findViewById(R.id.econtact);
        stop = (Spinner) findViewById(R.id.routeId);
        url = "http://"+MainActivity.IpAndPort+"/api/student/register";
        ArrayAdapter adapter = ArrayAdapter.createFromResource(this, R.array.stops, R.layout.stopspinnerlayout);
        adapter.setDropDownViewResource(R.layout.stopspinnerlayout);
        stop.setAdapter(adapter);
        password = (EditText) findViewById(R.id.password);
        password.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        cPassword = (EditText) findViewById(R.id.cpassword);
        cPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        submit = (Button) findViewById(R.id.submit);
        final ConnectionSame connectionSame = new ConnectionSame(StudentRegistration.this, this, url);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    JSONObject jsonObject = new JSONObject();
                    try {
                        jsonObject.put("firstName", fName.getText().toString());
                        jsonObject.put("lastName", lName.getText().toString());
                        jsonObject.put("email", email.getText().toString());
                        jsonObject.put("reg", regNo.getText().toString());
                        jsonObject.put("EmergencyContact", eContact.getText().toString());
                        jsonObject.put("stop", stop.getSelectedItem().toString());
                        jsonObject.put("pass", password.getText().toString());
                        jsonObject.put("confirmPassword", cPassword.getText().toString());
                    } catch (JSONException e) {
                        Toast.makeText(StudentRegistration.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                    }
                    connectionSame.register(jsonObject, "post");
            }
        });
    }

    @Override
    public void onSuccess(JSONObject response) {
        Intent intent = new Intent(this, NavBarStudent.class);
        Toast.makeText(this, "Student Registered Successfully", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }
}
