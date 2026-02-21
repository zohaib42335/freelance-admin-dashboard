import { Injectable, signal, computed, effect } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  deadline: string;
  value: number; // Added to calculate earnings
  month: string;
}
export interface Activity {
  id: number;
  message: string;
  timestamp: Date;
  type: 'add' | 'update' | 'delete';
}
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly STORAGE_KEY = 'freelance_os_projects';
  // Private signal for state
  private projectsSignal = signal<Project[]>(this.loadFromStorage());

  // Public read-only signals
  projects = this.projectsSignal.asReadonly();

  constructor() {
    effect(() => {
      const data = JSON.stringify(this.projectsSignal());
      localStorage.setItem(this.STORAGE_KEY, data);
    });
  }

  private loadFromStorage(): Project[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      // Default data if storage is empty
      { id: 1, name: 'Sample Project', status: 'In Progress', deadline: '2026-12-31', value: 1000, month: 'Jan' }
    ];
  }

  totalProjects = computed(() => this.projectsSignal().length);

  totalEarnings = computed(() => 
    this.projectsSignal()
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + p.value, 0)
  );
  // Requirement: Pending + In Progress count
  tasksOverdueCount = computed(() => 
    this.projectsSignal().filter(p => p.status === 'Pending' || p.status === 'In Progress').length
  );

  // Requirement: Chart data mapped to months
  chartData = computed(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(m => {
      return this.projectsSignal()
        .filter(p => p.month === m && p.status === 'Completed')
        .reduce((sum, p) => sum + p.value, 0);
    });
  });

  addProject(project: Omit<Project, 'id'>) {
    const newProject = { ...project, id: Date.now() };
    this.projectsSignal.update(projs => [...projs, newProject]);
    this.addActivity(`New project "${project.name}" added`, 'add');
  }

  deleteProject(id: number) {
    // 1. Find the project first so we know its name for the activity log
    const projectToDelete = this.projectsSignal().find(p => p.id === id);
    
    if (projectToDelete) {
      // 2. Perform the deletion
      this.projectsSignal.update(projs => projs.filter(p => p.id !== id));
      
      // 3. Log the activity
      this.addActivity(`Project "${projectToDelete.name}" was removed`, 'delete');
    }
  }

  updateStatus(id: number, status: Project['status']) {
    // 1. Find the project to get the name
    const projectToUpdate = this.projectsSignal().find(p => p.id === id);
    
    if (projectToUpdate) {
      // 2. Update the status in the signal
      this.projectsSignal.update(projs => 
        projs.map(p => p.id === id ? { ...p, status } : p)
      );

      // 3. Log the activity with the specific status change
      this.addActivity(
        `Status of "${projectToUpdate.name}" changed to ${status}`, 
        'update'
      );
    }
  }

  private activitiesSignal = signal<Activity[]>([
    { id: 1, message: 'System initialized', timestamp: new Date(), type: 'update' }
  ]);

  activities = this.activitiesSignal.asReadonly();

  private addActivity(message: string, type: Activity['type']) {
    const newActivity: Activity = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      type
    };
    // Keep only the last 10 activities to prevent memory bloat
    this.activitiesSignal.update(list => [newActivity, ...list].slice(0, 10));
  }
}