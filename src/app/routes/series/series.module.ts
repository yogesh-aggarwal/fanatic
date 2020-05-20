import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { SeriesComponent } from './series.component';

@NgModule({
  declarations: [DetailsComponent, EpisodesComponent, SeriesComponent],
  imports: [CommonModule, BrowserModule, RouterModule],
})
export class SeriesModule {}
