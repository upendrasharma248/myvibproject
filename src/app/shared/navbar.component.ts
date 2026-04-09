import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route?: string;
  children?: MenuItem[];
}

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menu: MenuItem[] = [
    { label: 'Home', route: '/' },
    { label: 'All Courses', children: [
      { label: 'Java', children: [
        { label: 'Advanced Java', route: '/courses/java/advanced' },
        { label: 'Core Java', route: '/courses/java/core' }
      ] },
      { label: 'Python', route: '/courses/python' },
      { label: 'JavaScript', route: '/courses/javascript' },
      { label: 'C++', route: '/courses/cpp' }
    ] },
    { label: 'Registration', route: '/registration' },
    { label: 'External Resource', route: '/external-resource' },
    { label: 'Photo Gallery', route: '/gallery' },
    { label: 'Sign Up', route: '/sign-up' },
    { label: 'Sign In', route: '/sign-in' },
    { label: 'Users', route: '/users' },
    { label: 'Contact Us', route: '/contact' }
  ];

  constructor(public router: Router) {}

  isMenuActive(item: MenuItem): boolean {
    if (item.route) {
      return this.router.isActive(item.route, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
    }
    if (item.children) {
      return item.children.some(child => this.isMenuActive(child));
    }
    return false;
  }
}
