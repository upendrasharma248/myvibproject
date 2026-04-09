

// ...existing imports...




import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
    deleteIndex: number | null = null;
    deleteUserObj: any = null;

    confirmDelete(user: any, index: number) {
      this.deleteUserObj = user;
      this.deleteIndex = index;
      // Show Bootstrap modal
      const modal = document.getElementById('deleteModal');
      if (modal) {
        (window as any).bootstrap?.Modal.getOrCreateInstance(modal).show();
      }
    }

    deleteUser() {
      if (!this.deleteUserObj || this.deleteIndex === null) return;
      this.registrationService.deleteRegistration(this.deleteUserObj.id).subscribe({
        next: () => {
          this.registeredUsers.splice(this.deleteIndex!, 1);
          this.deleteUserObj = null;
          this.deleteIndex = null;
          // Hide modal
          const modal = document.getElementById('deleteModal');
          if (modal) {
            (window as any).bootstrap?.Modal.getOrCreateInstance(modal).hide();
          }
          setTimeout(() => {
            this.renderPieChart();
            this.renderLineChart();
          }, 0);
        },
        error: (err: any) => {
          alert('Failed to delete registration.');
        }
      });
    }
  userData = {
    userId: 'U12345',
    designation: 'Student',
    phoneNo: '+1 234 567 8900',
    location: 'Online City'
  };

  registeredUsers: any[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngAfterViewInit(): void {
    this.fetchRegisteredUsers();
  }

  // Removed loadHighcharts. Highcharts is now imported locally.

  fetchRegisteredUsers() {
    this.registrationService.getAllRegistrations().subscribe({
      next: (users: any[]) => {
        this.registeredUsers = users;
        // Wait for DOM to update before rendering charts
        setTimeout(() => {
          this.renderPieChart();
          this.renderLineChart();
        }, 0);
      },
      error: (err: any) => {
        console.error('Failed to fetch registered users', err);
      }
    });
  }

  renderPieChart() {
    // Pie chart: Distribution by course
    const courseCounts: { [key: string]: number } = {};
    this.registeredUsers.forEach(user => {
      courseCounts[user.course] = (courseCounts[user.course] || 0) + 1;
    });
    const pieData = Object.entries(courseCounts).map(([course, count]) => ({ name: course, y: count }));
    Highcharts.chart('piechart-container', {
      chart: { type: 'pie', backgroundColor: '#f8f9fa' },
      title: { text: 'Registrations by Course' },
      series: [{ name: 'Users', colorByPoint: true, data: pieData }],
      accessibility: { point: { valueSuffix: ' users' } }
    });
  }

  renderLineChart() {
    // Bar chart: Registrations over time (by day)
    const dateCounts: { [key: string]: number } = {};
    this.registeredUsers.forEach(user => {
      // Assume user has a 'created_at' or 'date' field, fallback to today if not
      const date = user.created_at ? user.created_at.slice(0, 10) : (new Date()).toISOString().slice(0, 10);
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    const sortedDates = Object.keys(dateCounts).sort();
    const barData = sortedDates.map(date => dateCounts[date]);
    Highcharts.chart('linechart-container', {
      chart: { type: 'bar', backgroundColor: '#f8f9fa' },
      title: { text: 'Registrations Over Time' },
      xAxis: { categories: sortedDates, title: { text: 'Date' } },
      yAxis: { title: { text: 'Number of Registrations' }, allowDecimals: false },
      series: [{ name: 'Registrations', data: barData }],
      tooltip: { valueSuffix: ' users' }
    });
  }

  // (Removed duplicate loadHighcharts method)

  renderChart() {
    Highcharts.chart('highcharts-container', {
      chart: {
        type: 'column',
        backgroundColor: '#f8f9fa',
        style: { fontFamily: 'inherit' }
      },
      title: { text: 'Course Progress & Activity' },
      xAxis: {
        categories: ['Advanced Java', 'Python', 'JavaScript'],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: { text: 'Progress (%)' }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Progress',
          data: [80, 45, 60],
          color: '#007bff'
        },
        {
          name: 'Attendance',
          data: [90, 60, 75],
          color: '#28a745'
        }
      ]
    });
  }
}
