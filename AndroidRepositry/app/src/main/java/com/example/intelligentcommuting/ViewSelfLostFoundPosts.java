package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
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

public class ViewSelfLostFoundPosts extends AppCompatActivity implements AdapterView.OnItemClickListener {

    ListView listView = null;
    ArrayList<String> list = null;
    String activityName;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.viewyourlostfound);
        Intent intent = getIntent();
        String token=intent.getStringExtra("token");
        String url="http://"+MainActivity.IpAndPort+"/api/";
        activityName=intent.getStringExtra("activityName");
        if(activityName.contains("NavBarStudent"))
            StudentViewYourLostFoundPosts(token,url);
        else
            DriverViewYourLostFoundPosts(token,url);
        listView=(ListView) findViewById(R.id.yourlostfoundposts);
        listView.setOnItemClickListener(this);
    }

    private void StudentViewYourLostFoundPosts(String token, String url){
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        list=new ArrayList<String>();
        Call<LostFoundModel> call = uploadImageApi.StudentViewYourLostFoundPosts("bearer "+token);
        call.enqueue(new Callback<LostFoundModel>() {
            @Override
            public void onResponse(Call<LostFoundModel> call, Response<LostFoundModel> response) {
                if (response.isSuccessful()) {
                    LostFoundModel lfm = response.body();
                        List value = lfm.getFindlostitem();
                        LinkedTreeMap ltm;
                        for (int i = 0; i < value.size(); i++) {
                            ltm = (LinkedTreeMap) value.get(i);
                            list.add(ltm.get("from")+", "+ltm.get("date").toString().substring(0,10)+", "+ltm.get("type")+", "+ltm.get("description")+", "+ltm.get("_id")+", "+ltm.get("img"));
                        }
                        ViewSelfLostFoundPosts.CustomAdapter customAdapter = new ViewSelfLostFoundPosts.CustomAdapter(list);
                        listView.setAdapter(customAdapter);
                }
                else {
                    try {
                        JSONObject jObjError = new JSONObject(response.errorBody().string());
                        Toast.makeText(ViewSelfLostFoundPosts.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(ViewSelfLostFoundPosts.this, "Exception", Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<LostFoundModel> call, Throwable t)  {
                Toast.makeText(ViewSelfLostFoundPosts.this, "Server not running or slow, Request Time Out", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void DriverViewYourLostFoundPosts(String token, String url){
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        list=new ArrayList<String>();
        Call<LostFoundModel> call = uploadImageApi.DriverViewYourLostFoundPosts("bearer "+token);
        call.enqueue(new Callback<LostFoundModel>() {
            @Override
            public void onResponse(Call<LostFoundModel> call, Response<LostFoundModel> response) {
                if (response.isSuccessful()) {
                    LostFoundModel lfm = response.body();
                    List value = lfm.getFindlostitem();
                    LinkedTreeMap ltm;
                    for (int i = 0; i < value.size(); i++) {
                        ltm = (LinkedTreeMap) value.get(i);
                        list.add(ltm.get("from")+", "+ltm.get("date").toString().substring(0,10)+", "+ltm.get("type")+", "+ltm.get("description")+", "+ltm.get("_id")+", "+ltm.get("img"));
                    }
                    ViewSelfLostFoundPosts.CustomAdapter customAdapter = new ViewSelfLostFoundPosts.CustomAdapter(list);
                    listView.setAdapter(customAdapter);
                }
                else {
                    try {
                        JSONObject jObjError = new JSONObject(response.errorBody().string());
                        Toast.makeText(ViewSelfLostFoundPosts.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(ViewSelfLostFoundPosts.this, "Exception", Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<LostFoundModel> call, Throwable t)  {
                Toast.makeText(ViewSelfLostFoundPosts.this, "Server not running or slow, Request Time Out", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Intent intent = new Intent(ViewSelfLostFoundPosts.this, ViewLostFoundReplies.class);
        TextView cid = (TextView) view.findViewById(R.id.id);
        intent.putExtra("activityName",activityName);
        intent.putExtra("id", cid.getText().toString());
        startActivity(intent);
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
            convertView = getLayoutInflater().inflate(R.layout.lostfoundlist, null);
            TextView from=(TextView) convertView.findViewById(R.id.from);
            TextView date=(TextView) convertView.findViewById(R.id.date);
            TextView type=(TextView) convertView.findViewById(R.id.type);
            TextView description=(TextView) convertView.findViewById(R.id.description);
            TextView id=(TextView) convertView.findViewById(R.id.id);
            ImageView image = (ImageView) convertView.findViewById(R.id.image);
            String [] array = list.get(position).split(", ", -1);
            from.setText(array[0]);
            date.setText(array[1]);
            type.setText(array[2]+" :");
            description.setText(array[3]);
            id.setText(array[4]);
            if(!array[5].equals(""))
                Picasso.with(ViewSelfLostFoundPosts.this).load("http://"+MainActivity.IpAndPort + "/images/" + array[5]).into(image);
            return convertView;
        }
    }

}
