import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car } from '../../../models/car';
import { User } from '../../../models/user';
import { PermissionService } from '../../../services/permission.service';
import { StorageService } from '../../../services/storage.service';
import { Starship } from '../../../models/starship';

@Component({
  selector: 'app-card-list-template',
  standalone: true,
  imports: [
    ModalComponent,
    RouterLink,
    CommonModule,
],
  templateUrl: './card-list-template.component.html',
  styleUrl: './card-list-template.component.scss'
})
export class CardListTemplateComponent {
  //resuable for different types of data(cars, users, etc)
  @Input() list: any[] = [];
  user?: User;
  favorites: Set<string> = new Set(); // Set to store favorite car IDs


  @Output() selectedStarship = new EventEmitter<Starship>();

  constructor(public permissionService: PermissionService, private storageService: StorageService) { }

  ngOnInit() {
    this.user = this.storageService.get('user');
    const savedFavorites = this.storageService.get('favorites');
    this.favorites = new Set(savedFavorites || []);
  }

  passStarship(item: Starship) {
    this.selectedStarship.emit(item);
    console.log('selectedStarship', item);
  }

  isCar(obj: any): obj is Car {
    return obj
      && typeof obj.body_type === 'string'
      && typeof obj.engine === 'string'
      && typeof obj.fuel_type === 'string'
      && typeof obj.transmission === 'string';
  }
  isUser(obj: any): obj is User {
    return obj
      && typeof obj.first_name === 'string'
      && typeof obj.last_name === 'string'
      && typeof obj.username === 'string';
  }

  isStarship(obj: any): obj is Starship {
    return obj
      && typeof obj.name === 'string'
      && typeof obj.model === 'string'
      && typeof obj.passengers === 'string'
  }

  setFavorite(carId: string): void {
    if (this.favorites.has(carId)) {
      // If already a favorite, remove it
      this.favorites.delete(carId);
    } else {
      // Otherwise, add it to favorites
      this.favorites.add(carId);
    }
    // Save the updated favorites list to localStorage
    this.storageService.set('favorites', Array.from(this.favorites));
  }

}