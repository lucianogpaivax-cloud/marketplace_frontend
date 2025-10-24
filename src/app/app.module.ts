import { NgModule } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [] // NÃO declara AppComponent aqui!
})
export class AppModule {}
