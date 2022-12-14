import { Component, OnInit, ViewChild } from '@angular/core';
import { AsteroideApiService } from '../service/asteroide-api.service';
import { asteroid, asteroidsList } from '../model/asteroide.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-asteroide-list',
  templateUrl: './asteroide-list.component.html',
  styleUrls: ['./asteroide-list.component.css'],
})
export class AsteroideListComponent implements OnInit {
  public matStartDate = 0;

  asteroideList: asteroidsList;
  asteroidByDate: asteroid[][] = [];
  constructor(private AsteroideApiService: AsteroideApiService) {}

  sDate: string = '';
  eDate: string = '';
  startDay: string = '';
  endDay: string = '';

  ngOnInit(): void {}
  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    this.sDate = dateRangeStart.value;
    this.eDate = dateRangeEnd.value;
    const [monthStart, dayStart, yearStart] = this.sDate.split('/');
    const [monthEnd, dayEnd, yearEnd] = this.eDate.split('/');
    this.startDay = [yearStart, monthStart, dayStart].join('-');
    this.endDay = [yearEnd, monthEnd, dayEnd].join('-');
    this.getAste();
  }
  getAste() {
    this.AsteroideApiService.getAste(this.startDay, this.endDay).subscribe(
      (aste) => {
        this.asteroideList = aste;
        this.asteroidByDate = Object.keys(
          this.asteroideList.near_earth_objects
        ).map((key) => {
          return this.asteroideList.near_earth_objects[key];
        });
      }
    );
  }
  getDate(i: number) {
    return Object.keys(this.asteroideList.near_earth_objects)[i];
  }
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
}
