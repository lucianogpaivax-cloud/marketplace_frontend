import { NgModule } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http'


@NgModule({
  bootstrap: [] // NÃO declara AppComponent aqui!
})
export class AppModule {}
