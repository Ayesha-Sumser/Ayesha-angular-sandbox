import { Component, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  
    @Input() carId!: string; // Unique identifier for the car
    isFavorite: boolean = false;
  
    constructor(private storageService: StorageService) {}
  
    ngOnInit(): void {
      const favorites = this.storageService.get('favorites') || [];
      this.isFavorite = favorites.includes(this.carId); // Check if the car is already a favorite
    }
  
    setFavorite(): void {
      const favorites = this.storageService.get('favorites') || [];
      if (this.isFavorite) {
        // Remove from favorites
        const updatedFavorites = favorites.filter((id: string) => id !== this.carId);
        this.storageService.set('favorites', updatedFavorites);
      } else {
        // Add to favorites
        favorites.push(this.carId);
        this.storageService.set('favorites', favorites);
      }
      this.isFavorite = !this.isFavorite; 
    }
  }
  

