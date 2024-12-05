import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SettingService } from '../../../services/setting.service';
import { StorageService } from '../../../services/storage.service'; // Import StorageService
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    LoginComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currentNavTheme: string = 'blue'; // Default theme

  constructor(
    private settingService: SettingService,
    private storageService: StorageService, // Inject StorageService
    public permission: PermissionService,
  ) {}

  ngOnInit(): void {
    // Retrieve the theme from localStorage on initialization
    const savedTheme = this.storageService.get('theme');
    if (savedTheme) {
      this.currentNavTheme = savedTheme; // Update the current theme
   
    }

    this.settingService.outsetTheme.subscribe((newTheme) => {
      console.log('New theme: ', newTheme);
      this.currentNavTheme = newTheme;
      this.storageService.set('theme', newTheme);  // Save the new theme to localStorage
     
    });
  }

}
