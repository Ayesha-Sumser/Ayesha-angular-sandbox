import { Component, Input } from '@angular/core';
import { Starship } from '../../../models/starship';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'http';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [],
  templateUrl: './starship-details.component.html',
  styleUrl: './starship-details.component.scss'
})
export class StarshipDetailsComponent {
  
  @Input()  starshipDetails?: Starship;

  starshipName:string | null = '';

  constructor(private apiService: ApiService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){}

}