import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { NavbarService } from './navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    P404Component,
    ContactComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
  providers: [
    AuthGuard,
    DataService,
    AuthService,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
