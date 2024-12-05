import { Component } from '@angular/core';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';

import { CardListTemplateComponent } from '../partial/card-list-template/card-list-template.component';
import { ApiService } from '../../services/api.service';
import { Starship } from '../../models/starship';
import { StarshipDTO } from '../../models/starship-dto';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [
    CardListTemplateComponent,
    StarshipDetailsComponent,
  ],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent {
  starshipList: Starship[] = [];
  selectedStarship?: Starship;
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getStarships()
  }

  getStarships() {
    this.apiService.request<StarshipDTO<Starship[]>>('starshipList', 'get').subscribe((starships: StarshipDTO<Starship[]>) => {
      console.log('starships from server', starships);
      this.starshipList = starships['results'];
      console.log('starshiplist', this.starshipList);
    })
  }

  onSelectedStarship(item: Starship) {
    console.log('onSelectedStarship', item);
    this.selectedStarship = item;
  }

}