import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 isSidebarCollapsed = false;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  // Listen for window resize events
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;

    // If switching from mobile to desktop, force the sidebar to show text
    if (wasMobile && !this.isMobile) {
      this.isSidebarCollapsed = false;
    } 
    // If switching from desktop to mobile, hide it by default
    else if (!wasMobile && this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onNavLinkClick() {
    if (window.innerWidth < 768) {
      this.isSidebarCollapsed = true;
    }
  }
}
