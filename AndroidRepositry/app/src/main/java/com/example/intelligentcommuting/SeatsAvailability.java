package com.example.intelligentcommuting;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter;
import com.github.mikephil.charting.utils.ColorTemplate;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class SeatsAvailability extends AppCompatActivity implements ResponseListener{

    Spinner stops = null;
    Button findAvailability = null;
    BarChart barChart = null;
    PieChart pieChart = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.guestseatsavailability);
        String url = "http://"+MainActivity.IpAndPort+"/api/student/guestChart";
        stops = (Spinner) findViewById(R.id.stops);
        ArrayAdapter adapter = ArrayAdapter.createFromResource(this, R.array.stops, R.layout.stopspinnerlayout);
        adapter.setDropDownViewResource(R.layout.stopspinnerlayout);
        stops.setAdapter(adapter);
        findAvailability = (Button) findViewById(R.id.findAvailability);
        final ConnectionSame connectionSame = new ConnectionSame(SeatsAvailability.this, this, url);
        findAvailability.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try{
                    jsonObject.put("stop", stops.getSelectedItem().toString());
                }
                catch (JSONException e){
                    Toast.makeText(SeatsAvailability.this, "JSON Exception", Toast.LENGTH_SHORT).show();
                }
                connectionSame.checkAvailability("post", jsonObject);
            }
        });
        pieChart = (PieChart) findViewById(R.id.pieChart);
        barChart = (BarChart) findViewById(R.id.barChart);
    }

    @Override
    public void onSuccess(JSONObject response) {
        int totalGetSeats = 0;
        int totalMissSeats = 0;
        ArrayList<BarEntry> entries1 = new ArrayList<>();
        ArrayList<BarEntry> entries2 = new ArrayList<>();
        ArrayList<BarEntry> entries3 = new ArrayList<>();
        ArrayList<String> valuesArray = new ArrayList<String>();
        ArrayList<String> dates = new ArrayList<String>();
        try {
            JSONArray value = (JSONArray) response.get("values");
            JSONObject r;
            for (int i = 0; i < value.length(); i++) {
                r = (JSONObject) value.getJSONObject(i);
                dates.add(r.get("date").toString());
                valuesArray.add(r.get("datecount")+", "+r.get("get_seat")+", "+r.get("miss_seat"));
            }
        } catch (JSONException e) {
            Toast.makeText(this, "JSONException", Toast.LENGTH_SHORT).show();
        }
        for(int i=0;i<valuesArray.size();i++){
            String [] value = valuesArray.get(i).split(", ");
            int getSeat = Integer.parseInt(value[1]);
            int missSeat = Integer.parseInt(value[2]);
            totalGetSeats += getSeat;
            totalMissSeats += missSeat;
            entries1.add(new BarEntry(i, Integer.parseInt(value[0])));
            entries2.add(new BarEntry(i, getSeat));
            entries3.add(new BarEntry(i, missSeat));
        }
        ArrayList<PieEntry> pieEntries = new ArrayList<PieEntry>();
        int totalSeats = totalGetSeats+totalMissSeats;
        pieEntries.add(new PieEntry(((float) totalGetSeats/totalSeats)*100, "Getting Seat %"));
        pieEntries.add(new PieEntry(((float) totalMissSeats/totalSeats)*100,  "Missing Seat %"));
        PieDataSet pieDataSet = new PieDataSet(pieEntries, "");
        pieDataSet.setColors(ColorTemplate.COLORFUL_COLORS);
        PieData pieData =  new PieData(pieDataSet);
        pieData.setValueTextSize(25f);
        pieData.setValueTextColor(Color.WHITE);
        pieChart.setData(pieData);
        pieChart.setDrawEntryLabels(false);
        pieChart.getDescription().setEnabled(false);
        pieChart.animateY(1000);
        pieChart.invalidate();
        BarDataSet barDataSet1 = new BarDataSet(entries1, "Seats were available");
        BarDataSet barDataSet2 = new BarDataSet(entries2, "Get Seat %");
        BarDataSet barDataSet3 = new BarDataSet(entries3, "Miss Seat %");
        barDataSet1.setColor(Color.BLUE);
        barDataSet2.setColor(Color.GREEN);
        barDataSet3.setColor(Color.YELLOW);
        BarData data = new BarData(barDataSet1, barDataSet2, barDataSet3);
        barChart.setData(data);
        XAxis xAxis = barChart.getXAxis();
        xAxis.setValueFormatter(new IndexAxisValueFormatter(dates));
        xAxis.setCenterAxisLabels(true);
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setGranularity(1);
        xAxis.setGranularityEnabled(true);
        float barSpace = -0.7f;
        float groupSpace = 0.55f;
        barChart.getXAxis().setAxisMinimum(0);
        barChart.getXAxis().setAxisMaximum(0+barChart.getBarData().getGroupWidth(groupSpace, barSpace)*entries1.size());
        barChart.getAxisLeft().setAxisMinimum(0);
        barChart.groupBars(0, groupSpace, barSpace);
        barChart.getAxisLeft().setDrawGridLines(false);
        barChart.getXAxis().setDrawGridLines(false);
        barChart.invalidate();
        barChart.setDragEnabled(true);
        barChart.setVisibleXRangeMaximum(3);
        data.setBarWidth(0.15f);
        barChart.getDescription().setEnabled(false);
    }

    @Override
    public void onFaliure(String errorMessage) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show();
    }

}
