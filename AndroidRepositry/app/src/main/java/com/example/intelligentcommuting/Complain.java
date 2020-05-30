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

public class Complain extends AppCompatActivity {

    Button submit = null;
    EditText feedback = null;
    String url;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.complain);
        feedback = (EditText) findViewById(R.id.feedback);
        submit = (Button) findViewById(R.id.submit);
        url = "http://"+MainActivity.IpAndPort+"/api/driver/complain";
        submit.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                ConnectionSeparate connectionSeparate = new ConnectionSeparate(Complain.this, url);
                JSONObject jsonObject = new JSONObject();
                Intent intent = getIntent();
                try {
                    jsonObject.put("description", feedback.getText().toString());
                }
                catch (JSONException e){
                    Toast.makeText(Complain.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                connectionSeparate.complainSuggestion(jsonObject, "post", intent.getStringExtra("token"));
            }
        });
    }

}
