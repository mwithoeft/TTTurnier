import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


let config: SocketIoConfig;


config = { url: 'http://localhost:3000', options: {} };

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event', component: EventComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    TabMenuModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
