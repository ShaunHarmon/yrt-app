import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yrt-app';
  currentStopInfo = {
    stop_name:'Not Found',
    location:{
      lat:0,
      lng:0
    },
    "wheelchair_boarding":-1,
    events:[]
  };
  constructor(private http: HttpClient){
    const callbackFN = () =>{
      this.updateGTFSData(1361, 'America/Toronto', 80).subscribe((result:any)=>{
        this.currentStopInfo = result;
        console.log(this.currentStopInfo)
      })
    }
    callbackFN();
    setInterval(()=>{
      callbackFN();
    },60*1000)
  }

  getDelay(delay){
    if(delay == 0){
      return 'On Time'
    }else if(delay > 0){
      return 'Late'
    }else{
      return 'Early'
    }
  }

  getDelayColor(delay){
    if(delay == 0){
      return 'green'
    }else if(delay > 0){
      return 'red'
    }else{
      return 'green'
    }
  }

  getParsedTime(time){
    let approx = false;
    if(approx){
      return moment(time).tz('America/Toronto').fromNow(true);
    }
    return Math.round(moment(time).tz('America/Toronto').diff(moment())/60000) + ' Minutes'

  }

  updateGTFSData(stopID, timezone, minutes) {
    return this.http.get(`https://revel-gtfs.herokuapp.com/?stop=${stopID}&timezone=${timezone}&len=${minutes}`);
  }
}

