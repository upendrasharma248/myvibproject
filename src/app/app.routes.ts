import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
	{ path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
	{ path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
	{ path: 'courses', loadComponent: () => import('./pages/all-courses/all-courses.component').then(m => m.AllCoursesComponent),
		children: [
			{ path: 'java', loadComponent: () => import('./pages/java/java.component').then(m => m.JavaComponent),
				children: [
					  { path: 'advanced', loadComponent: () => import('./pages/advanced-java/advanced-java.component').then(m => m.AdvancedJavaComponent) },
					  { path: 'core', loadComponent: () => import('./pages/core-java/core-java.component').then(m => m.CoreJavaComponent) }
				]
			},
			{ path: 'python', loadComponent: () => import('./pages/python/python.component').then(m => m.PythonComponent) },
			{ path: 'javascript', loadComponent: () => import('./pages/javascript/javascript.component').then(m => m.JavaScriptComponent) },
			{ path: 'cpp', loadComponent: () => import('./pages/cpp/cpp.component').then(m => m.CppComponent) }
		]
	},
	{ path: 'registration', loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent) },
	{ path: 'external-resource', loadComponent: () => import('./pages/external-resource/external-resource.component').then(m => m.ExternalResourceComponent) },
	{ path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
	{ path: 'sign-up', loadComponent: () => import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent) },
	{ path: 'sign-in', loadComponent: () => import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent) },
	{ path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
	{ path: 'users', loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent) },
];
