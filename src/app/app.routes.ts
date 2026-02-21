import { Routes } from '@angular/router';
import { OverviewComponent } from './overview-component/overview-component';
import { ProjectsComponent } from './projects-component/projects-component';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'projects', component: ProjectsComponent }
];
