package com.example.intelligentcommuting;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

import static android.os.Environment.getExternalStoragePublicDirectory;

public class ReplyLostFound extends AppCompatActivity {

    Button capture = null;
    Button choose = null;
    ImageView image = null;
    Button sendReply = null;
    EditText reply = null;
    String picturePath;
    String imageName="";
    String url;
    Intent intent;
    File img;
    Uri photoURI = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.replylostfound);
        url="http://"+MainActivity.IpAndPort+"/api/";
        intent = getIntent();
        reply = (EditText) findViewById(R.id.reply);
        capture = (Button) findViewById(R.id.capture);
        capture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent camera_intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if(camera_intent.resolveActivity(getPackageManager()) != null) {
                    try {
                        img = createImageFile();
                    }
                    catch (IOException ex) {
                        Toast.makeText(ReplyLostFound.this, "IOException", Toast.LENGTH_SHORT).show();
                    }
                    if (img != null) {
                        picturePath = img.getAbsolutePath();
                        photoURI = FileProvider.getUriForFile(ReplyLostFound.this,"com.example.myapplication.fileprovider", img);
                        camera_intent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                        startActivityForResult(camera_intent, 1);
                    }
                }
            }
        });
        choose = (Button) findViewById(R.id.chooseFile);
        choose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent gallery = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
                gallery.setType("image/*");
                startActivityForResult(gallery, 2);
            }
        });
        image = (ImageView) findViewById(R.id.image);
        sendReply = (Button) findViewById(R.id.send);
        sendReply.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(intent.getStringExtra("activityName").contains("NavBarStudent"))
                    StudentSendLostFoundResponse(intent.getStringExtra("token"));
                else
                    DriverSendLostFoundResponse(intent.getStringExtra("token"));
            }
        });
    }

    private void StudentSendLostFoundResponse(String token) {
        RequestBody requestBody = null;
        MultipartBody.Part part = null;
        if(img!=null) {
            requestBody = RequestBody.create(MediaType.parse("image/*"), img);
            part = MultipartBody.Part.createFormData("images", imageName, requestBody);
        }
        final RequestBody response = RequestBody.create(MediaType.parse("multipart/form-data"), reply.getText().toString());
        final RequestBody id = RequestBody.create(MediaType.parse("multipart/form-data"), intent.getStringExtra("id"));
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        if(part!=null) {
            Call<ResponseBody> call = uploadImageApi.StudentSendLostFoundResponse("bearer " + token, id, response, part);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(ReplyLostFound.this, "Response Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(ReplyLostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(ReplyLostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(ReplyLostFound.this, "Server not running", Toast.LENGTH_SHORT).show();
                }
            });
        }
        else{
            Call<ResponseBody> call = uploadImageApi.StudentSendLostFoundResponse("bearer " + token, id, response);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(ReplyLostFound.this, "Response Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(ReplyLostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(ReplyLostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(ReplyLostFound.this, "Server not running", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private void DriverSendLostFoundResponse(String token) {
        RequestBody requestBody = null;
        MultipartBody.Part part = null;
        if(img!=null) {
            requestBody = RequestBody.create(MediaType.parse("image/*"), img);
            part = MultipartBody.Part.createFormData("images", imageName, requestBody);
        }
        final RequestBody response = RequestBody.create(MediaType.parse("multipart/form-data"), reply.getText().toString());
        final RequestBody id = RequestBody.create(MediaType.parse("multipart/form-data"), intent.getStringExtra("id"));
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        if(part!=null) {
            Call<ResponseBody> call = uploadImageApi.DriverSendLostFoundResponse("bearer " + token, id, response, part);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(ReplyLostFound.this, "Response Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(ReplyLostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(ReplyLostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(ReplyLostFound.this, "Server not running", Toast.LENGTH_SHORT).show();
                }
            });
        }
        else{
            Call<ResponseBody> call = uploadImageApi.DriverSendLostFoundResponse("bearer " + token, id, response);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(ReplyLostFound.this, "Response Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(ReplyLostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(ReplyLostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(ReplyLostFound.this, "Server not running", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private File createImageFile() throws IOException {
        String name = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        imageName = "IMG_" + name + ".jpg";
        File storageDir = getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File image = null;
        try{
            image = File.createTempFile(imageName,".jpg", storageDir);
        }
        catch (IOException e){
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        return image;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode==RESULT_OK && requestCode==1) {
            Picasso.with(this).load(photoURI).into(image);
        }
        else if(resultCode==RESULT_OK && requestCode==2){
            Uri imageUri = data.getData();
            Picasso.with(this).load(imageUri).into(image);
            String[] filePathColumn = { MediaStore.Images.Media.DATA };
            Cursor cursor = getContentResolver().query(imageUri, filePathColumn, null, null, null);
            cursor.moveToFirst();
            int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
            String picturePath = cursor.getString(columnIndex);
            cursor.close();
            img = new File(picturePath);
            imageName=img.getName();
        }
    }

}
