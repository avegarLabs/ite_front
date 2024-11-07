import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObraComponent } from './obra/obra.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { TipologyComponent } from './tipology/tipology.component';
import { ObraDetailComponent } from './obra-detail/obra-detail.component';
import { ObraUpdateComponent } from './obra-update/obra-update.component';
import { AddTipologyComponentComponent } from './addTipology-component/addTipology-component.component';
import { EditTipologyModalComponentComponent } from './editTipologyModal-component/editTipologyModal-component.component';
import { EspecialidadesComponentComponent } from './especialidades-component/especialidades-component.component';
import { EditEspecialidadModalComponentComponent } from './editEspecialidadModal-component/editEspecialidadModal-component.component';
import { ValoresComponent } from './valores/valores.component';
import { ChartsModule } from "ng2-charts";
import { EditValuesComponentComponent } from './editValues-component/editValues-component.component';
import { AddValuesComponentComponent } from './addValues-component/addValues-component.component';
import { DifineIndexComponentComponent } from './difineIndex-component/difineIndex-component.component';
import { ObraValuesComponent } from './obra-values/obra-values.component';
import { ObraAddComponent } from './obra-add/obra-add.component';
import { AddUnidadFinComponent } from './add-unidad-fin/add-unidad-fin.component';
import { UnidadFinComponent } from './unidad-fin/unidad-fin.component';
import { EditUnidadFinComponent } from './edit-unidad-fin/edit-unidad-fin.component';
import { ObraFilterPipe } from './obraFilter.pipe';
import { IndiceFilterPipePipe } from './IndiceFilterPipe.pipe';
import { IndiceComponentComponent } from './indice-component/indice-component.component';
import { IndiceDetailComponentComponent } from './indiceDetail-component/indiceDetail-component.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddTipoObraComponent } from './add-tipo-obra/add-tipo-obra.component';
import { TipoObraComponent } from './tipo-obra/tipo-obra.component';
import { EditTipoObraModalComponent } from './edit-tipo-obra-modal/edit-tipo-obra-modal.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppHttpInterceptor } from './AppHttpInterceptor';
import { RegisterUpdateComponent } from './register-update/register-update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { WaitSpinnerComponent } from './utils/wait-spinner/wait-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    ObraComponent,
    TipologyComponent,
    ObraDetailComponent,
    ObraUpdateComponent,
    AddTipologyComponentComponent,
    EditTipologyModalComponentComponent,
    EspecialidadesComponentComponent,
    EditEspecialidadModalComponentComponent,
    ValoresComponent,
    EditValuesComponentComponent,
    AddValuesComponentComponent,
    DifineIndexComponentComponent,
    ObraValuesComponent,
    ObraAddComponent,
    AddUnidadFinComponent,
    UnidadFinComponent,
    EditUnidadFinComponent,
    ObraFilterPipe,
    IndiceFilterPipePipe,
    IndiceComponentComponent,
    IndiceDetailComponentComponent,
    HomeComponent,
    AddTipoObraComponent,
    TipoObraComponent,
    EditTipoObraModalComponent,
    ConfirmComponent,
    LoginComponent,
    RegisterComponent,
    RegisterUpdateComponent,
    ChangePasswordComponent,
    UserDashboardComponent,
    WaitSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [EditTipologyModalComponentComponent]
})
export class AppModule { }
