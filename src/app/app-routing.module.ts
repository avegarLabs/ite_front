import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddValuesComponentComponent } from './addValues-component/addValues-component.component';
import { EditValuesComponentComponent } from './editValues-component/editValues-component.component';
import { EspecialidadesComponentComponent } from './especialidades-component/especialidades-component.component';
import { ObraDetailComponent } from './obra-detail/obra-detail.component';
import { ObraComponent } from './obra/obra.component';
import {TipologyComponent} from "./tipology/tipology.component";
import { ObraAddComponent } from './obra-add/obra-add.component';
import { ObraUpdateComponent } from './obra-update/obra-update.component';
import { UnidadFinComponent } from './unidad-fin/unidad-fin.component';
import { ObraFilterPipe } from './obraFilter.pipe';
import { IndiceFilterPipePipe } from './IndiceFilterPipe.pipe';
import { IndiceComponentComponent } from './indice-component/indice-component.component';
import { IndiceDetailComponentComponent } from './indiceDetail-component/indiceDetail-component.component';
import { HomeComponent } from './home/home.component';
import { TipoObraComponent } from './tipo-obra/tipo-obra.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'Obras', component: ObraComponent },
  { path: 'tipology', component: TipologyComponent },
  { path: 'especialidades', component: EspecialidadesComponentComponent },
  { path: 'detailObra/:id', component: ObraDetailComponent },
  { path: 'editValues/:id', component: EditValuesComponentComponent},
  { path: 'addValores/:obraId', component: AddValuesComponentComponent },
  { path: 'AgregarObra', component: ObraAddComponent },
  { path: 'ModificarObra/:id', component: ObraUpdateComponent },
  { path: 'UnidadFin', component: UnidadFinComponent },
  { path: 'indice', component: IndiceComponentComponent },
  { path: 'indiceDetail/:obraid/:estado', component: IndiceDetailComponentComponent },
  { path: 'tipoObra', component: TipoObraComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent, canActivate: [AuthGuard], data: {role : 'ROLE_ADMIN'} },
  { path: 'configuracion', component: UserDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [

   ]
})
export class AppRoutingModule { }
