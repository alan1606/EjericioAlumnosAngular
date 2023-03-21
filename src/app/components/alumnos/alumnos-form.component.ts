import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
})
export class AlumnosFormComponent implements OnInit {
  constructor(private service: AlumnoService, private router: Router) {}
  titulo = 'Crear alumno';
  alumno: Alumno = new Alumno();
  error: any;

  ngOnInit(): void {}

  registrar() {
    if (this.datosValidos()) {
      this.service.crear(this.alumno).subscribe(
        (alumno) => {
          console.log(alumno);
          alert(`Alumno ${alumno.nombres} creado con éxito`);
          this.router.navigate(['/alumnos']);
        },
        (err) => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
            alert('Asegúrese de rellenear correctamente el formulario');
          }
        }
      );
    }
    else{
      alert('Asegúrese de rellenear correctamente el formulario');
    }
  }

  private datosValidos(): boolean{
    if(this.alumno.nombres == null ) {
      return false;
    }
    if(this.alumno.apellidoPaterno == null){
      return false;
    }
    if(this.alumno.apellidoMaterno == null){
      return false;
    }
    if(this.alumno.fechaDeNacimiento == null){
      return false;
    }
    if(this.alumno.sexo == null){
      return false;
    }
    if(this.alumno.matricula == null){
      return false;
    }
    if(this.alumno.curp == null){
      return false;
    }

    if(this.alumno.nombres === '' ) {
      return false;
    }
    if(this.alumno.apellidoPaterno === ''){
      return false;
    }
    if(this.alumno.apellidoMaterno === ''){
      return false;
    }
    if(this.alumno.fechaDeNacimiento === ''){
      return false;
    }
    if(this.alumno.sexo === ''){
      return false;
    }
    if(this.alumno.matricula === ''){
      return false;
    }
    if(this.alumno.curp === ''){
      return false;
    }
    return true;
  }
}
