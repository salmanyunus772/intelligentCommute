package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.internal.LinkedTreeMap;
import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class ViewLostFoundReplies extends AppCompatActivity {

    ListView listView = null;
    ArrayList<String> list = null;
    String activityName;
    Intent intent;
    String token;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.viewlostfoundreplies);
        intent = getIntent();
        String id=intent.getStringExtra("id");
        String url="http://"+MainActivity.IpAndPort+"/api/";
        activityName=intent.getStringExtra("activityName");
        if(activityName.contains("NavBarStudent"))
            StudentViewLostFoundResponses(id,url);
        else
            DriverViewLostFoundResponses(id,url);
        listView=(ListView) findViewById(R.id.responses);
    }

    private void StudentViewLostFoundResponses(String id, String url){
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        list=new ArrayList<String>();
        Call<LostFoundResponseModel> call = uploadImageApi.StudentViewLostFoundResponses(id);
        call.enqueue(new Callback<LostFoundResponseModel>() {
            @Override
            public void onResponse(Call<LostFoundResponseModel> call, Response<LostFoundResponseModel> response) {
                if (response.isSuccessful()) {
                    LostFoundResponseModel lfm = response.body();
                    List value = lfm.getLostFoundReplies();
                    LinkedTreeMap ltm;
                    for (int i = 0; i < value.size(); i++) {
                        ltm = (LinkedTreeMap) value.get(i);
                        list.add(ltm.get("responseFrom")+", "+ltm.get("responderPhoneNumber")+", "+ltm.get("responseDate").toString().substring(0,10)+", "+ltm.get("reply")+", "+ltm.get("img"));
                    }
                    ViewLostFoundReplies.CustomAdapter customAdapter = new ViewLostFoundReplies.CustomAdapter(list);
                    listView.setAdapter(customAdapter);
                }
                else {
                    try {
                        JSONObject jObjError = new JSONObject(response.errorBody().string());
                        Toast.makeText(ViewLostFoundReplies.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(ViewLostFoundReplies.this, "Exception", Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<LostFoundResponseModel> call, Throwable t)  {
                Toast.makeText(ViewLostFoundReplies.this, "Server not running or slow, Request Time Out", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void DriverViewLostFoundResponses(String id, String url){
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        list=new ArrayList<String>();
        Call<LostFoundResponseModel> call = uploadImageApi.DriverViewLostFoundResponses(id);
        call.enqueue(new Callback<LostFoundResponseModel>() {
            @Override
            public void onResponse(Call<LostFoundResponseModel> call, Response<LostFoundResponseModel> response) {
                if (response.isSuccessful()) {
                    LostFoundResponseModel lfm = response.body();
                    List value = lfm.getLostFoundReplies();
                    LinkedTreeMap ltm;
                    for (int i = 0; i < value.size(); i++) {
                        ltm = (LinkedTreeMap) value.get(i);
                        list.add(ltm.get("responseFrom")+", "+ltm.get("responderPhoneNumber")+", "+ltm.get("responseDate").toString().substring(0,10)+", "+ltm.get("reply")+", "+ltm.get("img"));
                    }
                    ViewLostFoundReplies.CustomAdapter customAdapter = new ViewLostFoundReplies.CustomAdapter(list);
                    listView.setAdapter(customAdapter);
                }
                else {
                    try {
                        JSONObject jObjError = new JSONObject(response.errorBody().string());
                        Toast.makeText(ViewLostFoundReplies.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(ViewLostFoundReplies.this, "Exception", Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<LostFoundResponseModel> call, Throwable t)  {
                Toast.makeText(ViewLostFoundReplies.this, "Server not running or slow, Request Time Out", Toast.LENGTH_SHORT).show();
            }
        });
    }

    class CustomAdapter extends BaseAdapter {

        ArrayList<String> list;

        public CustomAdapter(ArrayList<String> list) {
            this.list=list;
        }

        @Override
        public int getCount() {
            return this.list.size();
        }

        @Override
        public Object getItem(int position) {
            return null;
        }

        @Override
        public long getItemId(int position) {
            return 0;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            convertView = getLayoutInflater().inflate(R.layout.lostfoundreplieslist, null);
            TextView from=(TextView) convertView.findViewById(R.id.from);
            TextView date=(TextView) convertView.findViewById(R.id.date);
            TextView contactNumber=(TextView) convertView.findViewById(R.id.contactNumber);
            TextView reply=(TextView) convertView.findViewById(R.id.reply);
            ImageView image = (ImageView) convertView.findViewById(R.id.image);
            String [] array = list.get(position).split(", ", -1);
            from.setText(array[0]);
            contactNumber.setText(array[1]);
            date.setText(array[2]);
            reply.setText(array[3]);
            if(!array[4].equals(""))
                Picasso.with(ViewLostFoundReplies.this).load("http://"+MainActivity.IpAndPort + "/images/" + array[4]).into(image);
            return convertView;
        }
    }

}
