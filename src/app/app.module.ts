// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {WebcamModule} from 'ngx-webcam';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './user/form.component';
import { LoginComponent } from './login/login.component';
import { CharacterComponent } from './character/character.component';
import { CformComponent } from './character/cform.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { ChardetailsComponent } from './user-interface/chardetails/chardetails.component';
import { HomeComponent } from './home/home.component';
import { SkillComponent } from './skill/skill.component';
import { SformComponent } from './skill/sform.component';
import { CharacterRoleDetailsComponent } from './character-role-details/character-role-details.component';
import { SecurityConfigComponent } from './security-config/security-config.component';
import { BattleComponent } from './battle/battle.component';
import { SkillPaginatorComponent } from './paginator/skill-paginator/skill-paginator.component';
import { UserPaginatorComponent } from './paginator/user-paginator/user-paginator.component';
import { CharacterPaginatorComponent } from './paginator/character-paginator/character-paginator.component';
import { WebcamComponent } from './webcam/webcam.component';
import { UploadFormComponent } from './user/upload-form.component';

// Services
import { AuthService } from './login/auth.service';
import { UserService } from './user/user.service';
import { CharacterService } from './character/character.service';
import { SkillService } from './skill/skill.service';
import { BattleService } from './battle/battle.service';
import { UserInterfaceService } from './user-interface/user-interface.service';
import { GlobalService } from './global/global.service';

// Locale
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

// Filters
import { FilterTablePipe } from './pipes/filter-table.pipe'
import { FilterRolPipe } from './pipes/filter-rol.pipe';
import { FilterCharacterPipe } from './pipes/filter-character.pipe';
import { FilterCharacterUserPipe } from './pipes/filer-character-user.pipe';
import { FilterCharacterUserReversePipe } from './pipes/filer-character-user-reverse.pipe';
import { FilterCharacterRole } from './pipes/filer-character-role.pipe';

registerLocaleData(localeEs, 'es');

const routes: Routes = [

  { path: '', redirectTo: '/userinterface', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent },

  { path: 'user', component: UserComponent },
  { path: "users/page/:page", component: UserComponent, canActivate: [SecurityConfigComponent] },
  { path: "users/page/:page/:userName", component: UserComponent, canActivate: [SecurityConfigComponent] },

  { path: 'user/form', component: FormComponent },
  { path: 'user/form/:idUser', component: FormComponent },

  { path: 'user/uploadform', component: UploadFormComponent },
  { path: 'user/uploadform/:idUser', component: UploadFormComponent },

  { path: 'character', component: CharacterComponent, canActivate: [SecurityConfigComponent] },
  { path: "characters/page/:page", component: CharacterComponent, canActivate: [SecurityConfigComponent] },
  { path: "skills/page/:page/:name", component: CharacterComponent, canActivate: [SecurityConfigComponent] },
  { path: 'character/form', component: CformComponent },
  { path: 'character/form/:id', component: CformComponent },

  { path: 'skill', component: SkillComponent, canActivate: [SecurityConfigComponent] },
  { path: "skills/page/:page", component: SkillComponent, canActivate: [SecurityConfigComponent] },
  { path: 'skill/form', component: SformComponent },
  { path: 'skill/form/:idSkill', component: SformComponent },
  { path: "skills/page/:page/:name", component: SkillComponent, canActivate: [SecurityConfigComponent] },

  { path: 'battle', component: BattleComponent },
  { path: 'battle/:id', component: BattleComponent },

  { path: 'userinterface', component: UserInterfaceComponent },

  { path: 'characters/rol', component: CharacterRoleDetailsComponent },
  { path: 'characters/rol/:id', component: CharacterRoleDetailsComponent },
  { path: 'webcam', component: WebcamComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent,
    LoginComponent,
    CharacterComponent,
    CformComponent,
    UserInterfaceComponent,
    ChardetailsComponent,
    HomeComponent,
    SkillComponent,
    SformComponent,
    CharacterRoleDetailsComponent,
    FilterTablePipe,
    FilterRolPipe,
    SecurityConfigComponent,
    BattleComponent,
    FilterCharacterPipe,
    FilterCharacterUserPipe,
    FilterCharacterUserReversePipe,
    FilterCharacterRole,
    SkillPaginatorComponent,
    UserPaginatorComponent,
    CharacterPaginatorComponent,
    WebcamComponent,
    UploadFormComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    WebcamModule
  ],
  providers: [
    AuthService, 
    UserService, 
    CharacterService, 
    SkillService, 
    SecurityConfigComponent, 
    BattleService, 
    UserInterfaceService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
