import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss']
})
export class Tab3Component implements OnInit {
  correo: string;
  barStatus = false;
  fileUpload = [];

  nombre='';
  //correo='ch.rash37@gmail.com';
  telefono:number;
  postularForm:FormGroup;
  mensaje='Hay una nueva postulación a su pasantía';

  constructor(private route: ActivatedRoute) {
    this.correo='';
  }
  ngOnInit() {
    this.correo = this.route.snapshot.paramMap.get('correo');
    alert(this.correo);
  }
  public sendEmail(e: Event) {
    console.log(e);
    e.preventDefault();
    emailjs.sendForm('service_5n3w2me', 'template_p2qmxmr', e.target as HTMLFormElement, 'user_h3wl5X7fbp7lUayv6EeT6')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
  ionViewDidLeave(){
    this.nombre='';
    this.telefono=null;
  }

}
