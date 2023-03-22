import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
})
export class AlumnosFormComponent implements OnInit {
  constructor(private service: AlumnoService, private router: Router, private route:ActivatedRoute) {}
  titulo = 'Crear alumno';
  alumno: Alumno = new Alumno();
  error: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id:number = +params.get('id');
      if(id){
        this.service.obtener(id).subscribe(
          alumno =>  this.alumno = alumno
        );
      }
    });
  }

  registrar() {
    if (this.datosValidos()) {
      this.service.crear(this.alumno).subscribe(
        (alumno) => {
          console.log(alumno);
          Swal.fire('Creado', `Alumno ${alumno.nombres} creado con éxito`, 'success');
          this.router.navigate(['/alumnos']);
        },
        (err) => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
            Swal.fire('Error', 'Asegúrese de rellenar correctamente el formulario', 'error');
          }
        }
      );
    }
    else{
      Swal.fire('Error', 'Asegúrese de rellenar correctamente el formulario', 'error');
    }
  }

  editar() {
    if (this.datosValidos()) {
      this.service.editar(this.alumno).subscribe(
        (alumno) => {
          console.log(alumno);
          Swal.fire('Éxito', `Alumno ${alumno.nombres} actualizado con éxito`, 'success');
          this.router.navigate(['/alumnos']);
        },
        (err) => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
            Swal.fire('Error', 'Asegúrese de rellenar correctamente el formulario', 'error');
          }
        }
      );
    }
    else{
      Swal.fire('Error', 'Asegúrese de rellenar correctamente el formulario', 'error');
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
