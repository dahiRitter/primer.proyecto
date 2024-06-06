import { Component } from '@angular/core';
//imortamos interfas
import { Tronos } from 'src/app/models/tronos';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  //propiedad publica (tipo arry)
  public info: Tronos[];
  constructor(){
    this.info=[
      {
        id:"",
        nombre:"",
        edad:0,
        imagen:"https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=680",
        alt:"",
      },
      {
        id:"",
        nombre:"",
        edad:0,
        imagen:"https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=680",
        alt:"",
      },
      {
        id:"",
        nombre:"",
        edad:0,
        imagen:"https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=680",
        alt:"",
      }
    ] 
  }

}
