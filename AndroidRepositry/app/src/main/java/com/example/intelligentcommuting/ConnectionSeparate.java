package com.example.intelligentcommuting;

import android.content.Context;
import android.net.ConnectivityManager;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class ConnectionSeparate {

    public String URL;
    private RequestQueue queue;
    private Context context;

    public ConnectionSeparate(Context context, String url) {
        this.URL = url;
        this.context = context;
        queue = Volley.newRequestQueue(context);
    }

    public void complainSuggestion(final JSONObject message, String method, final String token){
        if(isNetworkConnected()) {
            int met = method.equals("post") ? Request.Method.POST : Request.Method.GET;
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (met, URL, message, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            if(URL=="http://"+MainActivity.IpAndPort+"/api/student/complain"){
                                try {
                                    Toast.makeText(context, message.get("type") + " Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                                }
                                catch (JSONException e){
                                    Toast.makeText(context, "JSON Exception", Toast.LENGTH_SHORT).show();
                                }
                            }
                            else
                                Toast.makeText(context, "Complain Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            if(error.networkResponse==null)
                                Toast.makeText(context, "Server not running or slow, Request Time Out", Toast.LENGTH_SHORT).show();
                            else {
                                String message = "";
                                try {
                                    String responseBody = new String(error.networkResponse.data, "utf-8");
                                    JSONObject data = new JSONObject(responseBody);
                                    if (data.has("error"))
                                        message = data.optString("error");
                                } catch (UnsupportedEncodingException | JSONException uee) {
                                    Toast.makeText(context, uee.getMessage(), Toast.LENGTH_SHORT).show();
                                }
                                Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                            }
                        }
                    }){

                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", "bearer " + token);
                    return params;
                }
            };
            jsonObjectRequest.setRetryPolicy(new DefaultRetryPolicy(10000,
                    DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                    DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
            queue.add(jsonObjectRequest);
        }else{
            Toast toast = Toast.makeText(context,
                    "No internet connection",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
    }

    private boolean isNetworkConnected() {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(context.CONNECTIVITY_SERVICE);
        return cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnected();
    }

}
