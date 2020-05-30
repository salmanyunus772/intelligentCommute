package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ViewResponse extends AppCompatActivity implements ResponseListener{

    TextView adminReply = null;
    String reply = null;
    String url=null;

    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.viewresponse);
        url = "http://"+MainActivity.IpAndPort+"/api/";
        Intent intent = getIntent();
        if(intent.getStringExtra("activityName").contains("ViewComplainsSuggestions"))
            url+="student/viewComplainSuggestionReply";
        else
            url+="driver/viewComplainReply";
        ConnectionSame connection = new ConnectionSame(ViewResponse.this, this, url);
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("id", intent.getStringExtra("id"));
        }
        catch (JSONException e) {
            Toast.makeText(this, "JSON Exception", Toast.LENGTH_SHORT).show();
        }
        connection.viewReply("post", jsonObject);
        adminReply = (TextView) findViewById(R.id.reply);
    }

    @Override
    public void onSuccess(JSONObject response) {
        try{
        JSONArray value = (JSONArray) response.get("doc");
        JSONObject r= (JSONObject) value.getJSONObject(0);
        reply = (String) r.get("AdminResponse");
        if(reply.equals(""))
            adminReply.setText("No reply from Admin uptill now!");
        else
            adminReply.setText(reply);
        }
        catch (JSONException e) {
            Toast.makeText(this, "JSON Exception Here", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

}
