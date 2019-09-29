import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header/header.component';
import { PostCreateComponent } from './posts/posts-create/post-create/post-create.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatPaginatorModule} from '@angular/material';
import { PostListComponent } from './posts/posts-list/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent, HeaderComponent, PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,MatButtonModule, MatToolbarModule, MatExpansionModule, MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
