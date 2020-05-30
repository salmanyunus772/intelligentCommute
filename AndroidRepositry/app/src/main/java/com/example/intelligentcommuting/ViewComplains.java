package com.example.intelligentcommuting;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ViewComplains extends AppCompatActivity implements ResponseListener, AdapterView.OnItemClickListener {

    ListView listView = null;
    public ArrayList<String> list;
    String url;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.viewcomplains);
        url="http://"+MainActivity.IpAndPort+"/api/driver/viewComplains";
        Intent intent = getIntent();
        ConnectionSame connection = new ConnectionSame(ViewComplains.this, this, url);
        connection.viewComplains("get", intent.getStringExtra("token"));
        listView=(ListView) findViewById(R.id.complains);
        listView.setOnItemClickListener(this);
    }

    @Override
    public void onSuccess(JSONObject response) {
        list = new ArrayList<String>();
        try {
            JSONArray value = (JSONArray) response.get("complains");
            JSONObject r;
            for (int i = 0; i < value.length(); i++) {
                r = (JSONObject) value.getJSONObject(i);
                list.add(r.get("date").toString().substring(0,10)+", "+r.get("description")+", "+r.get("_id"));
            }
            CustomAdapter customAdapter = new CustomAdapter(list);
            listView.setAdapter(customAdapter);
        }
        catch (JSONException e) {
            Toast.makeText(this, "JSON Exception", Toast.LENGTH_SHORT).show();
        }
        Log.d("Response", response.toString());
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Intent intent = new Intent(ViewComplains.this, ViewResponse.class);
        TextView cid = (TextView) view.findViewById(R.id.id);
        intent.putExtra("activityName",getClass().toString());
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
            convertView = getLayoutInflater().inflate(R.layout.complainslist, null);
            TextView date=(TextView) convertView.findViewById(R.id.date);
            TextView description=(TextView) convertView.findViewById(R.id.description);
            TextView id=(TextView) convertView.findViewById(R.id.id);
            String [] array = list.get(position).split(", ");
            date.setText(array[0]);
            description.setText(array[1]);
            id.setText(array[2]);
            return convertView;
        }
    }

}
