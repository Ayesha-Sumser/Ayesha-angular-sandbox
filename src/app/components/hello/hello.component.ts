import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent {
  myName = "Ayesha";
  myText = 'Hello World';
  numA = 0;
  numB =0;
  symbol = '';
  result: string | number = 0;

  updateName(name:string):void{
    console.log('name:',name);
    this.myName = name;
    
  }

  equal():void{
    switch(this.symbol){
      case 'addition':
        this.result = this.numA+this.numB;
        break;

        case 'substraction':
        this.result = this.numA-this.numB;
        break;

        case 'multiplying':
        this.result = this.numA*this.numB;
        break;

        case 'divide':
          if (this.numB == 0){
            console.log('cannot divide by 0');
            this.result = 'cannot divide by 0';
            break;
          }
        this.result = this.numA/this.numB;
        break;
    }
  }
}