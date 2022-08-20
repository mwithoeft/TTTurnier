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
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UserService } from './user.service';
import { UserComponent } from './user/user.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { PanelModule } from 'primeng/panel';
import {MessagesModule} from 'primeng/messages';
import { MessageModule } from 'primeng/message';


let config: SocketIoConfig;


config = { url: 'http://localhost:3000', options: {} };

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'event', component: EventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    MyEventsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    TabMenuModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    PanelModule,
    MessagesModule,
    MessageModule
  ],
  providers: [SocketService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
