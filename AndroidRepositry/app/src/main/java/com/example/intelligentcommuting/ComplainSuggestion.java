package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class ComplainSuggestion extends AppCompatActivity {

    TextView prompt = null;
    Button submit = null;
    Spinner choice = null;
    EditText feedback = null;
    String url;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.complainsuggestion);
        choice = (Spinner) findViewById(R.id.choice);
        prompt = (TextView) findViewById(R.id.prompt);
        feedback = (EditText) findViewById(R.id.feedback);
        submit = (Button) findViewById(R.id.submit);
        url = "http://"+MainActivity.IpAndPort+"/api/student/complain";
        ArrayAdapter adapter = ArrayAdapter.createFromResource(this, R.array.cs, R.layout.spinnerlayout);
        adapter.setDropDownViewResource(R.layout.spinnerlayout);
        choice.setAdapter(adapter);
        choice.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                prompt.setText("Enter " + choice.getSelectedItem().toString() + " Here");
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        submit.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                ConnectionSeparate connectionSeparate = new ConnectionSeparate(ComplainSuggestion.this, url);
                JSONObject jsonObject = new JSONObject();
                Intent intent = getIntent();
                try {
                    jsonObject.put("type", choice.getSelectedItem().toString());
                    jsonObject.put("description", feedback.getText().toString());
                }
                catch (JSONException e){
                    Toast.makeText(ComplainSuggestion.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                connectionSeparate.complainSuggestion(jsonObject, "post", intent.getStringExtra("token"));
            }
        });

    }
}
