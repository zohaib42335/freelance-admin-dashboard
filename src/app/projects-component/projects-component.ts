import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project-service';

interface Project {
  name: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  deadline: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-component.html'
})
export class ProjectsComponent {
  projectService = inject(ProjectService);

  add(name: string, value: string, date: string) {
    if (!name || !value) return;
    this.projectService.addProject({
      name,
      value: parseInt(value),
      deadline: date,
      status: 'Pending',
      month: new Date(date).toLocaleString('default', { month: 'short' })
    });
  }

  updateStatus(id: number, status: any) {
    this.projectService.updateStatus(id, status);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'In Progress': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }
}