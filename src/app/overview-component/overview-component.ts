import { Component, signal, AfterViewInit, ViewChild, ElementRef, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart, { registerables } from 'chart.js/auto';
import { ProjectService } from '../services/project-service';
Chart.register(...registerables);

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview-component.html'
})
export class OverviewComponent  {
  
projectService = inject(ProjectService);
  @ViewChild('earningsChart') earningsChart!: ElementRef;
  chart: Chart | undefined;

  recentActivity = signal([
    { action: 'Project "Zenith" updated', time: '2 hours ago' },
    { action: 'New payment received', time: '5 hours ago' },
    { action: 'Milestone reached for "Eco-App"', time: 'Yesterday' }
  ]);
     
  constructor() {
    // This effect runs whenever projectService.chartData() changes
    effect(() => {
      const newData = this.projectService.chartData();
      if (this.chart) {
        this.chart.data.datasets[0].data = newData;
        this.chart.update();
      }
    });
  }
  ngAfterViewInit() {
    this.chart = new Chart(this.earningsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Completed Earnings ($)',
          data: this.projectService.chartData(),
          backgroundColor: '#0d6efd'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
}
}